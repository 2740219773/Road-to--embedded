# Mission 03 — Volatile Mystery：变量明明会变，程序为什么像没看见？

## Beginner Guide

- 适合：已完成 Bit Hacker 的学习者；
- 前置：bit、寄存器和基本 C 编译运行；
- 预计：45 分钟；
- 本关产出：一份“谁可能修改状态”的证据记录；
- 上一关：Bit Hacker；当前关：Volatile Mystery；下一关：Struct Explorer。

## What to Submit

使用 [Learning Record Template](../../../docs/LEARNING-RECORD-TEMPLATE.md)，说明 `volatile` 能解决什么、不能解决什么，并记录一次观察结果。

## If You Are Stuck

先列出当前函数、ISR 或硬件可能的写入者，再讨论编译器是否缓存读取结果。

## Ready to Continue

能够区分“编译器观察规则”和“原子性/线程安全”后，再进入 Struct Explorer。

## Mission Brief

你已经知道普通变量可以被程序代码修改。现在考虑一个更接近嵌入式的场景：

```c
int ready = 0;

while (ready == 0)
{
    // 等待外部事件
}
```

你期待某个外部事件把 `ready` 变成 1，然后循环退出。

问题是：如果当前这段代码里从来没有写 `ready = 1`，Compiler 会怎样理解它？

---

## 0. Before You Start

先认识几个本关第一次出现的词：

- Compiler：把 C Source 转换成机器可以执行的指令的工具；
- Optimization：Compiler 在不改变它所理解的程序含义前提下，让代码更高效的处理；
- MCU：Microcontroller Unit，微控制器，可以先理解成把 CPU、Memory 和很多 Peripheral 集成在一颗芯片里的小型计算机；
- ISR：Interrupt Service Routine，中断服务程序。先简单理解成“某个硬件事件发生后，CPU 临时去执行的一段处理代码”；
- Hardware Register：由硬件定义用途的寄存器，值可能由真实外设改变。

先读：[volatile / const / static](../../../01-Knowledge-Base/C/04-volatile-const-static.md)

---

## 1. Predict

下面三个对象，谁可能在当前代码没有显式赋值时发生变化？

```text
A. 普通局部变量
B. MCU 状态寄存器
C. 被 ISR 修改的标志
```

再思考：如果 Compiler 只分析当前函数，它是否总能知道 B/C 会变化？

目标是先发现：**程序世界里存在当前代码看不见的写入者。**

---

## 2. Observe

C 源码最终会经历：

```text
C Source
→ Compiler
→ Machine Instructions
→ CPU
```

如果 Compiler 判断一个普通变量在循环中不会被当前可见代码修改，它可能减少重复读取。

这通常是合理优化；但如果对象实际上会被硬件或 ISR 改变，程序员必须把这个事实表达给 Compiler。

---

## 3. Explain

比较：

```c
int ready;
volatile int ready;
```

推荐的理解不是：

> volatile 会让变量实时变化。

而是：

> volatile 告诉 Compiler：这个对象可能被当前代码流之外的因素改变，因此访问时不能随意假设旧值仍然有效。

它不会自己制造变化，也不会自动产生中断。

---

## 4. Break It

判断并解释：

1. `volatile` 能防止两个 RTOS Task 同时修改数据产生 Race Condition。
2. `volatile` 能让 `counter++` 变成原子操作。
3. Hardware Register 经常需要考虑 `volatile` 访问语义。
4. ISR 修改、主循环读取的简单标志经常会遇到 `volatile`。

本关重要陷阱：

```text
volatile ≠ atomic
volatile ≠ mutex
volatile ≠ thread synchronization
```

并发同步会在后续 RTOS Stage 再系统学习。

---

## 5. Debug

现象：Debug 构建正常，开启较高 Optimization 后，等待状态变化的循环表现异常。

禁止直接回答“加 volatile”。

先调查：

```text
Who should modify this object?
Is the writer normal code / ISR / hardware?
Does the value really change in memory?
Does CPU repeatedly read it?
Does volatile match this access model?
Is there also an atomicity / synchronization problem?
```

只有证据支持后再修改。

---

## 6. Transfer — 进入 MCU

以后你会看到：

```c
#define REG32(addr) (*(volatile uint32_t *)(addr))
```

逐层拆开：

```text
addr
→ 转成 uint32_t * Pointer
→ volatile：对象可能被硬件改变
→ *：访问该地址中的 32-bit 对象
```

前三关开始汇合：

```text
Memory Detective → Address / Pointer
Bit Hacker       → Register / Bit
Volatile Mystery → External / Hardware State
```

---

## Mission Report

提交：

```text
Who can change a volatile object:
What volatile tells the compiler:
What volatile does NOT guarantee:
One hardware example:
My debug order for an optimized wait loop:
How REG32 connects the first three missions:
```

## Achievement Unlocked

你已经知道：有些状态并不完全由当前函数控制，而 C 代码必须正确描述这种“外部变化”的事实。

下一关：[Mission 04 — Struct Explorer](../04-Struct-Explorer/Mission.md)。
