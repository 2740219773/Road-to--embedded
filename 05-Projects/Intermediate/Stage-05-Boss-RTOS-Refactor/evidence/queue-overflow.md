# Queue Overflow Evidence Pack

- Symptom：Queue 满、Send Failure 增加、消息丢失；
- Evidence：Producer 100/s，Consumer 33/s，capacity 8，另有 ISR burst 12；
- Minimal Fix：改变长期吞吐、区分消息策略，并将慢工作移出 ISR；
- Regression：固定模型 Send Failure 为 0。
