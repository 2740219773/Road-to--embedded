# Task & Scheduler — 为什么程序不再只有一个 main loop

RTOS 把系统工作拆成多个 Task，并由 Scheduler 根据状态和优先级决定当前运行谁。

典型 Task 状态可以抽象为：

```text
Ready ↔ Running → Blocked/Waiting
  ↑                  ↓
  └──── event/time ──┘
```

## 核心问题

- Task 与普通函数有什么不同？
- Ready、Running、Blocked 分别意味着什么？
- 高优先级任务为什么不应该一直占着 CPU？
- `delay` 与 RTOS 的 block/delay 为什么系统效果不同？
- Context Switch 保存了什么思想上的“现场”？

## 推荐互动

Scheduler Timeline：三个任务拥有不同周期、执行时间和优先级，拖动参数后实时观察谁运行、谁等待、谁错过 deadline。

Stage 05 的目标不是记住 FreeRTOS API，而是能够看着 Timeline 解释系统为什么在某个时刻运行某个 Task。