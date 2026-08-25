# Mission — Two Locks, No Progress

## Beginner Guide

- 适合：已完成 Priority Inversion 的学习者；
- 前置：Mutex Owner、Blocked Task、Wait-for Graph 和 Timeout；
- 预计：60 分钟；
- 本关产出：Wait-for Graph、Circular Wait 证据和最小修复；
- 上一关：Priority Inversion；当前关：Deadlock；下一关：Queue Is Full。

## What to Submit

使用 [Learning Record Template](../../../docs/LEARNING-RECORD-TEMPLATE.md)，记录两个 Task 的加锁顺序、资源所有权、环路、统一顺序或 Timeout 修复。

## If You Are Stuck

把“谁等待谁”画成图，不要用 CPU Usage 低直接下结论。

## Ready to Continue

能够区分 Timeout 掩盖症状和消除 Circular Wait 后，再进入 Queue Is Full。

## Related

- [Stage 05 — RTOS Engineer](../../../02-Learning-Path/Stage-05-RTOS-Engineer/README.md)
- [Knowledge — Deadlock](../../../01-Knowledge-Base/RTOS/06-Deadlock.md)
- [Lab — RTOS Concurrency Workbench](../../../03-Interactive-Labs/RTOS-Concurrency-Workbench/)
- [Debug Case](../../../06-Debugging-Cases/RTOS-Deadlock/CASE.md)
- [Mixed Challenge](../../../06-Debugging-Cases/Stage-05-Mixed-Concurrency/CASE.md)
- [Boss — RTOS Refactor](../../../05-Projects/Intermediate/Stage-05-Boss-RTOS-Refactor/PROJECT.md)

## Hook

Task A 与 Task B 都还存在，系统 Tick 正常、CPU 也没有满载，但两个关键功能永远不再推进。

```text
Task A: owns Mutex A → waits Mutex B
Task B: owns Mutex B → waits Mutex A
```

## Goal

能够从 Task State、Mutex Owner 和 Wait-for Graph 证明 Circular Wait，并区分统一锁顺序、Timeout 和提高优先级的作用边界。

## Predict

在不运行实验前回答：为什么 CPU usage 低可能是重要证据？哪两个资源依赖形成环？Timeout 能否消除设计中的 Circular Wait？

## Explore / Observe

在 Workbench 中观察 Task A/B State、Mutex A/B Owner、每个 Task 等待的资源和 Wait-for Graph 是否闭环。

## Action

执行两种加锁顺序：`A: A → B / B: B → A` 与 `A: A → B / B: A → B`，记录每个 Tick 的 Owner、Blocked Task 和业务进度。

## Break It

让两个 Task 按相反顺序取锁，随后加入 Timeout。观察 Timeout 是否只是让任务暂时恢复，而不是消除反向获取路径。

## Debug with Evidence

调查顺序：

```text
业务无进展
→ 检查 Task State
→ 检查 Mutex Owner
→ 建立 Wait-for Graph
→ 查找 Circular Wait
→ 搜索所有加锁顺序
→ 用统一顺序回归
```

排除 HardFault、CPU 停机和单个 Task 崩溃等假设。

## Transfer / Boss

迁移到 [RTOS Refactor Boss](../../../05-Projects/Intermediate/Stage-05-Boss-RTOS-Refactor/PROJECT.md)，为 Sensor Service、UART Service 和 Communication Task 规定全局 Lock Ordering，并记录谁拥有共享资源。

## Review / Exit

提交 Wait-for Graph、锁顺序规则、Timeout 边界和压力回归结果，再进入 [RTOS Deadlock Debug Case](../../../06-Debugging-Cases/RTOS-Deadlock/CASE.md)。

## Achievement

看到“系统没死机但业务停了”时，会检查 Blocked Task 和 Resource Ownership，而不是只看 CPU 是否仍在运行。
