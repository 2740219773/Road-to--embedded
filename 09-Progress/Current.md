# Current Progress

## Project Version

V2.3 — MCU / STM32 Learning Path

当前阶段：**Phase B — Stage 03 Peripheral Engineer**。

## Completed Baselines

- [x] V2.1 — Architecture Refactor merged to `main`;
- [x] V2.2 — Stage 01 Interactive Pilot merged to `main`;
- [x] V2.3 Phase A — Stage 02 MCU Foundation merged to `main`;
- [x] Stage 02 已形成 First Contact → LED → Interrupt → Timer → PWM → Debug Challenge → Boss → Exit Check。

## Build Order

```text
UART ✅
→ I²C ✅
→ SPI ✅
→ ADC ✅
→ DMA ✅
→ CAN ← current
→ RS-485 / Modbus
→ Stage 03 Mixed Peripheral Debug Challenge
→ Multi-Peripheral Sensor Node Boss
→ Stage 03 Exit Check
```

## Completed Formal Loops

### UART ✅
Knowledge / Frame Visualizer / Garbled Mission / real bit-time evidence / Debug Case 已闭环。

### I²C ✅
Knowledge / Bus Visualizer / No ACK Mission / physical-bus + address evidence / Debug Case 已闭环。

### SPI ✅
Knowledge / Timing Playground / Wrong Data Mission / Datasheet-vs-waveform evidence / Wrong Mode Debug Case 已闭环。

### ADC ✅
Knowledge / Sampling Simulator / Jitter Mission / Vin+Vref+raw-code evidence / Unstable Reference Debug Case 已闭环。

### DMA ✅
- [x] DMA Knowledge 正式化；
- [x] DMA Transfer Simulator 升级：Request、Enable、Direction、Transfer Count、Buffer Capacity、CPU mode、overflow；
- [x] DMA No Transfer Mission 重构；
- [x] 建立 Peripheral Event → Request → Transfer Contract → Memory Result → Completion 证据链；
- [x] 区分“DMA 没搬”“DMA 搬错”“DMA 越界”“DMA 搬了但通知没来”；
- [x] DMA Wrong Length Debug Case 正式化；
- [x] DMA 路线按零基础入口复查完成。

DMA 核心能力标准：

```text
DMA Complete
≠
DMA configuration is correct / memory is safe
```

## Workstream F — CAN ← Current

- [ ] 审计 CAN Knowledge / Mission / Arbitration Visualizer；
- [ ] 建立 CAN Controller → Transceiver → Differential Bus → Nodes 的物理链；
- [ ] 建立 ID / Arbitration / Dominant / Recessive 的直觉；
- [ ] 检查 Visualizer 是否真正表现逐 bit Arbitration；
- [ ] 建立 bitrate / termination / ACK / bus-state 故障视角；
- [ ] 新增 CAN 独立 Debug Case；
- [ ] 完成 CAN 零基础走查。

## Workstream G — RS-485 / Modbus

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