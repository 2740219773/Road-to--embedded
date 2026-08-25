# Mission 00 — C# → C Bridge：把熟悉的上位机直觉拆到底层

## Beginner Guide

- 适合：会 C# 或其他高级语言、但第一次接触 C 内存模型的学习者；
- 前置：Stage 00 Exit Check；零基础者先完成 Stage 01 C Basics Check；
- 预计：45 分钟；
- 本关产出：一张 C# 与 C 的概念对照表；
- 上一关：Stage 00 System Map；当前关：C# → C Bridge；下一关：Memory Detective。

## What to Submit

使用 [Learning Record Template](../../../docs/LEARNING-RECORD-TEMPLATE.md)，提交至少一组值、地址、生命周期和错误处理的对照记录。

## If You Are Stuck

先只处理一个 C# 概念，不要同时比较 class、GC、异常、数组和寄存器；完成一组对照后再继续。

## Ready to Continue

能够用自己的话解释 C 的值、地址、指针和生命周期后，再进入 Memory Detective。

> 学习路径：[Stage 01 — C & Memory](../../../02-Learning-Path/Stage-01-C-and-Memory/README.md) · 知识支撑：[C# → C → Embedded C](../../../01-Knowledge-Base/C/00-CSharp-to-C-Bridge.md) · 互动实验：[Memory Visualizer](../../../03-Interactive-Labs/Memory-Visualizer/README.md)

## Mission Brief

你已经可以在 C# 中调用一个设备对象：

`csharp
device.SetOutput(true);
`

现在要回答：这个动作如果最终由 MCU 控制 GPIO，数据如何从上位机一路走到真实硬件？

```text
C# API
→ C 数据
→ 地址 / 指针
→ MCU 寄存器
→ GPIO bit
→ Physical Pin
```

本关不要求你立刻写复杂固件，而是先把熟悉的 C# 对象直觉转换成可验证的 C 内存模型。

## Before You Start

先阅读：

- [C# → C → Embedded C](../../../01-Knowledge-Base/C/00-CSharp-to-C-Bridge.md)
- [Data / Address / Memory](../../../01-Knowledge-Base/C/01-Data-Address-Memory.md)
- [Pointer & Hardware](../../../01-Knowledge-Base/C/02-Pointers-and-Hardware.md)

## 1. Predict — 先预测地址和生命周期

比较下面两段代码：

`csharp
int value = 10;
device.SetValue(value);
`

`c
int value = 10;
int *p = &value;
*p = 20;
`

回答：

1. C# 调用中，设备对象和 `value` 的管理者分别是谁？
2. C 代码中 `p` 保存的是数值 20，还是 `value` 的地址？
3. 如果 `p` 指向已经失效的局部变量，最可能观察到什么？
4. 为什么 C 的数组越界不会自动弹出异常窗口？

## 2. Observe — 使用 Memory Visualizer

打开 [Memory Visualizer](../../../03-Interactive-Labs/Memory-Visualizer/README.md)，按顺序完成：

1. 点击 `Read p`，记录当前高亮的地址；
2. 点击 `Dereference *p`，记录读取到的值；
3. 点击 `*p = 20`，观察 `value` 和 `*p` 的关系；
4. Reset 后再次完成一遍，并用自己的话解释 `p` 与 `*p`。

## 3. Explain — 把高层名词拆成底层问题

写下这四个词的区别：

```text
value
&value
p
*p
```

再解释：

```text
C# 属性调用
≠
C 中一次不可见的“对象操作”
```

在 C 中，需要继续追踪实际的内存访问、边界、生命周期和错误返回值。

## 4. Break It — 故意制造两个危险直觉

不要在真实 MCU 上执行下面的无效地址访问：

`c
int *invalid = (int *)0x12345678;
*invalid = 20;
`

再思考：

`c
uint8_t buffer[4];
buffer[4] = 5;
`

分别记录：

- 可能被破坏的对象；
- 你需要寻找的第一条证据；
- 为什么“程序没有立刻崩溃”不等于“代码正确”。

## 5. Debug — 用证据而不是语言习惯

调查记录至少包含：

```text
Expected object:
Pointer value:
Target address:
Access size:
Buffer capacity:
Actual length:
Failure symptom:
First high-value evidence:
```

不要因为 C# 中有 GC、数组检查和异常，就假设 C 会自动提供同样的保护。

## 6. Transfer — 连接 MCU 寄存器

把下面的寄存器表达式拆成步骤：

`c
#define GPIO_OUT (*(volatile uint32_t *)0x40020014U)
GPIO_OUT |= (1U << 5);
`

说明：

```text
Address
→ Pointer Cast
→ volatile
→ Dereference
→ Register Value
→ Bit Mask
→ Read-Modify-Write
→ Future Physical Pin
```

## Mission Report

提交一页记录：

```text
One C# intuition I had:
The corresponding C memory model:
One pointer or lifetime risk:
One boundary risk:
One piece of evidence I would collect:
How this connects to a GPIO register:
```

## Achievement Unlocked

你没有放弃 C# 经验，而是学会把它拆成：

```text
API
→ Data
→ Address
→ Memory
→ Register
→ Physical Effect
```

下一关：[Mission 01 — Memory Detective](../01-Memory-Detective/Mission.md)。
