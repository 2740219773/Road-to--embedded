# Mission — Who Wrote It：是谁改坏了状态？

## 导航

- Stage：`02-Learning-Path/Stage-04-Debug-Hunter/`
- Knowledge：`01-Knowledge-Base/Debugging/04-Debugger-Watchpoint.md`
- Memory Corruption：`01-Knowledge-Base/Debugging/03-Stack-and-Memory-Corruption.md`
- Boss Project：`05-Projects/Intermediate/Stage-04-Boss-Broken-Firmware/PROJECT.md`

## Scene

`system_state` 正常应该只出现 `IDLE/RUN/ERROR`，但运行几分钟后偶尔变成 `0x7F`。

代码库中有很多地方访问它。不要先全局重构。

## Mission

1. 记录变量地址。
2. 建立“谁可能写它”的候选列表。
3. 对 CPU 写入使用 Data Watchpoint。
4. 命中后记录 PC、Call Stack、旧值、新值。
5. 如果始终不命中但值仍改变，重新考虑 DMA、越界写、调试器观察误差等非直接赋值路径。

## Twist

第二轮故障不是 `system_state = 0x7F`，而是相邻数组越界写覆盖了它。

## Boss

解释为什么“搜索 `system_state =`”无法发现第二轮根因，以及 Watchpoint 为什么更接近数据证据。

## Achievement

从“哪个函数看起来可疑”升级到“在变量被破坏的第一现场抓住写入者”。