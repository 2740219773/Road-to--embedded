# Queue Overflow — 消息太多，邮箱塞满了怎么办？

## 先把 Queue 想成“消息邮箱”

一个 Task 可以把数据放进 Queue，另一个 Task 再按顺序取走。

如果生产数据的速度长期高于消费速度，Queue 最终会被塞满。

```text
Producer → Queue → Consumer
   快        有限容量      慢
```

## Queue 满了会怎样？

具体行为取决于 API 和超时参数：发送者可能阻塞、立即失败，或者在某些设计中数据被主动丢弃。

真正的问题不是“Queue 为什么满”，而是：

- Producer 为什么这么快？
- Consumer 为什么这么慢？
- Queue 深度是否合理？
- 数据是不是每一条都必须保留？
- 是否应该批量处理或改变系统架构？

## 调试证据

记录 Queue depth/high-water、发送失败计数、Producer/Consumer 周期和执行时间。

## 目标

不要通过无限增大 Queue 掩盖吞吐能力不匹配。Queue 是缓冲，不是无限仓库。
