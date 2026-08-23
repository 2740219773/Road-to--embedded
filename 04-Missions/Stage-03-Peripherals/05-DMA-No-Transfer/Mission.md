# Mission — DMA 配好了，为什么一个字节都没搬？

## 导航

- Stage：`02-Learning-Path/Stage-03-Peripheral-Engineer/`
- Knowledge：`01-Knowledge-Base/MCU/04-DMA.md`
- Lab：`03-Interactive-Labs/DMA-Transfer-Simulator/`

## 故障现场

UART RX 已经能产生数据，DMA 也完成初始化，但目标 Buffer 始终不变化。

## 调查链

```text
Peripheral Event
→ DMA Request
→ Channel/Stream Mapping
→ Source/Destination
→ Length/Data Width
→ Enable
→ Memory Result
→ Complete Event
```

## Investigation

不要先看回调函数。先证明外设是否真的产生 DMA Request，再确认 Request Mapping、方向、地址、长度和 Enable 状态。

## Break It

分别制造错误 Request Mapping、错误方向、长度为 0/错误长度、忘记 Enable。比较它们的寄存器状态和现象。

## Boss

给出 UART 正常 RX 波形、DMA 寄存器快照和未变化的 Buffer，判断故障最可能位于哪一段链路，并列出验证顺序。

## Achievement

理解 DMA 不是“自动魔法”，它仍然依赖明确的触发源、搬运规则和完成条件。