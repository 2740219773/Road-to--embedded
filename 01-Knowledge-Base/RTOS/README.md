# RTOS Knowledge Base

这里保存 RTOS / FreeRTOS 的技术知识真相源。学习主入口：`02-Learning-Path/Stage-05-RTOS-Engineer/`。

## 知识范围

- Task / Scheduler / Priority；
- Queue；
- Semaphore；
- Mutex；
- Event；
- Software Timer；
- ISR 与 Task 协作；
- Race / Deadlock；
- Stack；
- Real-time fundamentals。

## 统一理解模型

RTOS 不是“让程序并行跑起来”的魔法，而是帮助多个任务共享 CPU 和资源。

```text
Task State
Ready / Running / Blocked
        ↓
Scheduler
        ↓
Priority / Event / Time
        ↓
CPU 在任务之间切换
```

## 最适合的表现形式

RTOS 调度、优先级、阻塞、互斥和死锁优先使用 Timeline / 状态动画 / 资源竞争模拟器，而不是只用文字解释。

## 调试重点

- 哪个任务正在运行？
- 哪个任务为什么阻塞？
- 是否存在优先级问题？
- Queue/Semaphore 是否真的发生了事件？
- Stack 是否足够？
- 是否存在共享资源竞争或死锁？

Knowledge Base 解释机制，Mission 负责通过故障让学习者真正理解机制。
