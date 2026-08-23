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
→ ADC ✅
→ DMA ← current
→ CAN
→ RS-485 / Modbus
→ Stage 03 Mixed Peripheral Debug Challenge
→ Multi-Peripheral Sensor Node Boss
→ Stage 03 Exit Check
```

## Workstream A — UART ✅

- [x] UART Knowledge / Frame Visualizer / Mission / Debug Case 正式闭环；
- [x] 能从 `0x55` 真实 TX bit time 反推 Baud；
- [x] 能区分配置值、Clock 和物理 TX 波形。

## Workstream B — I²C ✅

- [x] I²C Knowledge / Bus Visualizer / Mission / Debug Case 正式闭环；
- [x] 能区分 7-bit Address、on-wire Address Byte、R/W、ACK/NACK；
- [x] 能先验证 Open-Drain / Pull-up / Power 等物理总线条件。

## Workstream C — SPI ✅

- [x] SPI Knowledge / Timing Playground / Mission / Debug Case 正式闭环；
- [x] Playground 支持 Controller vs Device Mode、CPOL/CPHA、bit order、CS；
- [x] 能用 Datasheet timing diagram 与 raw waveform 判断 sampling edge，而不是只信自动 Decoder。

## Workstream D — ADC ✅

- [x] ADC Knowledge 正式化：Analog Voltage → Vref → Sampling → Quantization → Raw Code；
- [x] ADC Sampling Simulator 升级：Vin / Vref / Resolution / Input Noise / Vref Noise + 64-sample statistics；
- [x] ADC Jitter Mission 重构为 Predict → Visualize → Real Measurement → Break It → Debug → Transfer → Report；
- [x] 明确 Quantization、LSB、Vref、Source Impedance、Sampling Time；
- [x] 新增 ADC Unstable Reference Debug Case；
- [x] Debugging Cases 索引加入 ADC；
- [x] Knowledge / Mission / Lab / Debug Case 双向导航完成；
- [x] ADC 路线按零基础入口复查完成。

ADC 核心能力标准：

```text
ADC code moves
≠
ADC is inaccurate
```

先区分 Vin、Vref、Sampling、Quantization 和 Software Conversion，再决定是否需要过滤。

## Workstream E — DMA ← Current

- [ ] 审计 DMA Knowledge / Mission / Transfer Simulator / Existing Debug Case；
- [ ] 建立 Peripheral Request → Source/Destination → Length → Transfer → Completion 的最小模型；
- [ ] 区分“DMA 没启动”“DMA 搬错地址”“长度错误”“Buffer 被覆盖”；
- [ ] 检查 Transfer Simulator 是否能表现 address / length / direction / completion；
- [ ] 重构 DMA Mission；
- [ ] 正式化 DMA Wrong Length Debug Case；
- [ ] 完成 DMA 零基础走查。

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