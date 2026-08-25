# Debugging Case — System Alive, Functions Frozen

## Related

- [Stage 05 — RTOS Engineer](../../02-Learning-Path/Stage-05-RTOS-Engineer/README.md)
- [Mission — Deadlock](../../04-Missions/Stage-05-RTOS/03-Deadlock/Mission.md)
- [Knowledge — Deadlock](../../01-Knowledge-Base/RTOS/06-Deadlock.md)
- [Lab — RTOS Concurrency Workbench](../../03-Interactive-Labs/RTOS-Concurrency-Workbench/)

## Symptom

系统 Tick 正常、Idle Task 仍运行、看门狗也没有复位，但采集和通信两个功能都停止推进。

## Context

TaskSensor 和 TaskComms 共享 `sensor_mutex` 与 `uart_mutex`，两个路径的加锁顺序没有统一约定。

## Evidence

- TaskSensor：Blocked on `uart_mutex`，owns `sensor_mutex`；
- TaskComms：Blocked on `sensor_mutex`，owns `uart_mutex`；
- CPU usage 低；
- 没有 HardFault；
- Wait-for Graph 形成闭环。

## Hypotheses

- 两个 Task 构成 Circular Wait；
- CPU 或 Scheduler 停止；
- 某个 Task 已经崩溃；
- 提高两个 Task 的优先级可以恢复业务。

## Experiments

1. 记录两个 Task 的 State；
2. 记录每个 Mutex 的 Owner；
3. 绘制 Wait-for Graph；
4. 搜索所有加锁顺序；
5. 统一为 `sensor_mutex → uart_mutex` 后执行压力回归；
6. 加入 Timeout 观察恢复行为，但不把 Timeout 当作根因修复。

## Root Cause

两个 Task 各自持有对方需要的 Mutex，同时等待对方释放，形成 Circular Wait。CPU 仍在运行，但业务任务全部 Blocked。

## Fix

建立全局 Lock Ordering，所有路径按同一顺序获取资源；缩短持锁区并把慢速 I/O 移出锁内。必要时改为单一资源 Owner + Queue。Timeout 只作为防止永久等待的保护。

## Verification

执行包含相反调用路径的压力测试，确认所有路径遵守锁顺序；记录 Task State、Mutex Owner、业务进度和 Timeout 次数。

## Prevention

维护资源依赖图；代码评审禁止反向获取；对共享服务记录 Owner 和 Lock Ordering；把低 CPU 高 Blocked 作为监控告警条件。

## Learning Links

- [Stage 05 Mixed Concurrency Challenge](../Stage-05-Mixed-Concurrency/CASE.md)
- [Stage 05 RTOS Refactor Boss](../../05-Projects/Intermediate/Stage-05-Boss-RTOS-Refactor/PROJECT.md)
