# DMA Transfer Simulator

## Beginner Start

- 第一次操作：保持 Request、Direction、Count 和 Buffer Capacity 默认，运行一次 Transfer；
- 预期观察：源数据按 Count 写入目标 Buffer，并显示完成状态；
- 观察不到：先比较 Count 与 Buffer Capacity，再检查 Request 是否产生；
- Mission Integration：对应 DMA No Transfer 的 Request / Address / Length / Boundary 调查。

浏览器直接打开 `index.html`。

## 它解决什么问题

DMA 的关键不是“比 CPU 快”这一句话，而是先看一条完整搬运链是否成立：

```text
Peripheral Event
→ DMA Request / Mapping
→ Direction
→ Source / Destination
→ Transfer Count
→ Enable
→ Memory Result
→ Complete / Error Event
```

Simulator 支持：

- CPU Polling / Interrupt-per-item / DMA block transfer 对比；
- Peripheral DMA Request 是否有效；
- DMA Enable；
- 正确/错误 Direction；
- Transfer Count；
- Destination Buffer Capacity；
- 正常完成与越界覆盖。

## 两类最重要的实验

### A — DMA 一个字节都没搬

分别关闭：

```text
DMA Request
DMA Enable
Direction
Transfer Count
```

观察 Memory 不变化时，链路究竟停在哪一层。

### B — DMA 正常完成但程序随后崩溃

设置：

```text
Transfer Count = 16
Buffer Capacity = 8
```

观察 DMA 可以“成功完成”，但已经写出 Buffer 边界。

这正是为什么：

```text
DMA Complete
≠ DMA configuration is correct
```

## Navigation

- Stage：[Stage 03 — Peripheral Engineer](../../02-Learning-Path/Stage-03-Peripheral-Engineer/README.md)
- Mission：[DMA No Transfer](../../04-Missions/Stage-03-Peripherals/05-DMA-No-Transfer/Mission.md)
- Knowledge：[DMA](../../01-Knowledge-Base/MCU/04-DMA.md)
- Debug Case：[DMA Wrong Length](../../06-Debugging-Cases/DMA-Wrong-Length/CASE.md)

核心目标：把“触发、搬运规则、内存结果、完成事件”分开验证。
