# Mission 01 — Memory Detective：CPU 到底去哪里找数据？

## Mission Brief

你接手了一段“看起来完全正常”的程序：

```c
int value = 10;
int *p = &value;
*p = 20;
```

同事告诉你：`value` 明明没有直接写 `value = 20`，最后却变成了 20。

你的任务不是背 Pointer 定义，而是调查这次数据变化到底是怎么发生的。

---

## 0. Before You Start

第一次看到这些词时，先只建立最小概念：

- Memory：保存程序数据的地方；
- Address：Memory 位置的编号；
- Variable：程序给一个数据对象使用的名字；
- Pointer：保存 Address 的变量；
- Dereference：按照 Pointer 里的地址访问那个对象。

先读：

- [Data / Address / Memory](../../../01-Knowledge-Base/C/01-Data-Address-Memory.md)
- [Pointer & Hardware](../../../01-Knowledge-Base/C/02-Pointers-and-Hardware.md)

---

## 1. Predict

先不要运行代码。

回答：

1. `value` 最后是多少？
2. `p` 保存的是 10，还是某个地址？
3. `&value` 表示什么？
4. `*p` 又表示什么？

把答案写下来，再进入下一步。

---

## 2. Observe

想象一张最小内存地图：

```text
Address      Content
0x1000       10        ← value
0x1004       0x1000    ← p
```

于是：

```text
value    = 10
&value   = 0x1000
p        = 0x1000
*p       = 10
```

执行：

```c
*p = 20;
```

可以拆成：

```text
读取 p
→ 得到 0x1000
→ 找到 0x1000
→ 把那个地址中的内容改成 20
→ value 因此变成 20
```

配套互动：`03-Interactive-Labs/Memory-Visualizer/`。

再用普通 C 程序打印 `value`、`&value`、`p`、`*p`，验证自己的预测。

---

## 3. Explain

不用术语堆砌，自己解释：

```text
value
&value
p
*p
```

四者有什么区别？

如果只能背“p 是指针”，但画不出它们在 Memory 中的关系，就继续留在这一关。

---

## 4. Break It

故意写：

```c
int *p = (int *)0x12345678;
*p = 20;
```

先不要真的依赖它运行成功。

思考：

- C 语法允许写一个地址，不代表这个地址属于当前程序；
- 如果地址无效，问题属于“Pointer 语法”还是“Memory Access”？
- 如果程序崩溃，最有价值的证据是什么？

核心认识：

```text
Syntax Correct
≠
Address Valid
```

---

## 5. Debug

假设一个 Pointer 写入后程序异常。

你的第一轮调查至少记录：

```text
Pointer value:
Target address:
Expected object:
Access size:
What changed before failure:
```

这比直接换一份“正确代码”更接近真正的调试。

---

## 6. Transfer — 进入 MCU

芯片手册会规定某些 Peripheral Register 位于固定地址。

于是后面的嵌入式 C 会逐渐变成：

```text
Data
→ Memory
→ Address
→ Pointer
→ Register Address
→ Real Hardware
```

这就是为什么 Stage 01 第一关先学地址，而不是先背 STM32 API。

---

## Mission Report

提交：

```text
My prediction:
What value means:
What &value means:
What p contains:
What *p does:
One invalid-address risk:
How this can connect to hardware later:
```

## Achievement Unlocked

你已经建立第一条底层链：

```text
Variable → Memory → Address → Pointer → Dereference
```

下一关：[Mission 02 — Bit Hacker](../02-Bit-Hacker/Mission.md)。