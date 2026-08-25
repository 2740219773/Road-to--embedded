# Deadlock Evidence Pack

- Symptom：两个业务 Task 都 Blocked，系统 Tick 仍运行；
- Evidence：Task A/B 各自持有一个 Mutex 并等待另一个；
- Minimal Fix：统一 Lock Ordering；Timeout 仅作为保护；
- Regression：固定模型确认 Wait-for Graph 不再成环。
