# Development Plan — Living Plan

## Purpose

这个文件描述当前项目如何继续建设，不再作为 V2.1 迁移清单。

V2.1 已完成架构重构，V2.2 已完成 Stage 01 互动闭环。当前开发版本为 V2.3。

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
- Beginner Concept；
- Mission Chain；
- Interactive / Instrument Evidence；
- Failure Injection；
- Debug Challenge；
- Boss Project；
- Exit Check。

## Current Work — V2.3

V2.3 分两个 Phase。

### Phase A — Stage 02 MCU Foundation

当前优先完成和验证：

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

核心能力：Build / Flash / Debugger、GPIO、Clock、Interrupt、Timer/PWM、Schematic、万用表/示波器、软件证据与物理证据联合定位。

### Phase B — Stage 03 Peripheral Engineer

Phase A 通过质量门后，再正式整理已有纵向样板：UART、I²C、SPI、ADC、DMA、CAN、RS-485 / Modbus，以及 Multi-Peripheral Sensor Node。

当前不提前继续扩 Stage 03 新主题。

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

不要因为目标是“工程化”就默认读者已经知道 IDE、ISR、DMA、ABI、Pin Mux、Clock Tree 等术语。

## Scope Guardrails

1. Stage 02 不扩张成外设百科；
2. Stage 03 不重复教授 Stage 02 已完成的 GPIO/Timer/PWM 基础；
3. Stage 04 专注系统性 Debug 方法，不靠继续增加外设制造内容量；
4. Stage 05 必须建立在裸机多外设系统经验之上；
5. Linux 和 FPGA 的纵向样板在对应版本到来前只维护明显错误，不继续横向扩张；
6. V3.0 Web/平台化在真实学习路径成熟前不抢占主线。

## Quality Gate for Each Version

合并正式版本前至少检查：

- Roadmap 与真实 Stage 职责一致；
- README / PROJECT / Current Progress 不使用过期版本状态；
- Mission 链能够从 Stage Entry 连续走到 Boss / Exit；
- Knowledge 没有被多个 Mission 大段复制；
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