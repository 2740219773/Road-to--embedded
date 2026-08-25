# Bitwise & Register — 为什么一个整数能同时控制很多开关

## 先建立 Bit 的概念

计算机里的整数最终可以看成很多个 0/1 组成的二进制位（bit）。

例如一个 8-bit 数：

```text
1010 0001
```

可以把它想成 8 个并排的小开关：

```text
bit7 bit6 bit5 bit4 bit3 bit2 bit1 bit0
  1    0    1    0    0    0    0    1
```

## Register 是什么

在 MCU 中，Register（寄存器）可以先理解成一小块由硬件定义用途的控制/状态数据。

一个 32-bit Register 里，不同 bit 可能分别控制：

```text
bit0  → Enable
bit1  → Interrupt Enable
bit2  → Mode
bit5  → Output State
...
```

所以嵌入式 C 经常需要“只修改其中一个 bit，而保留其他 bit 不变”。

## Mask 是什么

Mask（掩码）可以理解成一个专门用来选中目标 bit 的二进制数。

```c
1U << 5
```

表示把二进制 `1` 左移 5 位：

```text
0010 0000
```

于是 bit5 被选中。

## Set / Clear / Toggle

常见三种操作：

```c
reg |=  (1U << 5);   // Set bit5
reg &= ~(1U << 5);   // Clear bit5
reg ^=  (1U << 5);   // Toggle bit5
```

第一次不用死背，先理解它们都在做：

```text
旧 Register 值
+ 一个只选中目标 bit 的 Mask
→ 生成新 Register 值
```

## 为什么 `=` 和 `|=` 差别很大

假设：

```text
reg = 1010 0001
```

你只想打开 bit5。

如果写：

```c
reg = (1U << 5);
```

新值会直接变成：

```text
0010 0000
```

旧的其他 bit 全部被覆盖。

而：

```c
reg |= (1U << 5);
```

通常表示先读取旧值，再和 Mask 做 OR，然后写回，因此其他已经为 1 的 bit 得以保留。

## Read-Modify-Write

这种“读旧值 → 修改部分 bit → 写回”的思路叫 Read-Modify-Write。

它很常见，但不是所有 Hardware Register 都允许机械使用这个模式。有些寄存器具有特殊写入语义，所以真实 MCU 中最终必须以 Reference Manual（参考手册）为准。

## 先掌握四件事

1. 一个整数由很多 bit 组成；
2. 一个 Register 里的不同 bit 可以有不同硬件含义；
3. Mask 用来选中特定 bit；
4. 整体赋值和只修改目标 bit 是完全不同的操作。

进入 [Mission 02 — Bit Hacker](../../04-Missions/Stage-01-C-and-Memory/02-Bit-Hacker/Mission.md)，再配合 `03-Interactive-Labs/Register-Playground/` 实际观察每一次 bit 变化。
