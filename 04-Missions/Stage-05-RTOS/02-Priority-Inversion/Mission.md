# Mission — High Priority Why Waiting?

## Beginner Guide

- 适合：已完成 Race Condition 的学习者；
- 前置：Task State、Priority、Mutex、Critical Section 和 Timeline；
- 预计：60 分钟；
- 本关产出：Priority Inversion Timeline 和等待时间对照；
- 上一关：Race Condition；当前关：Priority Inversion；下一关：Deadlock。

## What to Submit

使用 [Learning Record Template](../../../docs/LEARNING-RECORD-TEMPLATE.md)，记录 Low/Medium/High Task、Mutex Owner、阻塞时间和 Priority Inheritance 对照。

## If You Are Stuck

先画 Task Timeline，再标记 Mutex Owner 和 High Task 的 Blocked 区间，不要只看数值 Priority。

## Ready to Continue

能够解释 Priority Inheritance 改变了什么、没有改变什么后，再进入 Deadlock。

## Related

- [Stage 05 — RTOS Engineer](../../../02-Learning-Path/Stage-05-RTOS-Engineer/README.md)
- [Knowledge — Priority Inversion](../../../01-Knowledge-Base/RTOS/05-Priority-Inversion.md)
- [Lab — RTOS Scheduler Timeline](../../../03-Interactive-Labs/RTOS-Scheduler-Timeline/)
- [Lab — RTOS Concurrency Workbench](../../../03-Interactive-Labs/RTOS-Concurrency-Workbench/)
- [Debug Case](../../../06-Debugging-Cases/RTOS-Priority-Inversion/CASE.md)
- [Boss — RTOS Refactor](../../../05-Projects/Intermediate/Stage-05-Boss-RTOS-Refactor/PROJECT.md)

## Hook

High-priority Task 必须在 5 ms 内响应，但它偶尔等待几十毫秒。Low-priority Task 持有 Mutex，Medium-priority Task 持续运行，High-priority Task 被 Blocked。

## Goal

能够从 Timeline 和 Mutex Owner 解释 Priority Inversion，区分提升 Task Priority、Priority Inheritance、缩短临界区和改变资源所有权的作用。

## Predict

在不运行实验前回答：谁真正持有 High 所需的资源？为什么 Medium 会延长 High 的等待？启用 Priority Inheritance 后哪个 Task 的有效优先级会变化？

## Explore / Observe

使用 RTOS Scheduler Timeline 或 Concurrency Workbench，记录 Low 持锁、High 等锁、Medium 抢占时的 Running、Ready、Blocked 状态。

## Action

分别运行无 Priority Inheritance、启用继承、缩短持锁区和移出慢 I/O 四种方案，记录 High 最大等待时间、Low 有效优先级和 Mutex 持有时长。

## Break It

让 Low 在持锁期间执行不可预测的慢操作，再让 Medium 长时间 Ready。观察“High 优先级最高”仍不能保证响应时间。

## Debug with Evidence

调查顺序：

```text
High 超时
→ 记录 High 的 Task State
→ 找到等待的 Mutex
→ 找 Mutex Owner
→ 展开 Low 的临界区时长
→ 检查 Medium 是否持续抢占
→ 比较 Priority Inheritance 前后 Timeline
```

排除“High 的优先级配置错”和“CPU 完全没有运行”的假设。

## Transfer / Boss

迁移到 [RTOS Refactor Boss](../../../05-Projects/Intermediate/Stage-05-Boss-RTOS-Refactor/PROJECT.md)，为 UART Service 选择共享 Mutex 或单一 Owner + Queue，并说明为什么不能在持锁时等待慢速外设。

## Review / Exit

提交两条 Timeline、一份 Mutex Ownership Record 和最小修复回归结果，再进入 [Priority Inversion Debug Case](../../../06-Debugging-Cases/RTOS-Priority-Inversion/CASE.md)。

## Achievement

不再认为“把关键 Task 优先级调最高”就等于实时性有保证。
