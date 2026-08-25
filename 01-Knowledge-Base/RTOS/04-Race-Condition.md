# Race Condition — 两个任务同时改数据会发生什么

Race Condition 的本质不是“多线程很危险”，而是程序结果依赖不可控的执行交错。

例如两个 Task 都执行：

```c
counter++;
```

这个表达式通常并不是一个不可分割动作，而可能经历读取、计算、写回。两个任务交错后，最终结果可能少一次更新。

## 核心问题

- 什么叫共享可变状态？
- 为什么 `volatile` 不能解决 Race Condition？
- Critical Section、Mutex、Atomic Operation 分别适合什么场景？
- 为什么“偶尔出错”比“每次都错”更难调试？

## 推荐互动

Race Interleaving Visualizer：逐步执行两个任务的 Read / Modify / Write，让学习者手动排列执行顺序，观察为什么最终值可能不同。

## 工程原则

先减少共享状态，再决定如何同步。不要把所有全局变量都包进一个大锁。
