# Current Progress

## Project Version

V2.3 — MCU / STM32 Learning Path

当前阶段：**Phase B — Stage 03 Peripheral Engineer quality gate**。

## Completed Baselines

- [x] V2.1 — Architecture Refactor merged to `main`;
- [x] V2.2 — Stage 01 Interactive Pilot merged to `main`;
- [x] V2.3 Phase A — Stage 02 MCU Foundation merged to `main`;
- [x] Stage 02 已形成 First Contact → LED → Interrupt → Timer → PWM → Debug Challenge → Boss → Exit Check。

## V2.3 Phase B Build Order

```text
UART ✅
→ I²C ✅
→ SPI ✅
→ ADC ✅
→ DMA ✅
→ CAN ✅
→ RS-485 ✅
→ Modbus RTU ✅
→ Mixed Peripheral Debug Challenge ✅
→ Multi-Peripheral Sensor Node Boss ✅
→ Stage 03 Exit Check ✅
→ Quality Gate ← current
```

## Completed Formal Loops

### UART ✅
Knowledge / Frame Visualizer / Garbled Mission / real bit-time evidence / Debug Case 已闭环。

### I²C ✅
Knowledge / Bus Visualizer / No ACK Mission / physical-bus + address evidence / Debug Case 已闭环。

### SPI ✅
Knowledge / Timing Playground / Wrong Data Mission / Datasheet-vs-waveform evidence / Wrong Mode Debug Case 已闭环。

### ADC ✅
Knowledge / Sampling Simulator / Jitter Mission / Vin + Vref + raw-code evidence / Unstable Reference Debug Case 已闭环。

### DMA ✅
Knowledge / Transfer Simulator / No Transfer Mission / Request + Memory evidence / Wrong Length Debug Case 已闭环。

核心：

```text
DMA Complete
≠ configuration correct
≠ memory safe
```

### CAN ✅
- [x] CAN Knowledge 明确 Controller / Transceiver / CAN_H-L / Peer / ACK；
- [x] Arbitration Visualizer 支持 3 节点逐 bit 仲裁；
- [x] Mission 06 重构：Arbitration + real bus evidence；
- [x] 区分 normal Arbitration Lost 与 communication failure；
- [x] CAN No-ACK Debug Case；
- [x] Bit Timing / Peer / ACK / Error Counter 进入故障链。

核心：

```text
wins arbitration
≠ frame acknowledged
≠ communication succeeded
```

### RS-485 ✅
- [x] 从原 Modbus 混合主题中拆出独立 Physical-Layer Mission；
- [x] 新增 RS-485 Half-Duplex Visualizer；
- [x] 建立 UART → Transceiver → DE/RE → A/B → Peer 链；
- [x] 建立 Direction Turnaround 证据；
- [x] RS-485 Direction Stuck Debug Case。

核心：

```text
UART bytes correct
≠ RS-485 physical bus correct
```

### Modbus RTU ✅
- [x] Modbus 作为 RS-485 之后的独立协议语义 Mission 08；
- [x] Modbus Frame Builder 支持 PDU Address 与 4xxxx Manual Display 对照；
- [x] 明确 Manual display / API value / PDU address / actual bytes；
- [x] 区分 Timeout 与 Exception Response；
- [x] Modbus Wrong Register Debug Case。

核心：

```text
RS-485 works
≠ Modbus frame correct
≠ register mapping correct
≠ returned data meaning correct
```

## Integration ✅

- [x] Stage 03 Mixed Peripheral Debug Challenge；
- [x] Multi-Peripheral Sensor Node Boss 重构；
- [x] Boss 不要求堆满全部外设，而要求合理组合与不同系统层故障；
- [x] Stage 03 Exit Check；
- [x] Debugging Cases Index 更新。

## Current Quality Gate

合并 Phase B 前只做质量收口，不新增新 Stage 03 技术主题：

- [ ] 按零基础学习者视角走查 Stage 02 Exit → Stage 03 Mission 01～08 → Mixed Challenge → Boss → Exit；
- [ ] 检查 Knowledge / Mission / Lab / Debug Case 双向导航；
- [ ] 检查旧 `Stage-03-Peripheral-Explorer` 和旧 `07-Modbus-Wrong-Register` 路径；
- [ ] 检查首次术语是否满足 beginner-readability；
- [ ] 检查 Stage 03 README / Boss / Exit 是否一致；
- [ ] 检查 PR #4 diff 只包含 Phase B；
- [ ] Mergeability / CI / review thread final check；
- [ ] Phase B 合并 `main` 后再进入 Stage 04 正式建设。

## Scope Guardrail

Phase B 只建设 Stage 03。Stage 04 Debug Hunter 虽然已有 vertical-slice prototype，但系统化调试课程不在本 PR 抢跑。

PWM 基础属于 Stage 02；Stage 03 只复用，不重新作为独立主题。

## Current Rule

每个 Stage 的正式完成标准继续保持：

```text
Beginner Knowledge
→ Mission
→ Interactive / Visual Aid
→ Real Measurement
→ Failure Injection
→ Debug Case / Evidence
→ Mixed Challenge
→ Boss
→ Exit Check
→ Quality Gate
```

不以“文件数量”和“API 调通数量”作为完成标准。