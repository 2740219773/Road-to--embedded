# Mission — Queue Is Full：消息怎么越积越多？

## Beginner Guide

- 适合：已完成 Deadlock 的学习者；
- 前置：Producer/Consumer、Queue Capacity、ISR → Task、High-water 和 Stack；
- 预计：60 分钟；
- 本关产出：速率、容量、High-water、丢弃策略和压力回归记录；
- 上一关：Deadlock；当前关：Queue Is Full；下一关：Stage 05 Mixed Challenge。

## What to Submit

使用 [Learning Record Template](../../../docs/LEARNING-RECORD-TEMPLATE.md)，记录生产/消费速率、Queue 容量、Send Failure、Drop Count 和回归压力。

## If You Are Stuck

先计算生产速率和消费速率，再观察 Queue 统计；不要把“增大 Queue”直接当成永久修复。

## Ready to Continue

能够把 Queue、ISR、Task、Backpressure 和 Stack 放到同一条证据链后，再进入 Stage 05 Mixed Challenge。

## Related

- [Stage 05 — RTOS Engineer](../../../02-Learning-Path/Stage-05-RTOS-Engineer/README.md)
- [Knowledge — Queue Overflow](../../../01-Knowledge-Base/RTOS/07-Queue-Overflow.md)
- [Knowledge — ISR → Task](../../../01-Knowledge-Base/RTOS/03-ISR-to-Task.md)
- [Knowledge — Task Stack & Deadline](../../../01-Knowledge-Base/RTOS/08-Task-Stack-and-Deadline.md)
- [Lab — RTOS Concurrency Workbench](../../../03-Interactive-Labs/RTOS-Concurrency-Workbench/)
- [Debug Case](../../../06-Debugging-Cases/RTOS-Queue-Overflow/CASE.md)
- [Boss — RTOS Refactor](../../../05-Projects/Intermediate/Stage-05-Boss-RTOS-Refactor/PROJECT.md)

## Hook

SensorTask 每 10 ms 产生一条数据，LoggerTask 平均每 30 ms 才处理一条。系统开始运行时一切正常，过一会儿 Queue 满了。

## Goal

能够用生产速率、消费速率、Queue capacity、High-water 和 Send Failure 解释背压，并为可丢弃数据、报警数据和 ISR 事件选择不同策略。

## Predict

在不运行实验前回答：Producer 每秒 100 条、Consumer 每秒 33 条时 Queue 能否永久解决问题？Queue 变大后首先变化的是吞吐、延迟还是故障出现时间？ISR 是否应该直接执行慢速日志处理？

## Explore / Observe

在 Workbench 中设置 Producer period、Consumer processing time 和 Queue capacity，记录 Queue depth、High-water、Send Failure、ISR event 到 Task wake-up 的路径，以及 Task stack budget。

## Action

分别尝试增大 Queue、降低 Producer rate、提高 Consumer throughput、批量处理，以及为普通数据丢弃、报警数据阻塞或独立通道。比较哪些方案只是延迟问题出现，哪些真正改变长期吞吐关系。

## Break It

让 Producer 长期快于 Consumer，再增加一段 ISR burst。观察 Queue overflow、Task wake-up 和 Stack/Deadline 风险是否同时出现。

## Debug with Evidence

调查顺序：

```text
消息丢失或延迟
→ 记录 Producer / Consumer 速率
→ 记录 Queue depth / High-water
→ 检查 Send Failure / Drop policy
→ 查 ISR 是否越界执行慢工作
→ 查 Consumer deadline 和 Stack margin
→ 重新验证吞吐、数据语义和恢复策略
```

排除“只要把 Queue 加大”和“ISR Complete 就代表消息已安全处理”的假设。

## Transfer / Boss

迁移到 [RTOS Refactor Boss](../../../05-Projects/Intermediate/Stage-05-Boss-RTOS-Refactor/PROJECT.md)，设计 Sensor、Alarm、Logger 三类消息的所有权、容量、丢弃策略和回归指标。

## Review / Exit

完成 Queue Evidence Record，包含长期吞吐计算、High-water、策略选择和回归结果，再进入 [RTOS Queue Overflow Debug Case](../../../06-Debugging-Cases/RTOS-Queue-Overflow/CASE.md)。

## Achievement

理解 Queue 是缓冲和解耦工具，不是吞吐不足的永久解决方案；能够把 ISR、Task、Queue 和 Stack 放进同一条证据链。
