# Debugging Case — System Alive, Functions Frozen

## Related

- [Stage 05 — RTOS Engineer](../../02-Learning-Path/Stage-05-RTOS-Engineer/README.md)
- [Mission — Deadlock](../../04-Missions/Stage-05-RTOS/03-Deadlock/Mission.md)
- [Knowledge — Deadlock](../../01-Knowledge-Base/RTOS/06-Deadlock.md)
- [Knowledge — Queue / Semaphore / Mutex](../../01-Knowledge-Base/RTOS/02-Queue-Semaphore-Mutex.md)

## Symptom

系统 Tick 正常、Idle Task 仍运行、看门狗也没有复位，但采集和通信两个功能都停止推进。

## Evidence Pack

- TaskSensor: Blocked on `uart_mutex`, owns `sensor_mutex`
- TaskComms: Blocked on `sensor_mutex`, owns `uart_mutex`
- CPU usage is low
- No HardFault

## Your Task

1. 为什么 CPU usage 低反而可能是重要证据？
2. 画出资源依赖关系。
3. 这个问题是否能通过提高两个 Task 的优先级解决？

## Diagnosis

两个 Task 构成 circular wait：各自持有对方需要的 Mutex，同时等待对方释放。

## Verification

建立统一 lock ordering，例如总是先获取 `sensor_mutex` 再获取 `uart_mutex`；重新运行压力测试并确认不存在反向获取路径。

## Lesson

“系统还在跑”不等于业务系统有进展。RTOS 调试必须同时看 Task State 和 Resource Ownership。