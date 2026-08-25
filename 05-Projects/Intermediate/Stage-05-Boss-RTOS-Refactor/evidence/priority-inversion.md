# Priority Inversion Evidence Pack

- Symptom：High 等待时间 32 ms；
- Evidence：Low 持锁，Medium 持续抢占；
- Minimal Fix：Priority Inheritance、缩短临界区或改为 Owner + Queue；
- Regression：固定模型的 High 等待下降到 6 ms。

这是确定性 Timeline，不代表目标 RTOS 的具体调度实现。
