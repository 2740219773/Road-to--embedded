# Current Progress

## Project Version

V2.3 — MCU / STM32 Learning Path

当前里程碑：**Phase A — Stage 02 MCU Foundation 内容与质量验收已完成**。

下一开发阶段：**Phase B — Stage 03 Peripheral Engineer**。

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

### Phase A Quality Gate

- [x] 按零基础学习者视角走查 Stage 01 Exit → Mission 00～04 → Debug Challenge → Boss → Exit；
- [x] 检查新增内部链接并修复 Button Interrupt 的 Debugger Basics 死链；
- [x] 检查首次术语解释，补充 HAL、Callback、ARR/CCR、示波器参考地等容易形成断层的词；
- [x] 清理 Clock Tree 页残留的 V2.1 状态和 Stage 02/03 PWM 边界旧表述；
- [x] PR diff 范围确认：仅 Stage 02 Phase A、Stage 03 边界说明和路线治理修订；
- [x] 分支相对 `main` behind = 0；
- [x] 当前提交没有 GitHub CI/status checks 或 workflow runs；
- [x] PR 没有未处理的 inline review thread。

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

## Next — V2.3 Phase B

Phase B 正式建设 Stage 03 — Peripheral Engineer。优先顺序：

```text
UART
→ I²C
→ SPI
→ ADC
→ DMA
→ CAN
→ RS-485 / Modbus
→ Multi-Peripheral Sensor Node Boss
```

PWM 基础不在 Stage 03 重教，只在需要时复用 Stage 02 的 Timer/PWM 与仪器测量能力。

## Current Rule

Phase A 完成后，Stage 03 继续使用同一个小闭环：Knowledge → Mission → Interactive/Visual → Real Evidence → Break It → Debug → Boss/Exit。后续 Stage 04～08 的现有内容继续视为 vertical-slice prototype，直到各自正式版本开始。