# Stage 05 System Fault Map

| 现象 | 证据层 | 最小调查入口 |
|---|---|---|
| 共享值偶尔变小 | Race / Synchronization | 展开 Read-Modify-Write |
| High Task 超时 | Scheduling / Priority | 查 Task State、Mutex Owner、Timeline |
| 业务无进展但 CPU 低 | Synchronization | 建立 Wait-for Graph |
| 消息丢失 | Queue / Backpressure | 查速率、High-water、Send Failure |
| ISR burst 后 Deadline miss | ISR Boundary / Stack / Timing | 查 ISR 工作量、Wake-up、Watermark |

所有结果来自确定性 Host 模型，真实 RTOS 和硬件需要另外验收。
