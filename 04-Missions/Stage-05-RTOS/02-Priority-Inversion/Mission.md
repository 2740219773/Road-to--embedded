# Mission — High Priority Why Waiting?

## Related

- [Stage 05 — RTOS Engineer](../../../02-Learning-Path/Stage-05-RTOS-Engineer/README.md)
- [Knowledge — Queue / Semaphore / Mutex](../../../01-Knowledge-Base/RTOS/02-Queue-Semaphore-Mutex.md)
- [Knowledge — Priority Inversion](../../../01-Knowledge-Base/RTOS/05-Priority-Inversion.md)
- [Lab — RTOS Scheduler Timeline](../../../03-Interactive-Labs/RTOS-Scheduler-Timeline/)
- [Boss — RTOS Refactor](../../../05-Projects/Intermediate/Stage-05-Boss-RTOS-Refactor/PROJECT.md)

## Scene

High-priority Task 必须在 5 ms 内响应，但它偶尔等待几十毫秒。

现场：Low-priority Task 持有一个 Mutex；High 请求同一个 Mutex 后 Blocked；Medium-priority Task 此时持续运行。

## Investigation

画 Timeline：

```text
Low owns Mutex
High becomes Ready → waits Mutex
Medium preempts Low
Low cannot finish critical section
High keeps waiting
```

解释为什么真正阻塞 High 的资源由 Low 持有，但 Medium 反而延长了 High 的等待时间。

## Fix

理解 Priority Inheritance 的目标：临时提升持锁者的有效优先级，让它尽快释放 High 需要的资源。

同时评估更根本的设计：缩短 critical section、避免持锁做慢 I/O、减少共享资源。

## Boss

给出三个 Task 的优先级、Mutex Owner 和执行时间，画出启用/不启用 Priority Inheritance 的两条时间线，并比较 High 的阻塞时间。

## Achievement

不再认为“把关键 Task 优先级调最高”就自动等于实时性有保证。