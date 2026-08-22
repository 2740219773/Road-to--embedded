# Mission 04 — Queue Is Full：消息怎么越积越多？

## Scene

SensorTask 每 10 ms 产生一条数据，LoggerTask 平均每 30 ms 才处理一条。系统开始运行时一切正常，过一会儿 Queue 满了。

## 第一次看到 Queue

可以把 Queue 想成一个有限容量的消息邮箱：生产者往里投消息，消费者按顺序取走。

## Predict

如果 Producer 每秒产生 100 条，而 Consumer 每秒只能处理约 33 条，Queue 再大能永久解决问题吗？

## Investigation

记录：Producer period、Consumer processing time、Queue capacity、Queue high-water 和 send failure count。

## Break It

分别尝试增大 Queue、降低 Producer rate、提高 Consumer throughput、批量处理。观察哪些只是延迟问题出现，哪些真正改变长期吞吐关系。

## Boss

设计一种策略应对“部分数据可以丢、报警数据绝不能丢”的混合消息系统，并说明 Queue 是否应该只有一个。

## Achievement

理解 Queue 是缓冲和解耦工具，不是吞吐不足的永久解决方案。