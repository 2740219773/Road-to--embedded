# Stage 05 — RTOS Engineer

## 当前状态与适合谁

正式阶段。适合完成 Stage 04 Exit Check、理解中断/内存基本边界，并准备学习任务调度和并发的学习者。

## 学习环境与阶段产出

- 环境：浏览器、RTOS Concurrency Workbench、确定性 C11 Host Fixture；真实 FreeRTOS 和 MCU 调度不纳入本地质量门。
- 必做产出：四个 Mission Record、四个正式 Debug Case、一份 Mixed Concurrency Record、RTOS Refactor Boss 和 Exit Check。
- 必须阅读：当前 Mission 的 Related Knowledge 和 Workbench 说明。
- 选读内容：FreeRTOS Kernel 和 Kernel Book 作为真实实现的进阶参考。

## 核心问题

当一个 MCU 同时要采样、通信、控制、记录状态时，程序如何组织？

这一阶段从 Super Loop 的局限进入 Task、Scheduler、Queue、Semaphore、Mutex、事件和并发故障。

## Knowledge Route

1. [Task & Scheduler](../../01-Knowledge-Base/RTOS/01-Task-Scheduler.md)
2. [Queue / Semaphore / Mutex](../../01-Knowledge-Base/RTOS/02-Queue-Semaphore-Mutex.md)
3. [ISR → Task](../../01-Knowledge-Base/RTOS/03-ISR-to-Task.md)
4. [Race Condition](../../01-Knowledge-Base/RTOS/04-Race-Condition.md)
5. [Priority Inversion](../../01-Knowledge-Base/RTOS/05-Priority-Inversion.md)
6. [Deadlock](../../01-Knowledge-Base/RTOS/06-Deadlock.md)
7. [Queue Overflow](../../01-Knowledge-Base/RTOS/07-Queue-Overflow.md)
8. [Task Stack & Deadline](../../01-Knowledge-Base/RTOS/08-Task-Stack-and-Deadline.md)

## Mission Map

1. [Race Condition：两个任务都 +1，为什么只加了一次？](../../04-Missions/Stage-05-RTOS/01-Race-Condition/Mission.md)
2. [Priority Inversion：高优先级任务为什么反而等低优先级？](../../04-Missions/Stage-05-RTOS/02-Priority-Inversion/Mission.md)
3. [Deadlock：CPU 很闲，系统为什么完全不动？](../../04-Missions/Stage-05-RTOS/03-Deadlock/Mission.md)
4. [Queue Is Full：消息怎么越积越多？](../../04-Missions/Stage-05-RTOS/04-Queue-Is-Full/Mission.md)

## Interactive Labs

- [RTOS Scheduler Timeline](../../03-Interactive-Labs/RTOS-Scheduler-Timeline/)
- [Race Interleaving Visualizer](../../03-Interactive-Labs/Race-Interleaving-Visualizer/)
- [RTOS Concurrency Workbench](../../03-Interactive-Labs/RTOS-Concurrency-Workbench/)

## Debugging Cases

优先从 [RTOS Debugging Cases](../../06-Debugging-Cases/README.md) 开始；四个正式主题 Case 之后进入 [Mixed Concurrency Challenge](../../06-Debugging-Cases/Stage-05-Mixed-Concurrency/CASE.md)。

## Boss Project

- [RTOS Refactor](../../05-Projects/Intermediate/Stage-05-Boss-RTOS-Refactor/PROJECT.md)

- [V2.5 Quality Gate](../../docs/V2.5-QUALITY-GATE.md)

把 Stage 03 的多外设采集节点从 Super Loop 重构成 RTOS 系统，并通过故障注入验证任务、通信、同步和 Stack 设计。

## 完成标准

不仅会调用 FreeRTOS API，还能看着 Timeline 解释任务为什么处于 Ready / Running / Blocked，并能够定位 Race、Queue Overflow、Deadlock 和 Stack 类问题。

## Exit Check

- [Stage 05 Exit Check](./EXIT-CHECK.md)

通过 Exit Check 后进入 [Stage 06 — Embedded Linux](../Stage-06-Embedded-Linux/README.md)。Stage 05 已完成本地 Quality Gate；真实 FreeRTOS、MCU、Debugger 和仪器验证不纳入本地质量门。

Stage 06 当前仍是 prototype，不属于本阶段的必修内容。
