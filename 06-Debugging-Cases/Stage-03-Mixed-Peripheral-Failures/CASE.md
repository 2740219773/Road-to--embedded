# Stage 03 Debug Challenge — 到底是哪一层先出问题？

## Scenario

一个 MCU 数据采集节点包含：UART、I²C、SPI、ADC、DMA、CAN、RS-485 和 Modbus。现在多个功能出现异常。

本关不考 API 记忆，而是训练：

```text
现象
→ 放到正确系统层
→ 选择最高信息量的第一条证据
→ 排除假设
→ 找到根因
→ 最小修复
→ 回归验证
```

每个 Fault 在修改代码前必须先写：

```text
Symptom:
Expected:
Most likely layer:
First measurement:
Why this measurement is valuable:
```

## Fault A — UART Garbled

软件和 PC 都写着 115200 8N1，但终端持续乱码。

第一条证据必须包含 TX bit time，并根据波形反推真实 Baud；不能以继续尝试 Baud 数字作为主要方法。

## Fault B — I²C No ACK

程序认为 Address 正确，但设备没有 ACK。

先证明：

```text
Device Power
SDA idle
SCL idle
START
Address bits
ACK bit
```

再判断 Physical Bus 还是 Address / Device State。

## Fault C — SPI Wrong Data

SCLK/MOSI/MISO/CS 都有波形，但设备 ID 不对。

对照 Datasheet 检查：

```text
CS window
Clock idle level
Sample edge
Change edge
Bit order
```

不要只相信 Logic Analyzer 自动 Decoder。

## Fault D — ADC Scale Drift

Vin 看起来稳定，但 ADC Code 整体出现比例变化。

先比较：

```text
Vin
Vref
Raw Code
Sampling settings
Software conversion
```

区分随机抖动和整体比例漂移。

## Fault E — DMA Memory Boundary

DMA Complete 正常出现，但 Memory View 显示目标 Buffer 后面的数据也在变化。

检查：

```text
Source
Destination
Transfer Count
Data Width
Increment
Buffer Capacity
```

明确 `DMA Complete` 只说明搬运流程到达完成事件，不说明边界一定安全。

## Fault F — CAN No ACK

CAN_H/CAN_L 有完整 Frame，节点没有失去 Arbitration，但 ACK 不存在，Error Counter 持续增加。

要求区分：

```text
normal arbitration loss
vs
peer / ACK / bit-timing / physical-bus problem
```

## Fault G — RS-485 Turnaround

请求波形存在，但发送结束后本地 Driver 一直没有释放，远端没有正常响应窗口。

优先调查：

```text
UART final byte timing
DE / RE
A/B request end
remote response window
```

而不是先修改 Modbus Register Address。

## Fault H — Modbus Wrong Register

设备手册写 Holding Register 40001，实际请求 Address Byte 是 `9C 41`，设备返回 Illegal Data Address。

要求区分：

```text
Manual display number
Software/API value
PDU address
Actual request bytes
```

并用当前设备 Manual / API convention 证明正确映射。

## Cross-Peripheral Classification

最后把八个 Fault 重新按系统层归类，而不是按外设名归类：

```text
Clock / Timing
Electrical / Physical Bus
Peripheral Configuration
Protocol Framing
Memory / DMA
External Device State
Data Meaning / Mapping
```

观察哪些不同外设其实共享相同的故障模式。

## Instrument Selection

为下面问题选择第一优先证据工具，并说明原因：

```text
UART Baud
I²C Idle Bus
SPI Sample Edge
ADC Reference
DMA Memory Boundary
CAN ACK
RS-485 Direction
Modbus Address Meaning
```

候选包括：Debugger、Memory View、Multimeter、Oscilloscope、Logic Analyzer、Datasheet / Protocol Capture。

## Investigation Record

每个 Fault 提交：

```text
Symptom
Expected
Layer
Hypotheses
First high-value measurement
Software evidence
Physical evidence
Root cause
Minimal fix
Regression
```

## Acceptance

通过标准是：面对混合外设异常时，能够稳定选择正确调查层和第一条高价值证据，而不是先替换代码或随机修改参数。

通过后进入 Stage 03 Boss — Multi-Peripheral Sensor Node。
