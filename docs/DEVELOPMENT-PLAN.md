# Development Plan — Living Plan

## Purpose

这个文件描述当前项目如何继续建设，不再作为 V2.1 迁移清单。

已完成：

```text
V2.1 Architecture Refactor
V2.2 Stage 01 Interactive Pilot
V2.3 Phase A Stage 02 MCU Foundation
```

当前基线：**V2.5 — Stage 05 RTOS Engineer 已完成本地质量门**；**V2.6 — Beginner Journey Audit 已完成**；**V2.7 — Beginner Framework and Content Quality Gate 已通过**。

## Stable Architecture

顶层结构保持稳定：

```text
01-Knowledge-Base/
02-Learning-Path/
03-Interactive-Labs/
04-Missions/
05-Projects/
06-Debugging-Cases/
07-OpenMAIC/
08-Resources/
09-Progress/
```

除非现有职责无法表达真实需求，不再增加新的顶层分类。

## Learning Path Contract

```text
Stage 00 System Explorer
Stage 01 C & Memory
Stage 02 MCU Rookie
Stage 03 Peripheral Engineer
Stage 04 Debug Hunter
Stage 05 RTOS Engineer
Stage 06 Embedded Linux
Stage 07 FPGA Builder
Stage 08 System Integrator
```

每个正式建设 Stage 最终应具备：

- Entry Requirements；
- Beginner Concept / Knowledge；
- Mission Chain；
- Interactive / Instrument Evidence；
- Failure Injection；
- Topic Debug Cases；
- Mixed Debug Challenge；
- Boss Project；
- Exit Check；
- Final Quality Gate。

## Historical Baseline — V2.3

V2.3 拆为两个连续 Phase。

### Phase A — Stage 02 MCU Foundation ✅

已完成并合并：

```text
First Contact
→ First LED
→ Button Interrupt
→ Timer Tick
→ PWM Measurement
→ Mixed Hardware Debug Challenge
→ GPIO Control Node Boss
→ Exit Check
```

建立 Build / Flash / Debugger、GPIO、Clock、Interrupt、Timer/PWM、Schematic、Multimeter/Oscilloscope，以及软件证据和物理证据联合定位能力。

### Phase B — Stage 03 Peripheral Engineer ✅

已完成内容建设：

```text
UART
→ I²C
→ SPI
→ ADC
→ DMA
→ CAN
→ RS-485
→ Modbus RTU
→ Mixed Peripheral Debug Challenge
→ Multi-Peripheral Sensor Node Boss
→ Exit Check
```

Phase B 已完成并合并。已通过：

```text
zero-beginner walkthrough
→ navigation / stale-path audit
→ first-use terminology audit
→ governance consistency
→ PR scope / mergeability / CI / review check
→ merged
```

Phase B 已停止扩张。Watchdog、Flash、Ethernet 或新的通信协议只有在后续 Stage/版本存在明确学习目标和完整闭环时才加入。

## Completed Baseline — V2.4 Stage 04 Debug Hunter

本版本已把 Stage 04 的 prototype 收口为一个可执行的小闭环：

```text
Evidence Record
→ Mission Chain
→ Debug Case
→ Evidence Workbench
→ Mixed Challenge
→ Broken Firmware Boss
→ Exit Check
→ Quality Gate
```

本阶段不新增 MCU 外设，不连接真实硬件，不把 PC 仿真或 OpenMAIC 生成结果当成真实测量或课程效果验证。

## Completed Baseline — V2.5 Stage 05 RTOS Engineer

V2.5 保留四个 RTOS 主 Mission：Race Condition、Priority Inversion、Deadlock、Queue Overflow；ISR→Task 与 Task Stack/Deadline 作为支撑证据进入 Mixed Challenge、Boss 和 Exit Check。四个 Mission、Workbench、Mixed Challenge、Boss、Exit Check 和质量门已完成。

正式闭环为：

```text
Task / Scheduler
→ Synchronization
→ Race / Priority / Deadlock / Queue
→ Evidence Workbench
→ Mixed Challenge
→ RTOS Refactor Boss
→ Exit Check
→ Quality Gate
```

本阶段使用确定性 C11 Host 模型和浏览器虚拟实验，不依赖 FreeRTOS，不声称真实 MCU 或仪器已验证。

