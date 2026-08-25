# Current Progress

## Project Version

V2.7 — Beginner Framework and Content Quality Gate

内容基线：**V2.5 — Stage 05 RTOS Engineer completed**。
历史基线：**V2.6 — Beginner Journey Audit completed**。
当前阶段：**V2.7 — Beginner Framework and Content Quality Gate completed**。

## Completed Baselines

- [x] V2.1 — Architecture Refactor merged to `main`;
- [x] V2.2 — Stage 01 Interactive Pilot merged to `main`;
- [x] V2.3 Phase A — Stage 02 MCU Foundation merged to `main`;
- [x] V2.3 Phase B — Stage 03 Peripheral Engineer merged to `main`;
- [x] V2.4 — Stage 04 Debug Hunter local quality gate completed;
- [x] Stage 02 已形成 First Contact → LED → Interrupt → Timer → PWM → Debug Challenge → Boss → Exit Check。

## V2.5 Stage 05 Build Order

```text
Prototype baseline ✅
→ Mission closure ✅
→ Stage 05 Debug Cases ✅
→ RTOS Concurrency Workbench ✅
→ Mixed Concurrency Challenge ✅
→ RTOS Refactor Host Fixture ✅
→ Stage 05 Exit Check ✅
→ V2.5 Quality Gate ✅
```

当前已完成 V2.4 基线和 V2.5 Stage 05 本地质量门。

本轮实现状态：

- [x] V2.4 Stage 04 已完成本地质量门；
- [x] 四个 Stage 05 Mission 按统一闭环收口；
- [x] 四个 Stage 05 Debug Case、Mixed Challenge 和 Exit Check；
- [x] RTOS Concurrency Workbench；
- [x] RTOS Refactor Host Fixture 与六份 Evidence Pack；
- [x] V2.5 内容、Host、浏览器和导航质量门；
- [x] Host Fixture 输出：`Stage 05 host fixture regression: PASS`；
- [ ] 真实 FreeRTOS、MCU、Debugger、示波器和逻辑分析仪验证（明确不纳入本阶段本地质量门）。

## V2.6 Beginner Journey Audit

```text
Start Here ✅
→ Programming Warmup ✅
→ Stage 00 System Map Mission ✅
→ Stage 00 Exit Check ✅
→ Route Manifest ✅
→ Formal Stage readability/navigation pass ✅
→ Static quality gate ✅
→ Browser regression ✅
→ Beginner walkthrough ✅
→ Beginner setup / runnable warmup / hardware recovery hardening ✅
```

完成状态：本地路线、内容、Host Fixture 和浏览器检查均通过，并记录 `Beginner route audit: PASS`；Stage 06～08 未提前标记为正式完成。

## V2.7 Beginner Framework and Content Quality Gate

```text
Route contract fields ✅
→ C Basics Knowledge / Check ✅
→ NUCLEO-F401RE reference route ✅
→ Boardless learning boundary ✅
→ Formal Mission beginner blocks ✅
→ Formal Lab first-action guidance ✅
→ Warmup C CI quality gate ✅
→ V2.7 Beginner Framework Quality Gate ✅
```

质量门状态：

- [x] 文档结构、路线字段和本地链接通过检查；
- [x] Formal Stage 00～05 Mission 新手字段通过检查；
- [x] Formal Lab README 首次操作和故障提示通过检查；
- [x] CI 已加入 GCC C11 Warmup 编译、运行和关键输出检查；
- [ ] 当前本地 shell 没有 GCC、Clang 或 MSVC，Warmup C 样例尚未在本机编译运行；
- [ ] 真实 MCU、Debugger、万用表、示波器和逻辑分析仪仍未验证。

本轮新手体验加固已完成：

- [x] Windows / C 工具链检查与第一次运行说明；
- [x] 五个可单独编译的 Programming Warmup C 样例；
- [x] Stage 02 Hardware Setup 与 Recovery Guide；
- [x] Instrument Basics 与统一 Learning Record Template；
- [ ] 当前工作环境没有 `gcc`、`clang` 或 `cl`，C 样例仅完成静态检查，尚未在本机编译运行。

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

## Phase B Quality Gate ✅ Completed

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

Stage 04 Debug Hunter 与 Stage 05 RTOS Engineer 已从 vertical-slice prototype 收口为正式课程；Stage 06～08 仍保持 prototype 边界。

PWM 基础属于 Stage 02；Stage 03 只复用，不重新作为独立主题。

## Next

当前下一阶段：

```text
V2.8 / Stage 06 Embedded Linux formal planning
```

V2.7 完成后，下一阶段重点才是从 MCU/RTOS 进入 Boot、Kernel、Device Tree、Driver 和 User Space；Stage 06 当前仍只有 prototype 基线。

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
