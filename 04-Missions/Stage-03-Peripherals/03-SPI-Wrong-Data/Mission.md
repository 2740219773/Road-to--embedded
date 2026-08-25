# Mission 03 — SPI Wrong Data：四根线都有波形，为什么数据还是错的？

## Beginner Guide

- 适合：已完成 I²C No ACK 的学习者；
- 前置：CS、Clock、CPOL/CPHA、Bit Order 和 Datasheet 时序图；
- 预计：75 分钟；
- 本关产出：SPI 波形、采样边沿、Bit Order 和 Device Timing 证据；
- 上一关：I²C No ACK；当前关：SPI Wrong Data；下一关：ADC Jitter。

## What to Submit

使用 [Learning Record Template](../../../docs/LEARNING-RECORD-TEMPLATE.md)，记录期望模式、实际采样边沿、解码结果和最小修复。

## If You Are Stuck

先看 CS 是否包围完整事务，再看 CPOL/CPHA 和 Bit Order，最后才讨论设备数据含义。

## Ready to Continue

能够从波形判断采样边沿和位序后，再进入 ADC Jitter。

> 学习路径：[Stage 03 — Peripheral Engineer](../../../02-Learning-Path/Stage-03-Peripheral-Engineer/README.md) · 知识支撑：[SPI](../../../01-Knowledge-Base/Protocols/03-SPI.md) · 互动实验：[SPI Timing Playground](../../../03-Interactive-Labs/SPI-Timing-Playground/README.md)

## Mission Brief

你正在读取一个 SPI Device ID。

Datasheet 说应该返回：

```text
0xA5
```

逻辑分析仪上：

```text
SCLK 有波形
MOSI 有波形
MISO 有波形
CS 也在变化
```

程序也确实收到了一个 Byte。

但结果总是错的。

这关要打破一个常见误区：

> **有波形 ≠ 通信时序正确。**

调查链：

```text
Command / Configuration
→ CS
→ Clock idle / CPOL
→ Sample edge / CPHA
→ Bit order
→ Clock Frequency
→ MOSI / MISO timing
→ Device interpretation
```

---

## Before You Start

第一次看到这些词时先建立最小概念：

- SCLK：SPI Clock；
- MOSI：Controller → Device 数据线；
- MISO：Device → Controller 数据线；
- CS：Chip Select，选择当前 Device；
- CPOL：决定 Clock idle High / Low；
- CPHA：决定在哪个 Clock edge 采样；
- MSB / LSB first：Byte 的高位还是低位先发送；
- Datasheet Timing Diagram：器件手册里描述 Clock、Data、CS 之间时间关系的图。

先读：[SPI Knowledge](../../../01-Knowledge-Base/Protocols/03-SPI.md)

---

## 1. Predict — 不背 Mode，先看规则

假设 Device Datasheet 要求：

```text
Clock idle LOW
Sample on rising edge
MSB first
CS low during entire transaction
```

先回答：

1. 如果 MCU Clock idle HIGH，会先破坏哪一项？
2. 如果 MCU 在 rising edge 改数据，而 Device 也在 rising edge 采样，为什么危险？
3. 如果 Mode 完全一致，但 MCU 用 LSB first，会发生什么？
4. 如果 CS 根本没拉到有效状态，SCLK 再漂亮有意义吗？

---

## 2. Visualize — Controller 和 Device 直接对照

打开：[SPI Timing Playground](../../../03-Interactive-Labs/SPI-Timing-Playground/README.md)

第一组：

```text
Controller Mode 0
Device expects Mode 0
MSB first / MSB first
CS active
```

然后一次只改变一个条件：

```text
Device expects Mode 1
Device expects Mode 2
Device expects LSB first
CS inactive
```

每次解释：

```text
CPOL mismatch?
CPHA / sampling edge mismatch?
Bit order mismatch?
CS selection problem?
```

目标不是记住“Mode 2 不行”，而是知道**哪一条时序契约不一致**。

---

## 3. Observe — 真机先找一个固定响应

选择一个 SPI Device 的固定 ID / Status Register。

从 Datasheet 先找到：

```text
Required SPI Mode / edge rule:
Max SCLK:
Bit order:
CS active level:
Command byte:
Expected response:
```

