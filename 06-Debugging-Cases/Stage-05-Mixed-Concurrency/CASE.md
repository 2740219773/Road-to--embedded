# Stage 05 Mixed Concurrency Challenge

## Navigation

- [Stage 05 — RTOS Engineer](../../02-Learning-Path/Stage-05-RTOS-Engineer/README.md)
- [Stage 05 Exit Check](../../02-Learning-Path/Stage-05-RTOS-Engineer/EXIT-CHECK.md)
- [RTOS Refactor Boss](../../05-Projects/Intermediate/Stage-05-Boss-RTOS-Refactor/PROJECT.md)
- [Evidence Record Template](../../docs/TEMPLATES.md)

## Challenge Rule

本 Challenge 只提供现象和 Evidence Pack，不直接给出 Diagnosis。学习者必须先写假设、第一条高价值测量和可能证据，再决定是否改变系统设计。

所有数字都是确定性教学样例，不代表真实 FreeRTOS、MCU 或仪器结果。

## Fault A — Lost Update

### Symptom

两个 Task 各自执行 1000 次 `counter++`，最终值为 1874；两个 Task 都报告完成。

### Evidence Pack

- `counter` 是 `volatile uint32_t`；
- 单 Task 基线为 1000；
- 固定记录出现 `A Read → B Read → A Write → B Write`；
- 没有 Mutex、Atomic 或 Owner 记录。

### Task

按 `Task State / Synchronization` 分类，写出一个被排除的初始化假设和一个最小修复。

## Fault B — High Task Late

### Symptom

ControlTask 需要在 5 ms 内响应，但最大等待为 32 ms。

### Evidence Pack

- High Blocked on `io_mutex`；
- Low owns `io_mutex`，临界区包含日志格式化；
- Medium 没有使用 Mutex，但持续 Ready；
- 开启 Priority Inheritance 后最大等待降为 6 ms。

### Task

按 `Scheduling / Priority` 分类，比较 Priority Inheritance、缩短临界区和 Owner + Queue。

## Fault C — System Alive, Functions Frozen

### Symptom

Tick 和 Idle Task 正常，SensorTask 与 CommunicationTask 都不再推进。

### Evidence Pack

- SensorTask：Blocked on `uart_mutex`，owns `sensor_mutex`；
- CommunicationTask：Blocked on `sensor_mutex`，owns `uart_mutex`；
- CPU usage 低；
- Wait-for Graph 形成环。

### Task

按 `Synchronization` 分类，写出统一 Lock Ordering，并说明 Timeout 为什么不是根因修复。

## Fault D — Queue Backpressure

### Symptom

系统运行 20 秒后出现丢帧；Queue send failure count 上升。

### Evidence Pack

- Producer = 100 messages/s；
- Consumer = 33 messages/s；
- Queue capacity = 8，High-water = 8；
- 普通数据和报警数据共用一个 Queue；
- ISR burst 时 Consumer Deadline 进一步超时。

### Task

按 `Queue / Backpressure` 分类，分别为普通数据和报警数据设计策略。

## Fault E — ISR / Stack Boundary

### Symptom

偶发 Task Deadline miss；增加日志后故障概率上升，系统没有稳定 Crash。

### Evidence Pack

- ISR 直接执行格式化和 Queue 发送；
- Task stack budget = 512 bytes；
- 观察到的峰值使用量 = 468 bytes；
- ISR burst 时 Task wake-up 延迟增加；
- 改为 ISR 只发送事件后，延迟下降但仍需压力验证。

### Task

按 `ISR Boundary / Timing / Deadline / Stack / Memory` 分类，给出 ISR→Task 交接、Stack watermark 和回归压力测试方案。

## Submission

每个 Fault 都必须提交：

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

不得只填写“加 Mutex”“加大 Queue”或“提高优先级”。

## Acceptance

- 五个 Fault 都有独立 Evidence Record；
- 每个 Fault 至少排除一个错误假设；
- 修复前后有可观察差异；
- 能把一个新出现的并发故障映射到 Task State、Scheduling、Synchronization、Queue、ISR、Timing 或 Stack 层。
