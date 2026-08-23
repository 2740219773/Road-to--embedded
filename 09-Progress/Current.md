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
UART
→ I²C
→ SPI
→ ADC
→ DMA
→ CAN
→ RS-485 / Modbus
→ Stage 03 Mixed Peripheral Debug Challenge
→ Multi-Peripheral Sensor Node Boss
→ Stage 03 Exit Check
```

## Workstream A — UART

- [x] 已有 UART beginner Knowledge 纵向样板；
- [x] 已有 UART Frame Visualizer；
- [x] 已有 UART Garbled Debug Case；
- [ ] 修复旧 Mission 导航与 Stage 命名；
- [ ] 将 UART Mission 重构为 Predict → Observe → Explain → Break It → Debug → Transfer → Report；
- [ ] 明确 TX/RX/GND、电平标准、8N1、Baud、Clock、真实 bit-time 测量；
- [ ] 让 Knowledge / Mission / Lab / Debug Case 形成双向导航；
- [ ] 完成 UART 零基础走查。

## Workstream B — I²C

- [ ] 正式审计现有 Knowledge / Mission / Lab / Debug Case；
- [ ] 建立 Address / ACK / Pull-up / Open-Drain / waveform 证据链；
- [ ] 完成 I²C 闭环。

## Workstream C — SPI

- [ ] 正式审计现有 Knowledge / Mission / Lab；
- [ ] 建立 Clock / CPOL / CPHA / CS / bit order / waveform 证据链；
- [ ] 完成 SPI 闭环。

## Workstream D — ADC / DMA

- [ ] ADC：从 Analog Voltage → Sample → Code → Noise / Reference / Sampling；
- [ ] DMA：从 Peripheral Request → Transfer → Buffer → Length / Address / Completion；
- [ ] 保持 ADC 与 DMA 独立理解，再在综合项目中组合。

## Workstream E — CAN / RS-485 / Modbus

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