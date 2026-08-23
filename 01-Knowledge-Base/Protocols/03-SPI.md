# SPI — 有波形，为什么数据还是会错？

## 先用一句人话理解

SPI（Serial Peripheral Interface）是一种常见的芯片间同步通信方式。

和 UART 不同，SPI 通常由 Controller 主动提供 Clock，所以双方不需要各自猜 bit time；但它们必须对“时钟什么时候空闲、在哪个边沿采样、bit 从哪一头先发、什么时候选中设备”达成一致。

最常见连接：

```text
MCU / Controller               SPI Device

SCLK  -----------------------> Clock
MOSI  -----------------------> Controller → Device data
MISO  <----------------------- Device → Controller data
CS    -----------------------> Select this device
GND   ------------------------ Common reference
```

第一次学习 SPI，先把它理解成：

> Controller 一边打节拍，一边在节拍之间放数据；Device 必须在正确的边沿去读这些数据。

## 四根常见信号

- SCLK：Serial Clock，通信时钟；
- MOSI：Controller 发给 Device 的数据线；
- MISO：Device 返回给 Controller 的数据线；
- CS / SS：Chip Select / Slave Select，用来告诉某个 Device“当前这次通信是给你的”。

不同厂商可能使用 SDI/SDO、SCK、NSS 等名字。名称不同，角色相同。

## SPI 在系统哪里

继续沿用 Stage 03 统一链路：

```text
Application wants device ID
↓
SPI command / driver
↓
SPI Controller configuration
↓
SCLK / MOSI / MISO / CS Pins
↓
Electrical waveform
↓
Device samples bits
↓
Device returns data
```

所以：

```text
SPI API returned success
≠ Device interpreted the bits correctly
```

## CPOL 是什么

CPOL = Clock Polarity（时钟极性）。

它主要决定：

> SCLK 在没有传输时，默认保持 High 还是 Low？

```text
CPOL = 0 → idle LOW
CPOL = 1 → idle HIGH
```

## CPHA 是什么

CPHA = Clock Phase（时钟相位）。

初学阶段最重要的理解是：

> 一次 Clock 周期有两个边沿。哪一个边沿用来 Sample（采样）数据，哪一个边沿用来 Change/Shift（改变）数据？

如果 Controller 在某个边沿刚改变 MOSI，而 Device 恰好也在这个边沿读取，就可能读到不稳定或错位的数据。

## Mode 0～3 不需要死背

CPOL + CPHA 组合形成常见 Mode 0～3：

```text
Mode 0 → CPOL 0 / CPHA 0
Mode 1 → CPOL 0 / CPHA 1
Mode 2 → CPOL 1 / CPHA 0
Mode 3 → CPOL 1 / CPHA 1
```

但真正工程里，不应该先问：

> “这个芯片是 Mode 几？”

而应该看 Datasheet 时序图，回答：

```text
Clock idle 是 High 还是 Low？
Device 在 rising 还是 falling edge 采样？
数据应该在什么时候稳定？
```

Mode 只是这几个规则的简写。

## Bit Order 是什么

一个 Byte 里有 8 个 bit。

SPI 双方还要约定先发哪一端：

```text
MSB first → 最高有效位先发送
LSB first → 最低有效位先发送
```

例如：

```text
0x96 = 10010110
```

如果一边按 MSB first 发，另一边按 LSB first 理解，即使 Clock/CS 都完全正常，Byte 仍然会错。

## CS 为什么非常重要

很多 SPI Device 只有在 CS 有效时才把 SCLK/MOSI 当作自己的事务。

通常常见形式是：

```text
CS goes active
↓
Command / Address / Data clocks
↓
CS goes inactive
```

CS 的作用不只是“选择哪个芯片”。有些器件还用 CS 边沿判断：

- 一帧从哪里开始；
- Command 什么时候结束；
- 内部状态机什么时候复位；
- 数据什么时候锁存。

所以：

```text
SCLK/MOSI/MISO all have waveform
≠ transaction is valid
```

## Full Duplex 是什么

SPI 常见结构允许：

```text
MOSI sends one bit
while
MISO receives one bit
```

这叫 Full Duplex（全双工）。

因此很多 SPI Controller 在“只想读数据”时仍然必须发送 Dummy Byte 来产生 Clock。

第一次只需要记住：

> SPI 的 Clock 通常由 Controller 发起，没有 Clock，就没有数据搬运。

## Clock Frequency 也可能错

即使 Mode / CS / bit order 都正确，如果 SCLK 超过器件 Datasheet 允许的最大频率，Device 也可能来不及准备或采样数据。

所以真实调试还要测：

```text
SCLK Frequency
CS setup/hold timing
Data stable around sample edge
```

## SPI Timing Playground

进入：[SPI Timing Playground](../../03-Interactive-Labs/SPI-Timing-Playground/README.md)

工具允许分别设置：

- Controller Mode；
- Device expected Mode；
- Controller / Device bit order；
- CS 是否有效；
- Data Byte。

推荐不要先背 Mode，而是故意制造：

```text
Mode 0 vs Mode 1
Mode 0 vs Mode 2
MSB vs LSB
CS inactive
```

然后解释每种情况到底破坏了哪一项 timing contract。

## 真机最小实验

建议选一个能读取固定 Device ID 的 SPI 器件。

先从 Datasheet 找：

```text
Required Mode / sampling edge
Max SCLK
CS timing
Command for Device ID
Expected response
Bit order
```

然后用逻辑分析仪/示波器观察：

```text
CS
SCLK
MOSI command
MISO response
```

不要只相信自动 Decoder。必要时放大到单个 Clock edge，直接观察数据在哪个边沿稳定、在哪个边沿被采样。

## “有波形但数据错”怎么调查

推荐顺序：

```text
1. Correct device selected by CS?
2. CS timing covers the whole transaction?
3. SCLK idle level matches Datasheet?
4. Sampling edge matches Datasheet?
5. Bit order matches?
6. SCLK frequency within limit?
7. Command / Address / Dummy / Data phases understood correctly?
8. MISO voltage and wiring valid?
```

## Learning Loop

- Stage：[Stage 03 — Peripheral Engineer](../../02-Learning-Path/Stage-03-Peripheral-Engineer/README.md)
- Mission：[SPI Wrong Data](../../04-Missions/Stage-03-Peripherals/03-SPI-Wrong-Data/Mission.md)
- Interactive Lab：[SPI Timing Playground](../../03-Interactive-Labs/SPI-Timing-Playground/README.md)
- Debug Case：[SPI Wrong Mode](../../06-Debugging-Cases/SPI-Wrong-Mode/CASE.md)

完成这一条后，你应该能够拿 Datasheet 时序图和真实 SCLK/MOSI/MISO/CS 波形逐项对比，而不是看到“SPI 有波形”就宣布通信正常。