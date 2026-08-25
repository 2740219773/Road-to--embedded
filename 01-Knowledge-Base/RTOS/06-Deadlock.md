# Deadlock — 两个任务为什么会永远等下去

经典 Deadlock：Task A 持有 Mutex 1，等待 Mutex 2；Task B 持有 Mutex 2，等待 Mutex 1。

```text
Task A: owns M1 → waits M2
Task B: owns M2 → waits M1
```

如果双方都不释放已有资源，系统会进入循环等待。

## 核心问题

- Mutual Exclusion、Hold and Wait、No Preemption、Circular Wait 分别代表什么思想？
- 为什么统一 Lock Ordering 是一种常见预防策略？
- Timeout 是预防、检测还是恢复手段？
- 为什么“Task 还在运行”不代表系统没有死锁？

## 调试证据

Task State、Mutex Owner、Blocked Object、Call Stack、等待时间、系统事件 Trace。

## 工程原则

建立固定的资源获取顺序，缩短持锁范围，避免在持锁期间调用可能再次获取其他锁的复杂函数。
