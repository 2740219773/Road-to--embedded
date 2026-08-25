# Mission 01 — UART Garbled：乱码到底从哪一层开始？

## Beginner Guide

- 适合：完成 Stage 02 Exit Check、第一次调查串口时序的学习者；
- 前置：Clock、Pin、Frame、Baud 和基本逻辑分析仪概念；
- 预计：60 分钟；
- 本关产出：UART 配置、Frame、Bit Time 和采样证据；
- 上一关：Stage 02 Exit Check；当前关：UART Garbled；下一关：I²C No ACK。

## What to Submit

使用 [Learning Record Template](../../../docs/LEARNING-RECORD-TEMPLATE.md)，记录 TX/RX Baud、Frame、测量 Bit Time 和根因。

## If You Are Stuck

先用 UART Frame Visualizer 观察采样点，再区分软件 Baud、Clock、Pin 和物理波形。

## Ready to Continue

能够解释配置 Baud 与真实 Bit Time 的关系后，再进入 I²C No ACK。

> 学习路径：[Stage 03 — Peripheral Engineer](../../../02-Learning-Path/Stage-03-Peripheral-Engineer/README.md) · 知识支撑：[UART](../../../01-Knowledge-Base/Protocols/01-UART.md) · [Clock Tree](../../../01-Knowledge-Base/MCU/05-Clock-Tree.md) · 互动实验：[UART Frame Visualizer](../../../03-Interactive-Labs/UART-Frame-Visualizer/README.md)

## Mission Brief

MCU 程序持续发送：

```text
Hello
```

但 PC 串口工具显示的却是一串乱码。

很多人的第一反应是：

> “换几个 Baud Rate 试试。”

这关要训练的不是“猜中一个能用的波特率”，而是证明：

```text
Software Byte
→ UART Configuration
→ Peripheral Clock
→ TX Pin Waveform
→ Adapter / Wire
→ RX Sampling
→ PC Decoded Data
```

到底在哪一层开始偏离预期。

---

## Before You Start

第一次看到这些词时，先建立最小概念：

- UART：MCU 内部负责串行发送/接收 bit 的外设；
- TX：Transmit，发送线；
- RX：Receive，接收线；
- GND：通信双方共同的电气参考地；
- Baud Rate：UART 每个 bit 的时间基准；
- 8N1：8 Data Bits、No Parity、1 Stop Bit；
- Bit Time：一个 bit 在真实波形里持续多久；
- Logic-level UART：MCU Pin 上常见的 3.3 V / 5 V 数字串行电平，不等于 RS-232 或 RS-485。

先读：[UART Knowledge](../../../01-Knowledge-Base/Protocols/01-UART.md)

---

## 1. Predict — 不接串口工具，先算真实时间

假设目标配置：

```text
115200 Baud
8N1
```

先计算：

```text
bit time ≈ 1 / 115200 ≈ ? µs
```

再回答：

1. 如果真实 TX bit time 约 17.36 µs，更接近什么 Baud？
2. 如果 PC 配 115200，但 MCU 实际发 57600，为什么会乱码？
3. 如果 TX Pin 完全没有波形，继续研究 PC 串口软件有没有意义？

---

## 2. Visualize — 先看接收端怎么“读错”

打开：[UART Frame Visualizer](../../../03-Interactive-Labs/UART-Frame-Visualizer/README.md)

第一组：

```text
Byte = 0x55
TX = 115200
RX = 115200
```

观察：

- Start / D0～D7 / Stop；
- LSB first；
- TX bit time；
- RX 每个数据位的 sample 落点。

然后只改：

```text
RX = 57600
```

不要先看最终 decoded byte，先预测后几位的 sample 会往哪里漂。

### 为什么用 0x55

`0x55 = 01010101`，数据位不断翻转，既适合可视化，也适合后面用示波器测真实 bit time。

---

## 3. Observe — 真机先只发送一个容易测的字节

不要一开始就发送很长字符串。

让 MCU 周期发送：

```text
0x55
```

或 ASCII：

```text
'U'
```

因为 ASCII `U` 也是 `0x55`。

先用 Stage 02 的 Debugger 证明发送代码真的执行，再到 TX Pin 测量。

记录：

```text
Firmware reached UART send code? Yes / No
TX idle voltage:
TX low voltage:
Measured bit time:
Calculated real Baud:
Expected Baud:
```

如果 `Measured bit time` 已经不对，PC 端乱码只是后果。

