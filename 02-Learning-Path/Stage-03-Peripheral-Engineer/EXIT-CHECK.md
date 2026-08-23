# Stage 03 Exit Check — 你真的会调外设了吗？

Stage 03 的目标不是“UART/I²C/SPI 都调用过一次”，而是确认你已经能把外设问题放进统一证据链。

如果下面的问题只能背答案、不能说明怎么测，建议回到对应 Mission。

---

## Part A — UART

1. PC 和 MCU 都配置 115200，仍然乱码时，为什么测 TX bit time 比继续改 Baud 更有价值？
2. `0x55` 为什么适合做第一次真实时序测量？
3. UART、TTL 电平、RS-232、RS-485 分别是什么层？
4. 软件配置正确为什么不能证明物理 TX 速率正确？

必须能写出：

```text
Byte
→ UART frame
→ TX pin
→ real bit time
→ receiver sampling
```

---

## Part B — I²C

面对 No ACK，能够先判断：

```text
SDA/SCL idle level
Device power
Pull-up
START
7-bit Address
R/W bit
ACK bit
```

并回答：

- 7-bit Address 和线上 Address Byte 有什么关系？
- 没有 Pull-up 时为什么不应该先分析 Device Address？
- NACK 是一个现象，可能来自哪些层？

---

## Part C — SPI

给一张 Datasheet Timing Diagram 和一张真实 SCLK/MISO/CS 波形，能够判断：

```text
CPOL
CPHA
Sample Edge
Change Edge
CS active window
MSB/LSB order
```

并解释：

```text
logic analyzer decoded a byte
≠ device sampled the intended byte
```

---

## Part D — ADC

给定：

```text
Vin
Vref
Resolution
Raw ADC Code
```

能够估算理论 Code，并区分：

```text
Quantization
Input Noise
Reference Drift
Sampling Problem
Software Scaling
```

必须知道什么时候用万用表，什么时候用示波器，为什么不能把所有 Jitter 都直接平均掉。

---

## Part E — DMA

画出：

```text
Peripheral Event
→ DMA Request
→ Source / Destination
→ Count / Width / Increment
→ Buffer
→ Half / Complete Event
```

然后解释：

- DMA 没启动应该查什么？
- DMA 搬错地址应该查什么？
- `DMA Complete` 为什么不代表 Buffer 一定安全？
- Buffer 64 个 half-word、Count 128 时会出现什么风险？

---

## Part F — CAN

能够解释：

```text
Identifier
→ Dominant / Recessive
→ Arbitration
```

以及另一条链：

```text
CAN Controller
→ Transceiver
→ CAN_H / CAN_L
→ Peer Node
→ ACK
```

必须区分：

```text
Arbitration Lost
```

和：

```text
No ACK / Error Counter increasing
```

为什么它们不是同一类问题？

---

## Part G — RS-485

解释：

```text
UART bytes
→ transceiver
→ DE / RE
→ A/B differential bus
→ remote transceiver
→ remote UART
```

并回答：

- UART TX 正常为什么不代表 A/B 有合法波形？
- Half Duplex 为什么需要 Direction Turnaround？
- 为什么“TX buffer empty”不一定等于最后一个 Stop Bit 已经真正发完？

---

## Part H — Modbus RTU

解释四个地址概念：

```text
Manual display number
Software/API input value
PDU address
Actual request bytes
```

给定：

```text
Manual: Holding Register 40001
Request address bytes: 9C 41
Response: Illegal Data Address
```

能够说明下一步应该验证什么，而不是继续检查 RS-485 有没有波形。

---

## Part I — Cross-Peripheral Debugging

### Case 1

UART 有乱码。

你第一优先拿 Debugger、示波器还是 Datasheet？为什么？

### Case 2

I²C SDA/SCL 空闲都是接近 0 V。

你会不会先修改 Address？为什么？

### Case 3

SPI 四根线都有波形，但数据错误。

你先看 API Return Code，还是看原始采样边沿？

### Case 4

ADC Vin 稳定但所有 Code 同比例漂移。

优先测什么？

### Case 5

DMA Complete 正常但邻近 Memory 被改写。

优先查什么参数？

### Case 6

CAN Frame 完整，但 No ACK。

优先查 Arbitration ID 还是 Peer / Bit Timing / Bus？

### Case 7

RS-485 请求结束后 DE 一直保持发送。

为什么这比 Modbus Register Mapping 更靠前？

### Case 8

Modbus 有结构化 Exception Response。

这对物理层意味着什么？

---

## Part J — Instrument Choice

你应该能根据问题选择第一条高信息量证据：

```text
Debugger
Multimeter
Oscilloscope
Logic Analyzer
Memory View / Watchpoint
Schematic
Datasheet
Protocol Capture
```

工具不是越多越好。目标是：最少测量，最大限度排除假设。

---

## Passing Standard

建议至少满足：

- 完成 Mission 01～08；
- 完成 Stage 03 Mixed Peripheral Debug Challenge；
- 完成 Multi-Peripheral Sensor Node Boss；
- 至少独立分析 6 个不同层级的故障；
- 至少完成 3 次“软件证据 + 物理波形”联合定位；
- 至少完成 1 次 Memory/DMA 边界定位；
- 能把 RS-485 与 Modbus 明确分层；
- 能从 Datasheet 找到 Timing / Address / Electrical requirement；
- 能对陌生外设先画出调查链，再开始改代码。

---

## Ready for Stage 04

如果面对一个以前没用过的 Peripheral，你已经会先问：

```text
What data should exist?
What timing/clock drives it?
Which register/driver state proves it?
Which pin/bus carries it?
What physical signal should I measure?
What does the external device expect?
What does the protocol/data actually mean?
```

就可以进入 Stage 04 — Debug Hunter。

Stage 04 不再以新增外设为主，而是把这里已经反复使用的 Evidence-driven Debugging 系统化。