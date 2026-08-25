# Priority Inversion — 高优先级任务为什么反而被拖住

Priority Inversion 发生在高优先级任务等待一个被低优先级任务持有的共享资源时，而中优先级任务又不断抢占低优先级任务，导致高优先级任务间接被中优先级任务长期拖延。

```text
Low owns Mutex
High blocks on Mutex
Medium preempts Low
→ High waits even longer
```

## 核心问题

- 为什么只看 Task Priority 不能保证关键任务及时运行？
- Priority Inheritance 解决的是什么问题？
- 为什么 Mutex 比普通 Binary Semaphore 更适合某些互斥场景？

## 推荐互动

Priority Inversion Timeline：Low 持锁、High 请求锁、Medium 周期运行。切换 Priority Inheritance，观察 Low 的临时优先级变化和 High 的等待时间。

## 工程原则

降低锁持有时间，避免在持锁期间做不可预测的阻塞操作，并理解 RTOS 对 Mutex 的具体调度语义。
