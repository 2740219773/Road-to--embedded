# Debugging Case — Queue Full, Data Missing

## Related

- [Stage 05 — RTOS Engineer](../../02-Learning-Path/Stage-05-RTOS-Engineer/README.md)
- [Mission — Queue Is Full](../../04-Missions/Stage-05-RTOS/04-Queue-Is-Full/Mission.md)
- [Knowledge — Queue Overflow](../../01-Knowledge-Base/RTOS/07-Queue-Overflow.md)
- [Knowledge — ISR → Task](../../01-Knowledge-Base/RTOS/03-ISR-to-Task.md)
- [Lab — RTOS Concurrency Workbench](../../03-Interactive-Labs/RTOS-Concurrency-Workbench/)

## Symptom

Sensor 数据开始时正常，运行一段时间后出现丢帧和延迟；Queue send failure count 持续增加。

## Context

Producer 每 10 ms 产生一条消息，Consumer 平均每 30 ms 消费一条，Queue capacity = 8。部分事件来自 ISR，LoggerTask 还会执行慢速格式化。

## Evidence

- Producer rate = 100/s；Consumer throughput ≈ 33/s；
- Queue high-water = 8；
- Send failure / drop count 持续增加；
- 增大 Queue 只能延后首次失败；
- ISR 只记录事件时系统稳定，ISR 直接做日志时 Deadline 变差。

## Hypotheses

- Queue capacity 太小；
- Consumer 长期吞吐不足；
- ISR 执行了不应执行的慢工作；
- Drop policy 没有区分普通数据和报警数据；
- Task Stack 或 Deadline 余量不足。

## Experiments

1. 记录 Producer/Consumer 周期和 Queue depth；
2. 比较增大 Queue、提高 Consumer throughput 和降低 Producer rate；
3. 分离普通数据和报警数据通道；
4. 将 ISR 改为只发送事件，再由 Task 处理；
5. 记录 Stack high-water 和 Consumer deadline；
6. 对修复方案执行长时间压力测试。

## Root Cause

Producer 长期快于 Consumer，Queue 只是有限缓冲，最终必然满；ISR/Logger 的工作边界和消息策略进一步放大了丢失与延迟。

## Fix

根据数据语义选择丢弃、阻塞、覆盖或独立报警通道；提高长期消费吞吐；ISR 只做最小事件交接；为 Consumer 保留 Stack 和 Deadline 余量。

## Verification

在固定速率和突发速率下记录 Queue high-water、drop count、端到端延迟、ISR 执行时间和 Stack margin；确认报警消息不丢失，普通数据按策略处理。

## Prevention

为每条消息定义 Owner、容量、优先级和丢弃策略；监控 Queue high-water 和 send failure；禁止用无限增大 Queue 替代吞吐设计。

## Learning Links

- [Stage 05 Mixed Concurrency Challenge](../Stage-05-Mixed-Concurrency/CASE.md)
- [Stage 05 RTOS Refactor Boss](../../05-Projects/Intermediate/Stage-05-Boss-RTOS-Refactor/PROJECT.md)
