# Debugging Case — High Priority Task Still Waits

## Related

- [Stage 05 — RTOS Engineer](../../02-Learning-Path/Stage-05-RTOS-Engineer/README.md)
- [Mission — Priority Inversion](../../04-Missions/Stage-05-RTOS/02-Priority-Inversion/Mission.md)
- [Knowledge — Priority Inversion](../../01-Knowledge-Base/RTOS/05-Priority-Inversion.md)
- [Lab — RTOS Concurrency Workbench](../../03-Interactive-Labs/RTOS-Concurrency-Workbench/)

## Symptom

High-priority ControlTask 的响应偶尔超过 5 ms，Low-priority LogTask 持有共享 Mutex 时问题更明显。

## Context

Low 持有 Mutex，High 请求后进入 Blocked；Medium 没有使用该 Mutex，却持续 Ready 并抢占 Low。系统没有 Crash，只有 Deadline 超时。

## Evidence

- High：Blocked on `io_mutex`；
- Low：Owns `io_mutex`，临界区包含慢速日志操作；
- Medium：Ready/Running，周期性占用 CPU；
- 无 Priority Inheritance 时 High wait = 32 ms；
- 启用继承后 Low 的有效优先级暂时提升，High wait = 6 ms。

## Hypotheses

- High 的优先级配置错误；
- CPU 总体负载过高；
- Low 的持锁区过长；
- Medium 间接延长了 Low 的完成时间，形成 Priority Inversion。

## Experiments

1. 记录 High、Medium、Low 的 Timeline；
2. 记录 Mutex Owner 和持锁时长；
3. 比较 Priority Inheritance 开关；
4. 移除持锁期间的慢速 I/O；
5. 比较共享 Mutex 与单一 Owner + Queue 的响应时间。

## Root Cause

High 等待 Low 释放资源，而 Medium 持续抢占 Low，导致 High 间接被 Medium 拖延，形成 Priority Inversion。

## Fix

启用符合目标 RTOS 语义的 Priority Inheritance，并缩短临界区；慢速 I/O 移出持锁区。对长期共享服务优先评估单一 Owner + Queue。

## Verification

重复高负载 Timeline 和 Deadline 压力测试，记录 High 最大等待时间、Low 持锁时长、Medium 抢占次数和修复后的超时次数。

## Prevention

为每个 Mutex 记录最长持有时间；禁止在锁内执行不可预测 I/O；为关键 Task 设置可观测 Deadline 和阻塞预算。

## Learning Links

- [Stage 05 Mixed Concurrency Challenge](../Stage-05-Mixed-Concurrency/CASE.md)
- [Stage 05 RTOS Refactor Boss](../../05-Projects/Intermediate/Stage-05-Boss-RTOS-Refactor/PROJECT.md)
