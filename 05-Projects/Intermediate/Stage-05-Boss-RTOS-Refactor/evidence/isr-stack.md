# ISR / Stack Evidence Pack

- Symptom：ISR burst 后 Deadline miss，增加日志后更明显；
- Evidence：ISR 做慢速工作，Stack budget 512 bytes，peak 468 bytes；
- Minimal Fix：ISR 只交接事件，Task 处理慢工作，增加 watermark 和压力回归；
- Regression：固定模型 Deadline miss 为 0，Stack budget 增加到 1024 bytes。