---

## 4. Explain — 把“配置值”和“物理事实”分开

请明确区分：

```text
source code says 115200
```

和：

```text
TX pin actually has 8.68 µs/bit
```

它们不是同一种证据。

UART 的真实发送时间来自：

```text
Clock Source
→ Peripheral Clock
→ UART Divider / Timing Logic
→ TX Bit Time
```

所以“UART 参数写着 115200”不代表真实波形一定就是 115200。

---

## 5. Build the Full Evidence Chain

按照下面顺序，不要跳层：

### A — Firmware

- 发送函数真的执行了吗？
- 发送 Buffer 里真的是你以为的数据吗？

### B — UART Peripheral

- UART Clock 开了吗？
- Baud / Data Bits / Parity / Stop 设置是什么？
- TX 功能真的 Enable 了吗？

### C — Pin

- TX 配到了正确 Physical Pin 吗？
- Pin 的 Alternate Function 正确吗？

### D — Electrical Signal

- Idle 是什么电压？
- High / Low 电平范围合理吗？
- 一个 bit 持续多久？

### E — Wiring / Adapter

- MCU TX 是否接到 Adapter RX？
- GND 是否共地？
- Adapter 是匹配的 logic-level UART，还是另一种电气标准？

### F — Receiver / PC

- PC Baud 是否和真实 TX Baud 一致？
- 8N1 / Parity / Stop 是否一致？
- PC 工具显示方式是否按预期解释数据？

---

## 6. Break It — 主动制造五类乱码

每次只破坏一个条件。

### Fault A — PC Baud 错

MCU 保持不变，只修改 PC Baud。

记录：TX waveform 是否变化？为什么？

### Fault B — MCU Clock 假设错

让真实 Peripheral Clock 与 UART 配置计算假设不一致。

预测真实 bit time 怎样变化，再用示波器验证。

### Fault C — Frame Format 错

让发送端和接收端在 Parity / Stop Bits 上不一致。

比较这种错误与纯 Baud mismatch 的现象。

### Fault D — TX / RX 接线错或缺 GND

观察“配置全对但链路仍失败”的物理层问题。

### Fault E — 发送的数据就不是你以为的值

例如 Buffer 内容、字符串结束条件或编码理解错误。

这能避免把所有“显示不对”都归因于波特率。

---

## 7. Debug — 乱码时先问哪一个问题

以后看到 UART 乱码，优先顺序是：

```text
1. Firmware really sent expected byte?
2. TX pin has waveform?
3. Real bit time = ?
4. Frame format = ?
5. Voltage level compatible?
6. TX/RX/GND correct?
7. Receiver configured to match measured reality?
```

如果第 3 步已经证明真实 Baud 错了，就优先回 Clock Tree / UART Timing，而不是继续换 PC 软件。

---

## 8. Debug Case — 不看答案先算

进入：[UART Garbled Debug Case](../../../06-Debugging-Cases/UART-Garbled/CASE.md)

只根据：

```text
PC = 115200 8N1
MCU source = 115200 8N1
Measured TX bit time ≈ 17.36 µs
TX voltage = 0–3.3 V
```

判断最应该继续调查哪一层。

---

## 9. Transfer — 把这套方法带到后面的 Bus

UART 是 Stage 03 的第一关，因为它最容易看到：

```text
Protocol / Configuration
≠
Electrical Reality
```

后面的 I²C、SPI、CAN、RS-485 仍然会使用同一方法：

```text
Software state
→ Peripheral state
→ Pin / Bus waveform
→ External device response
→ Protocol meaning
```

---

## Mission Report

提交一页调查记录：

```text
Board / MCU:
UART instance:
TX pin / RX pin:
Electrical interface type:
Expected Baud / format:
Measured TX high/low voltage:
Measured bit time:
Calculated real Baud:
PC configuration:
One Visualizer observation:
Three injected faults:
Evidence that separated them:
Root cause of one garbled case:
Minimal fix:
Regression check:
```

---

## Achievement Unlocked

完成后，你应该不再通过“不断换 Baud 直到能看”调 UART。

你已经建立：

```text
Byte
→ Frame
→ Bit Time
→ Pin Waveform
→ Receiver Sampling
→ Decoded Data
```

下一关：**Mission 02 — I²C No ACK**。这次不仅有 Clock 和 Data 两根线，还会第一次遇到 Open-Drain、Pull-up、Address 与 ACK。
