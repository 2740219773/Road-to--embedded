# Mission 02 — Bit Hacker：只想打开一个 LED，为什么其他灯全灭了？

## 故障现场

假设一个 8-bit 输出寄存器当前是：

```text
1010 0001
```

你只想把 bit5 设为 1，于是写了：

```c
reg = (1U << 5);
```

结果目标 LED 亮了，但原来亮着的其他 LED 全灭了。

## Predict

先计算 `1U << 5`，再预测整体赋值以后寄存器变成什么。

## 两种操作不是一回事

```c
reg =  (1U << 5);
reg |= (1U << 5);
```

第一句整体覆盖；第二句把旧值和 mask 做 OR 后再写回。

## Interactive Lab

配套：`03-Interactive-Labs/Register-Playground/`。

随机打开几个 bit，再分别执行 Set、Clear、Toggle 和 Overwrite，观察二进制与十六进制的变化。

## Break It

对下面三句先预测再验证：

```c
reg |=  (1U << 5);
reg &= ~(1U << 5);
reg ^=  (1U << 5);
```

## Knowledge

- `01-Knowledge-Base/C/03-Bitwise-and-Registers.md`

## Transfer — 进入 MCU

GPIO、Timer、UART 等硬件寄存器通常包含许多 bit/bit-field。位运算让程序可以修改目标控制位，而尽量不破坏无关状态。

注意：某些硬件寄存器具有特殊写入语义，必须以目标芯片 Reference Manual 为准，不能机械套用 Read-Modify-Write。

## Boss

写出 Set bit N、Clear bit N、Toggle bit N 三种操作，并能解释 mask、移位和最终结果。

下一步：把位操作真正连接到 GPIO。