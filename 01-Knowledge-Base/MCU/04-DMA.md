# DMA — CPU 不搬数据，数据为什么还能移动？

DMA 允许外设与内存之间或某些内存区域之间的数据传输在较少 CPU 逐字节参与的情况下完成。

```text
Peripheral → DMA → Memory
                ↓
        Half / Complete Event
                ↓
               CPU
```

## 核心问题

- DMA 解决的瓶颈是什么？
- Source / Destination / Length 是什么？
- Normal 与 Circular 模式有什么区别？
- DMA 和 Interrupt 是替代关系吗？
- Cache 存在时为什么还会出现“内存明明变了，CPU 看见的却不对”的问题？

## 推荐互动

DMA Transfer Simulator：显示 CPU、Peripheral、DMA 和 Memory 四个区域，让数据块移动过程可视化，并比较 Polling、Interrupt-per-byte 与 DMA 的 CPU 占用时间线。

## 故障视角

DMA 不工作时检查 Request Mapping、方向、地址、长度、数据宽度、事件/中断、缓存一致性以及外设本身是否产生请求。