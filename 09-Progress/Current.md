# Current Progress

## Project Version

V2.3 — MCU / STM32 Learning Path

当前 Phase：**Phase A — Stage 02 MCU Foundation**。

## Completed Baselines

- [x] V2.1 — Architecture Refactor merged to `main`;
- [x] V2.2 — Stage 01 Interactive Pilot merged to `main`;
- [x] Stage 01 已形成 Mission 01～05 → Debug Challenge → Boss → Exit Check。

## V2.3 Phase A — Stage 02

目标：第一次把 Stage 01 的虚拟模型接到真实 MCU。

```text
Virtual Register
→ Real Peripheral Register
→ GPIO / Timer Hardware
→ Physical Pin
→ Voltage / Waveform
→ Instrument Evidence
```

### Real Hardware Entry

- [x] MCU / Development Board / Debug Probe / Firmware 新手认知；
- [x] Build → Flash → Reset → Run → Breakpoint 链路；
- [x] 可替代开发板原则；
- [x] Mission 00 — First Contact。

### GPIO / Clock / Debugger

- [x] GPIO beginner knowledge；
- [x] Clock Tree beginner knowledge；
- [x] Debugger Basics；
- [x] Mission 01 — First LED 按完整教学节奏重构；
- [x] 加入 Pin Voltage 与 Schematic 证据要求。

### Interrupt / Timer / PWM

- [x] Interrupt beginner knowledge；
- [x] Timer/PWM beginner knowledge；
- [x] Mission 02 — Button Interrupt；
- [x] Mission 03 — Timer Tick；
- [x] Mission 04 — PWM Measurement；
- [x] PWM Visualizer 继续作为辅助互动工具复用。

### Integration

- [x] Stage 02 Mixed Hardware Debug Challenge；
- [x] GPIO Control Node Boss 与 Mission 顺序重新对齐；
- [x] Stage 02 Exit Check；
- [x] Stage 02 README 形成完整 Entry → Mission → Debug → Boss → Exit 导航。

## Whole-Project Route Audit

本轮在 Stage 02 完成后重新检查 PROJECT / README / ROADMAP / ARCHITECTURE / DEVELOPMENT-PLAN / Stage 00～08 职责。

发现并已修复：

- [x] README / PROJECT 仍停留在 V2.1 状态；
- [x] DEVELOPMENT-PLAN 仍是历史迁移清单；
- [x] ARCHITECTURE 仍把 V2.1 P0 当当前任务；
- [x] ROADMAP 里的 V2.3 MCU 目标与 Stage 02/03 分工表达不清；
- [x] Stage 02 与 Stage 03 都把 PWM 写成主线，职责重复；
- [x] Stage 06/07/08 页面仍保留过期 V2.1/P0 状态。

修订后的统一定义：

```text
V2.3 Phase A = Stage 02 MCU Foundation
V2.3 Phase B = Stage 03 Peripheral Engineer
```

这样保留 V2.3 原定的 UART / ADC / SPI / I2C / DMA 等 MCU 外设目标，同时避免把所有内容塞给第一次接触开发板的新手。

## Route Audit Conclusion

当前路线没有发生方向性偏离。

总主线仍然是：

```text
System View
→ C / Memory
→ Real MCU Foundation
→ MCU Peripherals
→ Systematic Debugging
→ RTOS
→ Embedded Linux
→ FPGA
→ System Integration
```

本轮发现的问题主要是“治理文档落后”和“Stage 02/03 边界表达重复”，不是技术路线本身错误。

## Remaining Before Phase A Merge

- [ ] 按真正零基础学习者视角完整走查 Stage 01 Exit → Mission 00～04 → Debug Challenge → Boss → Exit；
- [ ] 检查 Stage 02 新增内部链接和首次术语解释；
- [ ] 检查 PR #3 diff 是否只包含 V2.3 Phase A + 路线治理修订；
- [ ] Mergeability / CI / final review；
- [ ] 合并 Phase A 到 `main` 后，再开始 V2.3 Phase B — Stage 03 正式建设。

## Current Rule

Phase A 合并前，不新增 UART / ADC / SPI / I2C / DMA 课程。后续 Stage 04～08 的现有内容继续视为 vertical-slice prototype。