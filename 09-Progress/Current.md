# Current Progress

## Project Version

V2.3 — MCU / STM32 Learning Path

当前阶段：**Phase B — Stage 03 Peripheral Engineer ready for merge**。

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
→ Quality Gate ✅
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

## Phase B Quality Gate ✅

- [x] 按零基础学习者视角走查 Stage 02 Exit → Stage 03 Mission 01～08 → Mixed Challenge → Boss → Exit；
- [x] 检查 Knowledge / Mission / Lab / Debug Case 导航与 Stage 总入口；
- [x] 反查旧 `Stage-03-Peripheral-Explorer` 路径，无剩余搜索结果；
- [x] 反查旧 `07-Modbus-Wrong-Register` 路径，无剩余搜索结果；
- [x] 新增 CAN / RS-485 / Modbus 首次术语均先建立最小概念；
- [x] Stage 03 README / Boss / Exit Check 已对齐 01～08 Mission；
- [x] Interactive Labs 总索引已把 PWM 归回 Stage 02，并加入 RS-485 Lab；
- [x] README / ROADMAP / DEVELOPMENT-PLAN / Missions Index 已从旧 Phase A/P0 状态同步到 Phase B；
- [x] PR #4 diff 检查：只包含 Stage 03 Phase B 资产与必要治理同步；
- [x] 分支相对 `main` behind = 0；
- [x] 最新检查时无 GitHub CI/status checks 或 workflow runs；
- [x] PR #4 无未处理 inline review thread。

## Scope Guardrail

Phase B 只建设 Stage 03。没有在尾部临时追加 Watchdog、Flash、Ethernet 或新的协议主题。

Stage 04 Debug Hunter 虽已有 vertical-slice prototype，但系统化调试课程留到 V2.4 正式建设。

PWM 基础属于 Stage 02；Stage 03 只复用，不重新作为独立主题。

## Next

PR #4 Ready for Review 并合并后：

```text
V2.4 / Stage 04 Debug Hunter
```

重点不再增加外设，而是把 Stage 01～03 已积累的排错经验抽象成系统方法。

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