# Stage 05 Exit Check — Unknown Concurrent Sensor Node

## Situation

一个采集节点包含 SensorTask、ControlTask、LoggerTask、CommunicationTask 和一个外部中断。系统启动后前几秒正常，随后出现以下混合现象：

- ControlTask 偶发超过 5 ms Deadline；
- 日志数据偶尔缺失；
- 通信功能在一次压力测试后停止推进；
- CPU usage 不高，系统没有 HardFault。

你没有看到源码 Diagnosis，只能使用下面的 Evidence Pack。

## Evidence Pack

- SensorTask 每 10 ms 发送一条数据，LoggerTask 平均每 30 ms 消费一条；
- LoggerQueue capacity = 8，High-water = 8，send failure count 持续上升；
- ControlTask Blocked on `io_mutex`；
- LoggerTask owns `io_mutex`，持锁区包含格式化；
- CommunicationTask 与 SensorTask 分别持有 `sensor_mutex` 和 `uart_mutex`，并等待对方；
- ISR burst 时直接执行了部分数据整理；
- ControlTask stack budget = 512 bytes，watermark 只剩 44 bytes；
- 单 Task 基线没有丢失更新，双 Task 压测后计数器少于预期。

所有数据都是确定性教学证据，不代表真实 RTOS 或硬件测量。

## Required Evidence Record

不得先看现成 Case 的结论。提交一份完整记录：

```text
Symptom
Expected
System Layer
Hypotheses
First High-value Measurement
Predicted Evidence
Observed Evidence
Root Cause
Minimal Fix
Regression
Transfer
```

## Acceptance

- 至少区分 Queue、Priority Inversion、Deadlock、ISR Boundary、Race 和 Stack 六类线索；
- 为每类线索给出一条支持或排除证据；
- 选择第一条高价值测量，而不是同时修改所有 Task；
- 给出最小修复和至少一轮回归压力测试；
- 能把方案迁移到 [RTOS Refactor Boss](../../05-Projects/Intermediate/Stage-05-Boss-RTOS-Refactor/PROJECT.md)。

## Next Stage

通过后进入 [Stage 06 — Embedded Linux](../Stage-06-Embedded-Linux/README.md)。真实 FreeRTOS、MCU、Debugger 和仪器验证仍需后续人工执行。
