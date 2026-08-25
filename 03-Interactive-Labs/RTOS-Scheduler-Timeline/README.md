# RTOS Scheduler Timeline

## Beginner Start

- 第一次操作：保持默认 High task period/execution，点击 Run；
- 预期观察：逐 Tick Timeline 显示 Ready / Running，并给出调度解释；
- 观察不到：先 Reset 参数，再只改变 High task period 或 execution 其中一个；
- Mission Integration：对应 Stage 05 Scheduler / Priority 和 Priority Inversion 的时间线直觉。

## Purpose

用于理解 Scheduler 如何在不同优先级 Task 之间分配 CPU，并识别 High Task 持续 Ready 时对 Low Task 的影响。

## Interaction

调整 High task period 和 execution，点击 Run，观察逐 Tick 的 Ready / Running 结果和解释文本；交互重点是把参数变化与调度证据联系起来。

- 运行：浏览器直接打开 `index.html`。
- Stage：`02-Learning-Path/Stage-05-RTOS-Engineer/`
- Knowledge：`01-Knowledge-Base/RTOS/01-Task-Scheduler.md`
- Mission：`04-Missions/Stage-05-RTOS/02-Priority-Inversion/Mission.md`

学习重点是看懂 Scheduler 为什么在某个时刻选择某个 Task，而不是先背 FreeRTOS API。