## Development Unit

后续尽量以“小闭环”而不是“章节数量”为单位推进：

```text
一个真实问题
→ 一个 Mission
→ 一组必要 Knowledge
→ 一个互动或真实测量
→ 一个故障注入
→ 一份 Evidence Record
→ 更新 Stage / Progress
```

如果一个主题只有知识页，没有任务、实验和故障，不视为正式课程完成。

## Beginner Readability Gate

新人第一次遇到术语时优先按：

```text
它是什么
→ 在系统哪里
→ 为什么需要
→ 一个直觉模型
→ 英文名 / 缩写
→ 最小结构图
→ 参数 / API / 寄存器
```

不要因为目标是“工程化”就默认读者已经知道 IDE、ISR、DMA、ABI、Pin Mux、Clock Tree、Transceiver、PDU 等术语。

## Scope Guardrails

1. Stage 02 不扩张成外设百科；
2. Stage 03 不重复教授 Stage 02 已完成的 GPIO/Timer/PWM 基础；
3. RS-485 与 Modbus 必须保持 Physical Layer / Protocol Meaning 分层；
4. Stage 04 专注系统性 Debug 方法，不靠继续增加外设制造内容量；
5. Stage 05 必须建立在裸机多外设系统经验之上；
6. Linux 和 FPGA 的纵向样板在对应版本到来前只维护明显错误，不继续横向扩张；
7. V3.0 Web/平台化在真实学习路径成熟前不抢占主线。

## Quality Gate for Each Version

合并正式版本前至少检查：

- Roadmap 与真实 Stage 职责一致；
- README / PROJECT / Current Progress 不使用过期版本状态；
- Mission 链能够从 Stage Entry 连续走到 Mixed Challenge / Boss / Exit；
- Knowledge 没有被多个 Mission 大段复制；
- Interactive Lab 描述的能力确实已经实现；
- 新手关键术语第一次出现有解释；
- 链接没有指向退役路径；
- 已实现与 planned/prototype 明确区分；
- PR 只包含当前版本范围内的变化；
- 有明确的“为什么现在停止扩张”的质量门。

## Long-term Direction

总路线保持不变：

```text
System View
→ C / Memory
→ Real MCU Foundation
→ MCU Peripherals
→ Systematic Debugging
→ RTOS
→ Embedded Linux
→ FPGA
→ PC / MCU / Linux / FPGA System Integration
```

最终竞争力来自跨层工程能力，而不是单独堆某一种 API 或框架。

## V2.6 Beginner Journey Audit

V2.6 先不扩展 Stage 06 内容，而是完成 Start Here、零基础热身、Stage 00 Mission/Exit Check、路线 manifest、正式路线字段统一、GitHub 参考索引和 Beginner Walkthrough。后续新手体验加固补充了 PC/C 环境检查、可运行 Warmup 样例、Stage 02 硬件准备与恢复手册、仪器入门和统一学习记录模板。

质量门必须同时区分：静态链接已验证、浏览器交互已验证、Host Fixture 已验证、真实 MCU/FreeRTOS/仪器尚未验证。

## Historical Next-Stage Placeholder

V2.3 Phase B、V2.4 Stage 04、V2.5 Stage 05 和 V2.7 新手框架质量门已完成。Stage 06～08 的既有内容仍保持 prototype 边界，正式规划不在 V2.7 范围内。

## V2.7 Beginner Framework and Content Quality Gate

V2.7 暂缓 OpenMAIC，先完善可独立执行的学习框架和内容：路线 manifest 阶段契约、C Basics Check、NUCLEO-F401RE 主路线、无板学习边界、Mission 新手提示、Lab 首次操作说明、统一记录模板和 Warmup C CI 质量门。

验收结果记录在 [V2.7 Beginner Framework Quality Gate](V2.7-BEGINNER-QUALITY-GATE.md)。

第一原则不是继续制造更多外设故障，而是把 Stage 01～03 已经反复出现的方法提炼成可迁移的系统调试能力：

```text
Symptom
→ System Layer
→ Hypotheses
→ High-value Measurement
→ Evidence
→ Root Cause
→ Minimal Fix
→ Regression
```
