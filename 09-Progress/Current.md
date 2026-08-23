# Current Progress

## Project Version

V2.4 — Debugging Track / Stage 04 Debug Hunter

## Completed Baselines

- [x] V2.1 — Architecture Refactor merged to `main`;
- [x] V2.2 — Stage 01 Interactive Pilot merged to `main`;
- [x] V2.3 Phase A — Stage 02 MCU Foundation merged to `main`;
- [x] V2.3 Phase B — Stage 03 Peripheral Engineer merged to `main`;
- [x] Stage 01～03 已经积累 C/Memory、真实 MCU、通信/采样/DMA 以及大量 evidence-driven fault practice。

## Current Goal

Stage 04 不再继续增加外设数量，而是把 Stage 01～03 已经反复使用的排错经验抽象成一套可迁移方法：

```text
Symptom
→ Expected
→ Preserve / Reproduce
→ System Layer
→ Hypothesis Tree
→ High-value Measurement
→ Evidence
→ Eliminate / Confirm
→ Root Cause
→ Minimal Fix
→ Regression
```

最终目标：面对一个没见过的故障，也知道应该怎样开始，而不是只能识别已经做过的 UART/I2C/SPI 等案例。

## Existing Vertical-Slice Assets

### Knowledge

- [x] Evidence-Driven Debugging 原型；
- [x] Cortex-M Fault Model 原型；
- [x] Stack & Memory Corruption 原型；
- [x] Debugger Watchpoint 原型；
- [x] Oscilloscope & Logic Analyzer 原型。

### Missions

- [x] 01 Fault Scene 原型；
- [x] 02 Who Wrote It 原型；
- [x] 03 Choose the Instrument 原型。

### Cases / Boss

- [x] HardFault Bad Pointer；
- [x] Interrupt Storm；
- [x] Stack Overflow；
- [x] Broken Firmware Investigation Boss 原型。

这些资产证明方向可行，但目前仍不足以视为正式 Stage 04 完成。

## Formal Stage 04 Capability Chain

当前审计后确定的正式能力链：

```text
01 Preserve & Reproduce the Fault Scene
↓
02 Build Layer Map & Hypothesis Tree
↓
03 Choose the Highest-Value Measurement
↓
04 Catch the First Bad Write / Data Flow
↓
05 Reconstruct Crash / Fault Context
↓
06 Minimal Fix & Regression
↓
Mixed Unknown-Failure Challenge
↓
Broken Firmware Investigation Boss
↓
Stage 04 Exit Check
```

现有 Mission 会尽量升级复用；不为了编号整齐重复创建相同主题。

## Workstream A — Core Method ← Current

- [ ] 把 Evidence-Driven Debugging 从纲要升级成 Stage 04 Source of Truth；
- [ ] 明确 Symptom / Expected / Fact / Hypothesis / Evidence / Root Cause 的区别；
- [ ] 建立 Layer Map 与 Hypothesis Tree；
- [ ] 建立“最高信息量测量”选择原则；
- [ ] 建立 Reproduction / Scene Preservation / Change One Variable；
- [ ] 建立 Minimal Fix / Regression / Boundary Check。

## Workstream B — Missions

- [ ] Mission 01 Fault Scene：从 HardFault 专题扩展为保护现场 + 可复现性；
- [ ] Mission 02 Who Wrote It：升级为 Data-flow / first bad write investigation；
- [ ] Mission 03 Choose the Instrument：升级为 measurement selection，而不是工具竞猜；
- [ ] 新增 Layer / Hypothesis Tree Mission；
- [ ] 新增 Crash Context / HardFault Mission，避免所有 crash 方法塞进 Fault Scene；
- [ ] 新增 Minimal Fix / Regression Mission。

## Workstream C — Evidence Tools / Knowledge

- [ ] Debugger / Breakpoint / Watchpoint / Memory / Call Stack 的职责边界；
- [ ] Oscilloscope vs Logic Analyzer 的测量问题选择；
- [ ] Stack / Memory Corruption 的 first-cause 思维；
- [ ] Cortex-M Fault evidence：Stacked PC / LR / xPSR / Fault Status / Fault Address；
- [ ] 必要时建立一个 Debug Decision / Evidence Board Interactive Lab，前提是它能提供真实教学价值，而不是 UI 装饰。

## Workstream D — Integration

- [ ] 重构 Broken Firmware Investigation Boss；
- [ ] 建立 Stage 04 Mixed Unknown-Failure Challenge；
- [ ] 建立 Stage 04 Exit Check；
- [ ] Stage 04 README 完整 Entry → Mission → Case → Boss → Exit 导航；
- [ ] 零基础完整走查；
- [ ] 导航 / 术语 / PR 范围质量门。

## Scope Guardrail

V2.4 不新增新的 MCU 外设课程，不扩 RTOS 并发主题，不把 Stage 04 变成“更多错误案例合集”。

允许复用 Stage 01～03 的 UART/I²C/SPI/ADC/DMA/CAN/RS-485/Modbus 故障作为训练素材，但教学重点必须是：

```text
为什么选择这个证据？
这个结果排除了什么？
下一步为什么这样走？
```

而不是再次教授外设本身。

## Current Rule

Stage 04 的完成标准不是“会解决几个已知 Fault”，而是：

> 给学习者一个没有标签、没有答案的新故障，他仍能构造调查计划、选择高信息量证据并用回归证明根因。