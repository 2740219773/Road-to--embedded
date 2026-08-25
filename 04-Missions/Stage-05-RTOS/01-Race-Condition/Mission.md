# Mission — Lost Update：计数器为什么少了？

## Beginner Guide

- 适合：完成 Stage 04 Exit Check、第一次学习并发故障的学习者；
- 前置：ISR/Task 异步变化、共享状态和 Read → Modify → Write；
- 预计：60 分钟；
- 本关产出：Race 交错顺序和修复对照记录；
- 上一关：Stage 04 Exit Check；当前关：Race Condition；下一关：Priority Inversion。

## What to Submit

使用 [Learning Record Template](../../../docs/LEARNING-RECORD-TEMPLATE.md)，记录交错步骤、Lost Update 证据、Mutex/Atomic/Owner 修复和回归。

## If You Are Stuck

先把每个 Task 的 Read、Modify、Write 拆成独立步骤，再判断哪一步发生交错。

## Ready to Continue

能够解释 `volatile` 为什么不能自动解决 Race 后，再进入 Priority Inversion。

## Related

- [Stage 05 — RTOS Engineer](../../../02-Learning-Path/Stage-05-RTOS-Engineer/README.md)
- [Knowledge — Race Condition](../../../01-Knowledge-Base/RTOS/04-Race-Condition.md)
- [Lab — Race Interleaving Visualizer](../../../03-Interactive-Labs/Race-Interleaving-Visualizer/)
- [Lab — RTOS Concurrency Workbench](../../../03-Interactive-Labs/RTOS-Concurrency-Workbench/)
- [Debug Case](../../../06-Debugging-Cases/RTOS-Race-Lost-Update/CASE.md)
- [Boss — RTOS Refactor](../../../05-Projects/Intermediate/Stage-05-Boss-RTOS-Refactor/PROJECT.md)

## Hook

两个 Task 都运行完成，系统没有 Crash，但共享计数器的结果偶尔只有 1937、1984 或其他小于 2000 的值。

## Goal

能够用执行交错解释 Lost Update，并根据数据所有权、实时性和共享资源性质选择 Mutex、Atomic、Critical Section 或单一 Owner + Queue。

## Predict

在不运行实验前回答：

1. `counter++` 包含哪几个步骤？
2. 哪一种交错会让两个 `+1` 最终只保留一次？
3. `volatile` 是否能让复合操作变成原子操作？

## Explore / Observe

使用 Race Interleaving Visualizer 或 RTOS Concurrency Workbench，逐步记录：

```text
A Read → B Read → A Write → B Write
```

观察共享值、A/B 的局部值和每一步之后的状态。

## Action

分别执行 A 先完成 Read/Write、交错执行和三种修复方案的对照实验，把每次结果写入 Evidence Record。

## Break It

故意让两个 Task 在 Read / Modify / Write 之间切换。再把共享对象替换为 UART Driver 状态，预测“加一个 Mutex”可能带来的阻塞和所有权问题。

## Debug with Evidence

调查顺序：

```text
最终值小于预期
→ 检查 Task 是否都完成
→ 展开 Read / Modify / Write
→ 对齐切换点
→ 排除单 Task、初始化和整数溢出
→ 判断是否为非原子共享更新
```

记录至少一个被排除的假设，并比较 `volatile`、Mutex、Atomic 和 Owner + Queue 的证据差异。

## Transfer / Boss

迁移到 [RTOS Refactor Boss](../../../05-Projects/Intermediate/Stage-05-Boss-RTOS-Refactor/PROJECT.md)，为 Sensor、ADC 和 Communication Task 画数据所有权图，说明哪些数据可以复制进 Queue，哪些资源必须由单一 Service 管理。

## Review / Exit

完成一份包含现象、交错顺序、根因、最小修复和回归结果的 Evidence Record，然后进入 [RTOS Race Debug Case](../../../06-Debugging-Cases/RTOS-Race-Lost-Update/CASE.md)。

## Achievement

看到“两个 Task 都执行了但结果偶尔不对”时，能够先还原交错和所有权，而不是把问题归结为“RTOS 不稳定”。
