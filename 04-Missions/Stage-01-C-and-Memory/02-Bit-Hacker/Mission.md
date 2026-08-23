# Mission 02 — Bit Hacker：只想打开一个 LED，为什么其他灯全灭了？

## Mission Brief

假设一个 8-bit 输出寄存器当前是：

```text
1010 0001
```

你只想把 bit5 设为 1，于是写了：

```c
reg = (1U << 5);
```

结果目标 LED 亮了，但原来亮着的其他 LED 全灭了。

这关不是背位运算，而是调查：**一个整数里的不同 bit 怎样代表不同硬件状态，以及为什么整体覆盖会破坏其他状态。**

---

## 0. Before You Start

第一次看到这些词，先只建立最小概念：

- bit：一个 0 或 1；
- 8-bit value：由 8 个 bit 组成的值；
- Register：由硬件定义用途的一组控制/状态位；
- Mask：专门选中某个 bit 的二进制模式；
- Shift：把一个 bit 向左或向右移动。

先读：[Bitwise & Register](../../../01-Knowledge-Base/C/03-Bitwise-and-Registers.md)

---

## 1. Predict

先计算：

```c
1U << 5
```

把结果分别写成二进制和十六进制。

然后预测：

```c
reg = (1U << 5);
```

执行后，整个 `reg` 会变成什么？

---

## 2. Observe

比较：

```c
reg =  (1U << 5);
reg |= (1U << 5);
```

第一句是把整个 Register 替换成 Mask。

第二句通常可以理解成：

```text
Read old reg
→ OR with mask
→ Write new reg
```

也就是保留旧状态，只把目标 bit 设为 1。

配套互动：`03-Interactive-Labs/Register-Playground/`。

先随机打开几个 bit，再执行 Overwrite 和 Set，对比结果。

---

## 3. Explain

用自己的话解释：

```text
1010 0001
OR
0010 0000
=
1010 0001 ?
```

注意 bit5 在原值里已经是什么状态。如果换成另一个 bit，结果又如何？

目标是理解每一位怎样独立参与运算，而不是只记公式。

---

## 4. Break It

依次预测并验证：

```c
reg |=  (1U << 5);
reg &= ~(1U << 5);
reg ^=  (1U << 5);
```

分别对应：

```text
Set
Clear
Toggle
```

再故意使用一次错误的整体赋值，观察哪些旧状态被破坏。

---

## 5. Debug

看到：

```text
Before: 0xA1
Expected: only one bit changes
After: 0x20
```

不要先怀疑 Pointer 或硬件。

先记录：

```text
Old register value:
Mask:
Operation used:
Expected result:
Actual result:
```

如果 Actual 等于 Mask 本身，这就是非常强的“整体覆盖”证据。

---

## 6. Transfer — 进入 MCU

GPIO、Timer、UART 等 Peripheral Register 通常包含很多 bit 或 bit-field。

位运算让程序可以只修改目标控制位。

但需要提前知道一个工程边界：不是所有硬件寄存器都适合普通 Read-Modify-Write。有些 Register 具有特殊写入语义，后面必须以目标芯片 Reference Manual 为准。

---

## Mission Report

提交：

```text
What a bit means:
What the mask was:
Why = destroyed other bits:
How |= differs:
Set bit N expression:
Clear bit N expression:
Toggle bit N expression:
One real-hardware caution:
```

## Achievement Unlocked

你已经把第一关的“地址中的数据”进一步拆成：

```text
Register Value
→ Individual Bits
→ Mask
→ Controlled State
```

下一关：[Mission 03 — Volatile Mystery](../03-Volatile-Mystery/Mission.md)。