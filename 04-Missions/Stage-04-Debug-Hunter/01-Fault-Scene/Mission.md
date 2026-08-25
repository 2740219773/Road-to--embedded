# Mission 01 — Fault Scene：不要重启，先保护现场

## Beginner Guide

- 适合：完成 Stage 03 Exit Check、希望系统学习故障定位的学习者；
- 前置：能区分现象、预期、证据和根因；
- 预计：60 分钟；
- 本关产出：HardFault 现场 Evidence Record；
- 上一关：Stage 03 Exit Check；当前关：Fault Scene；下一关：Who Wrote It。

## What to Submit

使用 [Learning Record Template](../../../docs/LEARNING-RECORD-TEMPLATE.md)，记录异常类型、Stacked PC/LR、Fault Status、Fault Address 和回归结果。

## If You Are Stuck

先保护现场，不要 Reset；按异常类型 → PC/LR → Fault Status → 地址 → 源码映射顺序调查。

## Ready to Continue

能够用证据解释故障现场，而不是只说“程序崩溃”后，再进入 Who Wrote It。

## Hook

程序突然进入 `HardFault_Handler`。你只有 Debugger，没有日志，也不知道是哪一层出错。重启可以让程序再次运行，却可能把最有价值的现场清掉。

## Mission Goal

在不立即 Reset 的前提下，从异常现场定位到故障指令、访问地址和可验证的根因假设。

## 导航

- Stage：[Stage 04 — Debug Hunter](../../../02-Learning-Path/Stage-04-Debug-Hunter/README.md)
- Knowledge：[Evidence-Driven Debugging](../../../01-Knowledge-Base/Debugging/01-Evidence-Driven-Debugging.md)、[Cortex-M Fault Model](../../../01-Knowledge-Base/Debugging/02-Cortex-M-Fault-Model.md)
- Debug Case：[HardFault Bad Pointer](../../../06-Debugging-Cases/HardFault-Bad-Pointer/CASE.md)
- Boss：[Broken Firmware Investigation](../../../05-Projects/Intermediate/Stage-04-Boss-Broken-Firmware/PROJECT.md)

## Predict

阅读下面的故障片段，先记录你的预测：

```c
uint32_t *config = 0;
*config = 0x12345678;
```

回答：`config` 保存什么？CPU 试图访问什么地址？`HardFault_Handler` 是根因还是异常入口？在看到 Diagnosis 前，列出你要读取的三类现场证据。

## Explore / Observe

使用 [Debug Evidence Workbench](../../../03-Interactive-Labs/Debug-Evidence-Workbench/README.md) 的 Fault Scene 模式，依次查看：异常入口、Stacked PC/LR、Fault Status、Fault Address 和源码映射。每次揭示证据前，先写出成立时的预期结果。

## Action

按照以下调查顺序建立 Evidence Record：

1. 不立即 Reset；
2. 记录当前异常类型和运行上下文；
3. 获取异常入栈现场；
4. 找到 Stacked PC / LR；
5. 读取可用 Fault Status Registers；
6. 若地址有效，记录 Fault Address；
7. 将 PC 映射回指令和源码；
8. 解释这条指令为什么访问了不合法目标。

## Break It

比较三种处理：立即 Reset、只打印 `HardFault`、保存现场后再 Reset。说明前两种方式分别丢失了哪些证据，并指出“增加延时或降低优化”为什么不是根因证明。

## Debug with Evidence

完成一份 [Evidence Record](../../../docs/TEMPLATES.md)：

```text
Symptom → Expected → System Layer → Hypotheses
→ First High-value Measurement → Predicted Evidence
→ Observed Evidence → Root Cause → Minimal Fix → Regression
```

至少保留一个被排除的假设，例如“普通业务逻辑错误”或“Debugger 自己导致崩溃”。

## Transfer / Boss

如果 Stacked PC 不在 `*config = ...` 附近，而是函数返回处，重新判断是否可能存在 Stack Corruption、错误返回地址或更早的越界写。把调查顺序迁移到 [Stage 04 Boss](../../../05-Projects/Intermediate/Stage-04-Boss-Broken-Firmware/PROJECT.md) 的 Pointer/Memory 故障。

## Review / Exit

通过标准：不看 Diagnosis，能够说明 HardFault 只是异常入口；能够指出至少一条高价值证据；能够给出最小修复和回归方法。完成后进入 [Mission 02 — Who Wrote It](../02-Who-Wrote-It/Mission.md)。

## Achievement

遇到 Crash 时，第一反应从“让它重新跑起来”变成“先保存能解释为什么崩溃的证据”。
