# Mission 03 — Volatile Mystery：变量明明会变，程序为什么像没看见？

## 先建立场景

你已经知道普通变量可以被代码修改。

现在想象一个更接近嵌入式的场景：

```c
int ready = 0;

while (ready == 0)
{
    // 等待外部事件
}
```

你期待：某个外部事件发生后，`ready` 变成 1，循环退出。

问题是：如果当前这段代码里从来没有写 `ready = 1`，编译器会怎样理解它？

这就是本关要调查的谜题。

---

## Level 1 — Predict：先别背 volatile

回答：下面三个对象，谁可能在当前代码没有显式赋值时发生变化？

```text
A. 普通局部变量
B. MCU 状态寄存器
C. 被中断服务程序修改的标志
```

然后再思考：如果编译器只看当前函数，它是否总能知道 B/C 会变化？

目标不是马上答出标准术语，而是先发现“程序世界里存在看不见的写入者”。

---

## Level 2 — Observe：源码不是 CPU 最终执行的东西

C 源码最终还要经历：

```text
C Source
→ Compiler
→ Machine Instructions
→ CPU
```

编译器的重要工作之一就是优化。

如果它能够证明某个普通变量在循环中不会被当前可见代码修改，就可能减少重复读取。

这通常是好事；但当变量实际上连接到硬件状态，或者会被 ISR 改变时，程序员必须把这个事实表达出来。

进入 Knowledge：

`01-Knowledge-Base/C/04-volatile-const-static.md`

现在再认识 `volatile`。

---

## Level 3 — Explain：volatile 真正表达什么

比较：

```c
int ready;
volatile int ready;
```

用自己的话解释第二种写法给编译器增加了什么信息。

推荐答案方向不是：

> volatile 会让变量实时变化。

而是：

> volatile 告诉编译器，这个对象可能被当前代码流之外的因素改变，因此访问它时不能随意假设旧值仍然有效。

注意：`volatile` 自己不会制造变化，也不会产生中断，更不会让代码自动线程安全。

---

## Level 4 — Break It：故意使用错误工具

判断下面说法是否正确，并解释原因：

1. `volatile` 能防止两个 RTOS Task 同时修改数据产生 Race Condition。
2. `volatile` 能让 `counter++` 变成原子操作。
3. 硬件状态寄存器通常需要考虑 `volatile` 访问语义。
4. ISR 修改、主循环读取的简单标志经常会遇到 `volatile`。

前两项是本关的重要陷阱：

```text
volatile ≠ atomic
volatile ≠ mutex
volatile ≠ thread synchronization
```

真正的并发同步会在 Stage 05 RTOS 再系统学习。

---

## Level 5 — Transfer：把它接回真实 MCU

以后你会看到类似：

```c
#define REG32(addr) (*(volatile uint32_t *)(addr))
```

先不要被整句吓住，逐层拆开：

```text
addr
→ 转成 uint32_t * 指针
→ volatile：这个地址里的对象可能由硬件改变
→ *：访问该地址里的 32-bit 对象
```

这就是 Stage 01 前三关开始汇合的地方：

```text
Memory Detective → Address / Pointer
Bit Hacker       → Register / Bit
Volatile Mystery → Hardware can change state
```

---

## Mini Debug Challenge

现象：

> Debug 构建正常，开启较高优化后，等待状态变化的循环表现异常。

禁止直接回答“加 volatile 就好了”。

请先写调查顺序：

1. 谁应该修改这个变量？
2. 修改发生在普通代码、ISR 还是硬件？
3. Debugger 中内存值是否真的变化？
4. CPU 是否在重复读取这个地址？
5. `volatile` 是否适用于这个共享模型？
6. 是否还存在原子性/同步问题？

只有证据支持后，才能决定修改。

---

## Achievement

完成本关后，你应该能够解释：

- 为什么嵌入式代码里经常出现 `volatile`；
- 为什么普通软件里它相对少见；
- 为什么 `volatile` 与“线程安全”不是一回事；
- 为什么硬件寄存器会让 C 变量模型变得特殊。

## 下一关

Mission 04 — Struct Explorer：当设备数据越来越多，如何把一组相关数据组织成一个真正可维护的对象。
