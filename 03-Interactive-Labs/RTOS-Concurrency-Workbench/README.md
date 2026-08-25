# RTOS Concurrency Workbench

## Beginner Start

- 第一次操作：先运行 Scheduler / Priority 默认 Timeline，再进入 Race 模式；
- 预期观察：Task State、Priority、交错顺序和等待时间随操作变化；
- 观察不到：先 Reset 当前模式，再确认所有必填参数已经设置；
- Mission Integration：对应 Stage 05 四个 Mission、Mixed Challenge 和 Exit Check。

## Purpose

这是一个虚拟 RTOS 并发证据实验，服务 Stage 05 的 Scheduler、Race、Priority Inversion、Deadlock、Queue、ISR 和 Stack 任务。

## Interaction

通过顶部模式按钮切换实验；在各模式中修改参数、点击分析或逐步执行按钮，观察 Timeline、Task State、Wait-for Graph、Queue 指标和状态反馈。这些交互用于把假设转换成 Evidence Record。

## 模式

- Scheduler / Priority：观察 Task State、优先级、Mutex Owner 和 Priority Inheritance 对 Timeline 的影响；
- Race：逐步执行两个 Task 的 Read / Write，确认 Lost Update；
- Deadlock：建立 Mutex Owner 和 Wait-for Graph，比较相反锁顺序与统一锁顺序；
- Queue / ISR / Stack：调整生产/消费速率、Queue capacity、ISR burst 和 Stack budget，观察背压与 Deadline 风险。

## 边界

页面只使用确定性教学模型，不调用 FreeRTOS，不连接 MCU，不代表真实 Scheduler、ISR、Stack Watermark 或仪器测量结果。Evidence Record 只保存到当前浏览器。

入口：

- [Stage 05 — RTOS Engineer](../../02-Learning-Path/Stage-05-RTOS-Engineer/README.md)
- [Stage 05 Mixed Concurrency Challenge](../../06-Debugging-Cases/Stage-05-Mixed-Concurrency/CASE.md)
- [RTOS Refactor Boss](../../05-Projects/Intermediate/Stage-05-Boss-RTOS-Refactor/PROJECT.md)
