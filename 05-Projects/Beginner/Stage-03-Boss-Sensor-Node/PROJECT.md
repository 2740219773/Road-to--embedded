# Stage 03 Boss Project — Multi-Peripheral Sensor Node

## Navigation

- [Stage 03 — Peripheral Engineer](../../../02-Learning-Path/Stage-03-Peripheral-Engineer/README.md)
- [UART Mission](../../../04-Missions/Stage-03-Peripherals/01-UART-Garbled/Mission.md)
- [I²C Mission](../../../04-Missions/Stage-03-Peripherals/02-I2C-No-ACK/Mission.md)
- [SPI Mission](../../../04-Missions/Stage-03-Peripherals/03-SPI-Wrong-Data/Mission.md)
- [ADC Mission](../../../04-Missions/Stage-03-Peripherals/04-ADC-Jitter/Mission.md)
- [DMA Mission](../../../04-Missions/Stage-03-Peripherals/05-DMA-No-Transfer/Mission.md)
- [CAN Mission](../../../04-Missions/Stage-03-Peripherals/06-CAN-Arbitration/Mission.md)
- [RS-485 Mission](../../../04-Missions/Stage-03-Peripherals/07-RS485-No-Reply/Mission.md)
- [Modbus Mission](../../../04-Missions/Stage-03-Peripherals/08-Modbus-Wrong-Register/Mission.md)
- [Stage 03 Mixed Debug Challenge](../../../06-Debugging-Cases/Stage-03-Mixed-Peripheral-Failures/CASE.md)

## 项目目标

构建一个小型真实数据采集节点，但**不要求为了覆盖课程而把八种外设全部塞进一个工程**。

Boss 要证明的是：

```text
多个数据源
→ MCU acquisition
→ buffer / timing
→ communication output
→ PC or another device
→ observable evidence
```

以及当其中一层出现异常时，你能快速定位。

---

## 推荐最小系统

选择一个合理组合，例如：

```text
Analog Input → ADC ──────┐
I²C Sensor ──────────────┼→ MCU → UART → PC
SPI Device（可选）───────┘
              ↓
             DMA
```

或者工业通信方向：

```text
ADC / I²C Sensor
↓
MCU
↓
RS-485 / Modbus
↓
PC / Test Tool
```

或者网络节点方向：

```text
Local Sensor
↓
MCU
↓
CAN Transceiver
↓
Second CAN Node
```

关键是系统关系合理，而不是外设数量最多。

---

## Required Capabilities

Boss 至少覆盖：

1. 一种真实 Sensor / Analog Source；
2. 一种数字外设总线：I²C 或 SPI；
3. 一种对外通信链：UART、CAN、RS-485/Modbus 中至少一种；
4. Timer 组织周期行为；
5. 至少一次 DMA 数据搬运，或明确说明当前系统为什么暂不需要 DMA；
6. PC / Peer Device 能看到结构化结果；
7. Debugger + 物理测量证据同时存在。

## System Map

编码前先画：

```text
Source
→ Peripheral
→ Buffer / Data Structure
→ Processing
→ Communication Peripheral
→ Physical Bus
→ Receiver
→ Data Meaning
```

对每一层标记：

```text
What can fail?
What evidence proves this layer?
Which tool observes it?
```

---

## Interface Contract

为每个接口写一张最小表：

```text
Interface:
Pins / Bus:
Clock / Rate:
Data Format:
External Device:
Expected Physical Evidence:
Expected Software Evidence:
```

例如 UART 不能只写“115200”，还要知道 TX Pin、Frame Format 和真实 bit-time 验证方式。

---

## Required Evidence

最终演示至少包含：

- Debugger 证明当前 Firmware 正在运行；
- 一个 Peripheral Register / Driver State 证据；
- 一组真实总线波形或电压证据；
- 一个 Buffer / Memory 证据；
- 一个协议/数据解释证据；
- 一张 Schematic / Datasheet 对照；
- 一份从 Symptom 到 Regression 的完整调查记录。

不能只提交“串口打印正常”的截图。

---

## Required Failure Injection

至少主动制造并定位 5 个故障，其中必须来自至少 4 个不同系统层。

候选：

```text
UART wrong Baud / Clock
I²C missing Pull-up / wrong Address
SPI wrong Mode / CS
ADC Vref / Sampling
DMA wrong Count / Direction
CAN no peer ACK / Bit Timing
RS-485 direction stuck
Modbus register mapping
```

要求不是覆盖清单，而是避免五个故障都只是“参数写错”。

每个故障记录：

```text
Symptom
Expected
Layer
Hypothesis
First high-value measurement
Software Evidence
Physical Evidence
Root Cause
Minimal Fix
Regression
```

---

## Observability Requirement

Boss 系统必须故意设计“可观察点”：

```text
debug variable / state
buffer snapshot
status/error counter
optional test pin
protocol capture point
```

目标是让未来故障能够被看见，而不是等出问题后才想办法加日志。

---

## Acceptance

项目通过需要同时满足：

- 数据采集与通信功能能稳定运行；
- 能画出真实数据流和控制流；
- 能解释每个主要外设的 Clock / Pin / Bus / Device 关系；
- 能把数字状态和真实波形对应起来；
- 能说明 DMA 是否参与以及数据边界；
- 能区分 Physical Layer、Protocol 和 Data Meaning；
- 至少 5 个主动故障有完整证据链；
- 修复后有 Regression；
- 换成另一块同类器件时，知道优先查 Datasheet 的哪些信息。

---

## Final Demo

建议演示顺序：

```text
1. System Map
2. Interface Contract
3. Live data acquisition
4. Physical bus evidence
5. Buffer / protocol evidence
6. Inject one fault
7. Diagnose with evidence
8. Apply minimal fix
9. Regression
10. Explain how the same method transfers to another peripheral
```

## Boss 真正考什么

不是“能不能同时初始化很多 HAL 外设”，而是：

```text
你能否把一个多外设设备当作系统理解
+
面对异常时知道从哪里开始测
```

完成 Boss 后进入 Stage 03 Exit Check。
