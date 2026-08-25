# Stage 04 — Debug Hunter / 故障猎人

这一阶段不以新增外设为主，而是系统训练定位能力。

## 当前状态与适合谁

正式阶段。适合完成 Stage 03 Exit Check、但希望把“会操作”提升为“会定位根因”的学习者。

## 学习环境与阶段产出

- 环境：浏览器、Debug Evidence Workbench、Host Fixture；真实 Cortex-M 和仪器验证属于后续扩展。
- 必做产出：三份 Mission Record、三个 Debug Case、一份 Mixed Evidence Record、Broken Firmware Boss 和 Exit Check。
- 必须阅读：Evidence-Driven Debugging 和当前 Mission 的 Before You Start。
- 选读内容：Fault Model、Watchpoint、示波器和逻辑分析仪知识按故障需要查询。

## 核心方法

先建立 [Evidence-Driven Debugging](../../01-Knowledge-Base/Debugging/01-Evidence-Driven-Debugging.md)：

```text
Symptom
→ Expected
→ Hypotheses
→ Measurement
→ Evidence
→ Root Cause
→ Fix
→ Regression
```

## Mission Map

1. [Fault Scene：不要重启，先保护现场](../../04-Missions/Stage-04-Debug-Hunter/01-Fault-Scene/Mission.md)
2. [Who Wrote It：是谁改坏了状态？](../../04-Missions/Stage-04-Debug-Hunter/02-Who-Wrote-It/Mission.md)
3. [Choose the Instrument：这次该拿什么工具？](../../04-Missions/Stage-04-Debug-Hunter/03-Choose-The-Instrument/Mission.md)

## 工具与知识入口

- [Cortex-M Fault Model](../../01-Knowledge-Base/Debugging/02-Cortex-M-Fault-Model.md)
- [Stack & Memory Corruption](../../01-Knowledge-Base/Debugging/03-Stack-and-Memory-Corruption.md)
- [Debugger Watchpoint](../../01-Knowledge-Base/Debugging/04-Debugger-Watchpoint.md)
- [Oscilloscope & Logic Analyzer](../../01-Knowledge-Base/Debugging/05-Oscilloscope-Logic-Analyzer.md)
- [Debugging Cases](../../06-Debugging-Cases/README.md)

## Boss Project

- [Broken Firmware Investigation](../../05-Projects/Intermediate/Stage-04-Boss-Broken-Firmware/PROJECT.md)
- [Stage 04 Mixed Debug Challenge](../../06-Debugging-Cases/Stage-04-Mixed-Failures/CASE.md)

## Exit Check

- [Stage 04 Exit Check](./EXIT-CHECK.md)
- [V2.4 Quality Gate](../../docs/V2.4-QUALITY-GATE.md)

## 完成标准

面对陌生故障时，能够先描述现象、选择高信息量测量、保护现场、建立证据链，而不是反复随机改代码。

通过 Exit Check 后进入 [Stage 05 — RTOS Engineer](../Stage-05-RTOS-Engineer/README.md)。Stage 04 已完成本地 Quality Gate；真实 MCU、Debugger、示波器和逻辑分析仪验证保留为后续人工路径。