然后只做最小读取。

逻辑分析仪至少同时观察：

```text
CS
SCLK
MOSI
MISO
```

记录：

```text
Measured SCLK frequency:
Clock idle level:
MOSI command:
MISO response:
CS low/high timing:
```

---

## 4. Explain — Sample Edge 才是关键

不要只说：

```text
Mode 0
Mode 1
```

要能展开成：

```text
Clock idle level
→ first edge
→ second edge
→ which edge changes data
→ which edge samples data
```

真实 Device 只关心这些物理时序是否满足。

Mode 0～3 只是方便配置的简称。

---

## 5. Inspect Raw Waveform — 不要完全相信自动 Decoder

逻辑分析仪可能按你设置的 SPI Mode 自动解码。

如果 Decoder 的 Mode 本身就设错，它也可以“很自信地显示错误 Byte”。

所以遇到争议时，放大到单个 Clock：

```text
SCLK edge
MOSI stable?
MISO stable?
Which side should sample here?
```

把 Datasheet 时序图放在旁边逐项对比。

---

## 6. Break It — 主动制造五类错误

一次只破坏一个条件。

### Fault A — CPHA Wrong

保持 Clock idle 不变，只切换采样边沿。

观察读回 Byte 是否变化，以及 Decoder 如何变化。

### Fault B — CPOL Wrong

让 Clock idle 电平与 Datasheet 不一致。

观察第一/第二边沿的语义如何整体变化。

### Fault C — Bit Order Wrong

MSB first ↔ LSB first。

选择一个不对称 Byte，例如：

```text
0x96 = 10010110
```

比 0xA5 更容易看出反转后的差异。

### Fault D — CS Timing Wrong

让 CS 提前抬高、过晚拉低，或者整帧没有正确选中 Device。

观察 Device 是否忽略事务或把 Command/Data 分段错误。

### Fault E — Clock Too Fast

把 SCLK 提高到接近或超过 Datasheet 上限。

这一步训练：

```text
correct Mode
≠ unlimited speed
```

---

## 7. Debug — 有波形但数据错的调查顺序

以后遇到 SPI 错数据，按：

```text
1. Correct device selected by CS?
2. CS covers the intended transaction?
3. SCLK idle level matches Datasheet?
4. Sample edge matches Datasheet?
5. MOSI/MISO stable around sample edge?
6. Bit order matches?
7. Clock frequency within limit?
8. Command / Address / Dummy / Data phases correct?
9. Electrical voltage / wiring valid?
```

不要从第 8 步直接开始改驱动逻辑。

---

## 8. Debug Case — 只看时序证据

进入：[SPI Wrong Mode Debug Case](../../../06-Debugging-Cases/SPI-Wrong-Mode/CASE.md)

Case 会给你 Datasheet 要求和真实波形特征，让你判断问题是 CPOL、CPHA、CS 还是 bit order。

---

## 9. Transfer — 为什么下一关是 ADC

UART、I²C、SPI 三关都在训练数字通信，但物理/时序契约完全不同：

```text
UART → no shared clock, receiver estimates sampling time
I²C  → shared clock + shared open-drain bus + ACK/address
SPI  → controller clock + dedicated data directions + CS + edge contract
```

下一关 ADC 会第一次从“数字通信”进入“模拟电压怎样变成数字码”。

调查思路仍然不变：

```text
Configuration
→ Physical reality
→ Measurement
→ Data meaning
```

---

## Mission Report

提交：

```text
Board / MCU:
SPI device:
Datasheet mode / edge rule:
Controller mode:
Bit order:
CS active level:
Expected device ID:
Measured SCLK frequency:
Observed command / response:
One Playground mismatch observation:
Three injected faults:
Raw waveform evidence:
Root cause of one wrong-data case:
Minimal fix:
Regression check:
```

---

## Achievement Unlocked

完成后，你应该不再把：

```text
SCLK/MOSI/MISO/CS all toggle
=
SPI works
```

当成结论。

你已经建立：

```text
CS
→ Clock contract
→ Sampling edge
→ Bit order
→ Command/Data phase
→ Device interpretation
```

下一关：**Mission 04 — ADC Jitter**。
