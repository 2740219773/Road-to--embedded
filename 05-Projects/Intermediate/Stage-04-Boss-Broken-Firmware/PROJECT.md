# Stage 04 Boss Project — Broken Firmware Investigation

## Navigation

- [Stage 04 — Debug Hunter](../../../02-Learning-Path/Stage-04-Debug-Hunter/README.md)
- [Fault Scene Mission](../../../04-Missions/Stage-04-Debug-Hunter/01-Fault-Scene/Mission.md)
- [Who Wrote It Mission](../../../04-Missions/Stage-04-Debug-Hunter/02-Who-Wrote-It/Mission.md)
- [Choose the Instrument Mission](../../../04-Missions/Stage-04-Debug-Hunter/03-Choose-The-Instrument/Mission.md)
- [Debugging Cases](../../../06-Debugging-Cases/README.md)
- [Host Fault Fixture](firmware/README.md)

## 目标

你拿到的不是一个待开发项目，而是一份“别人写好但充满故障”的 Firmware。

要求在尽量少修改代码的前提下，逐个定位并证明根因。

PC 侧可重复样例位于 [firmware/](firmware/)，对应的静态 Evidence Pack 位于 [evidence/](evidence/)。它们是教学模型，不代表 Cortex-M、Debugger 或仪器已经真实运行。

## Fault Set

项目至少包含：

- 一个 UART/Clock 类故障；
- 一个 Interrupt 类故障；
- 一个 Pointer/Memory 类故障；
- 一个 DMA/Buffer 类故障；
- 一个只在特定运行路径出现的 Stack 类故障。

对应 Evidence Pack：

- [UART / Clock](evidence/uart-clock.md)
- [Interrupt Storm](evidence/interrupt-storm.md)
- [Pointer / Memory](evidence/pointer-memory.md)
- [DMA / Buffer](evidence/dma-boundary.md)
- [Stack Overflow](evidence/stack-overflow.md)

## Rules

每发现一个问题，先提交调查记录，再修改：

```text
Symptom
Expected
Hypotheses
Measurement
Evidence
Root Cause
Fix
Regression
```

禁止以“大范围重写后正常”作为通过依据。

## Acceptance

- 每个 fault 有独立证据链；
- 能说明为什么排除其他主要假设；
- 修复后有回归结果；
- 最终形成 System Fault Map，标出每个故障所在层。
- Host Fixture 回归输出 `Stage 04 host fixture regression: PASS`；若没有 C 编译器，则完成静态代码检查并明确标记为未运行。

## 真正考核的能力

不是记住五个案例答案，而是面对第六个陌生故障时仍然知道怎样开始。
