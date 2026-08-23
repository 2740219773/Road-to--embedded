# Queue / Semaphore / Mutex — 任务之间怎么安全协作

这三个工具解决的问题并不相同。

## Queue

重点是传递数据/消息，并把生产者和消费者解耦。

## Semaphore

常用于表达“事件发生了”或“资源计数”。Binary/Counting Semaphore 的语义应结合具体 RTOS 使用。

## Mutex

重点是互斥访问共享资源，通常还与 Priority Inheritance 等机制有关。

## 典型错误

- 用全局变量代替所有通信；
- ISR 与 Task 之间使用不适合 ISR 的 API；
- 拿着 Mutex 做长时间阻塞操作；
- 多个锁顺序不一致造成 deadlock；
- 把 Semaphore 和 Mutex 当成完全一样的开关。

## 学习方法

先画数据所有权和事件流，再选择 RTOS primitive。不要看到“多任务”就先到处加锁。