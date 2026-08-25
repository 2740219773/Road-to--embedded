# Race Evidence Pack

- Symptom：两个 Task 各加 1000 次，结果小于 2000；
- Evidence：固定 `A Read → B Read → A Write → B Write` 后最终值为 1；
- Minimal Fix：Mutex、Atomic 或单一 Owner + Queue，按数据语义选择；
- Regression：修复后固定序列最终值为 2。

这是确定性 Host 模型，不代表真实 RTOS 线程调度。
