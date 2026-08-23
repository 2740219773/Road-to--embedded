# Current Progress

## Project Version

V2.3 — MCU / STM32 Learning Path

当前阶段：**Phase B — Stage 03 Peripheral Engineer**。

## Completed Baselines

- [x] V2.1 — Architecture Refactor merged to `main`;
- [x] V2.2 — Stage 01 Interactive Pilot merged to `main`;
- [x] V2.3 Phase A — Stage 02 MCU Foundation merged to `main`;
- [x] Stage 02 已形成 First Contact → LED → Interrupt → Timer → PWM → Debug Challenge → Boss → Exit Check。

## V2.3 Phase B — Stage 03

目标：在 Stage 02 的真实硬件证据链上，系统扩展 MCU 与外部设备通信、采样和数据搬运能力。

统一底座：

```text
Clock
→ Peripheral
→ Register / Driver State
→ Pin / Bus
→ Electrical Signal
→ External Device
→ Data / Protocol Meaning
```

Stage 03 不重新教授 GPIO、Timer/PWM、Debugger 基础，而是在每个新外设里复用这些能力。

## Build Order

```text
UART ✅
→ I²C ✅
→ SPI ✅
→ ADC ← current
→ DMA
→ CAN
→ RS-485 / Modbus
→ Stage 03 Mixed Peripheral Debug Challenge
→ Multi-Peripheral Sensor Node Boss
→ Stage 03 Exit Check
```

## Workstream A — UART ✅

- [x] UART beginner Knowledge 正式化；
- [x] UART Frame Visualizer 升级：TX/RX Baud 分离、RX sample drift、decoded byte / stop validation；
- [x] 修复旧 Mission 的 `Stage-03-Peripheral-Explorer` 死路径；
- [x] UART Mission 重构为 Predict → Visualize → Observe → Explain → Break It → Debug → Transfer → Report；
- [x] 明确 TX/RX/GND、电平标准、8N1、Baud、Clock、真实 bit-time 测量；
- [x] UART Garbled Debug Case 升级为 Evidence / Layer / Calculation / Regression；
- [x] Knowledge / Mission / Lab / Debug Case 双向导航完成；
- [x] UART 路线按零基础入口复查完成。

## Workstream B — I²C ✅

- [x] I²C Knowledge 正式化；
- [x] I²C Visualizer 升级：Device/Master 7-bit Address、R/W、on-wire Address Byte、ACK/NACK、Power、Pull-up；
- [x] 修复旧 Mission 的 `Stage-03-Peripheral-Explorer` 死路径；
- [x] 建立 Address / ACK / Pull-up / Open-Drain / waveform 证据链；
- [x] 明确 7-bit Address 与 `(address << 1) | R/W` 的区别；
- [x] I²C Mission 重构为 Predict → Visualize → Observe → Explain → Break It → Debug → Transfer → Report；
- [x] I²C No ACK Debug Case 升级为 Physical Bus → Protocol 的分层取证；
- [x] Knowledge / Mission / Lab / Debug Case 双向导航完成；
- [x] I²C 路线按零基础入口复查完成。

## Workstream C — SPI ✅

- [x] SPI Knowledge 正式化；
- [x] SPI Timing Playground 升级：Controller Mode vs Device expected Mode、CPOL/CPHA、sample edge、bit order、CS；
- [x] 修复旧 Mission 的 `Stage-03-Peripheral-Explorer` 死路径；
- [x] SPI Mission 重构为 Predict → Visualize → Observe → Explain → Break It → Debug → Transfer → Report；
- [x] 建立 Clock / CPOL / CPHA / CS / bit order / waveform 证据链；
- [x] 强化 Datasheet timing diagram vs raw waveform，而不是只信逻辑分析仪自动 Decoder；
- [x] 新增 SPI Wrong Mode Debug Case；
- [x] Debugging Cases 索引加入 SPI；
- [x] Knowledge / Mission / Lab / Debug Case 双向导航完成；
- [x] SPI 路线按零基础入口复查完成。

SPI 核心能力标准：

```text
SCLK / MOSI / MISO / CS all toggle
≠
SPI timing contract is correct
```

## Workstream D — ADC ← Current

- [ ] 审计 ADC Knowledge / Mission / Sampling Simulator；
- [ ] 建立 Analog Voltage → Reference → Sampling → Quantization → Digital Code 的最小模型；
- [ ] 区分真实输入噪声、参考电压、采样时间、源阻抗与软件显示抖动；
- [ ] 检查 ADC Sampling Simulator 是否真正能表现分辨率、Vref、噪声和采样；
- [ ] 建立 ADC Jitter 独立 Debug Case；
- [ ] 完成 ADC 零基础走查。

## Workstream E — DMA

- [ ] DMA：从 Peripheral Request → Transfer → Buffer → Length / Address / Completion；
- [ ] 保持 ADC 与 DMA 独立理解，再在综合项目中组合。

## Workstream F — CAN / RS-485 / Modbus

- [ ] CAN：从 Shared Bus → ID / Arbitration → Transceiver → Termination → Frame；
- [ ] RS-485：先处理 Differential Physical Layer；
- [ ] Modbus：再处理 Frame / Address / Function / Register Meaning；
- [ ] 不把 RS-485 和 Modbus 混成同一层。

## Integration

- [ ] Stage 03 Mixed Peripheral Debug Challenge；
- [ ] Multi-Peripheral Sensor Node Boss 重构；
- [ ] Stage 03 Exit Check；
- [ ] 零基础完整走查；
- [ ] 路线、链接、首次术语和 PR 范围验收。

## Scope Guardrail

Phase B 只建设 Stage 03。Stage 04 Debug Hunter 虽然已有样板，但系统化调试课程不在 Phase B 抢跑；这里的 Debug 只服务当前外设学习闭环。

PWM 基础已经属于 Stage 02；Stage 03 只在综合项目或外设时序场景里复用，不再把 PWM 当新主题重复教学。

## Current Rule

每完成一个外设，至少满足：

```text
Beginner Knowledge
→ Mission
→ Interactive / Visual Aid
→ Real Measurement
→ Failure Injection
→ Debug Case / Evidence
→ Stage Navigation
```

不以“已有一篇 Markdown”或“API 调通了”作为完成标准。