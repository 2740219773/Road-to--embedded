# Task & Scheduler — 为什么程序不再只有一个 main loop

## 第一次看到 RTOS，先知道它解决什么问题

RTOS 是 **Real-Time Operating System，实时操作系统**。

对于初学者，可以先把它理解成：**当一个 MCU 同时要做很多事情时，RTOS 帮你把这些工作拆成多个任务，并决定什么时候让谁运行。**

例如一个设备同时要：

- 每 1 ms 采样一次传感器；
- 接收串口命令；
- 刷新显示；
- 处理报警；
- 定期保存数据。

如果全部写在一个越来越长的 `while(1)` 里，程序会越来越难组织、难保证时序，也难调试。

## Task 是什么？

`Task` 可以先理解成“一个长期存在的工作线程”。例如：

```text
SensorTask   → 负责采样
CommTask     → 负责通信
DisplayTask  → 负责界面/显示
```

它不是普通函数执行完就结束的简单概念，而是由 RTOS 管理其运行状态和栈空间。

## Scheduler 是什么？

`Scheduler` 就像一个调度员。CPU 同一时刻通常只能执行一个任务，Scheduler 根据优先级、任务状态和 RTOS 规则决定当前运行谁。

典型状态可以先抽象成：

```text
Ready ↔ Running → Blocked/Waiting
  ↑                  ↓
  └──── event/time ──┘
```

- `Ready`：已经准备好，等 CPU；
- `Running`：现在正在 CPU 上执行；
- `Blocked/Waiting`：主动等待时间、数据或事件，暂时不抢 CPU。

## 为什么“高优先级”不等于“一直运行”？

如果一个最高优先级 Task 永远不进入等待状态，它可能一直占据 CPU，使其他 Task 几乎得不到执行机会。

所以一个健康的实时系统通常要求任务在没有事情做时主动 Block，而不是无限空转。

## Context Switch 是什么？

当 CPU 从 Task A 切换去执行 Task B 时，需要保存 A 的运行现场，再恢复 B 的现场。这个切换称为 Context Switch。

可以先类比：你正在写一份报告，中途被叫去处理另一件事。为了回来继续，你需要记住刚才写到哪、手里有哪些临时信息。

## 核心问题

- Task 与普通函数有什么不同？
- Ready、Running、Blocked 分别意味着什么？
- 高优先级任务为什么不应该一直占着 CPU？
- 普通阻塞式 `delay` 与 RTOS 的 Block/Delay 为什么系统效果不同？
- Context Switch 为什么存在？

## 推荐互动

Scheduler Timeline：多个任务拥有不同周期、执行时间和优先级，拖动参数后实时观察谁运行、谁等待、谁可能被饿死。

Stage 05 的目标不是先记 FreeRTOS API，而是能够看着 Timeline 解释：**为什么 CPU 此刻执行的是这个 Task，而不是另一个。**
