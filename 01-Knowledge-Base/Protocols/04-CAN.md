# CAN — 多节点总线上的可靠通信

CAN 面向多节点共享总线，重点不仅是数据帧，还包括仲裁、错误检测和物理层。

## 核心模型

```text
Node A ─┐
Node B ─┼─ CAN_H / CAN_L Bus
Node C ─┘
```

## 核心问题

- Identifier 为什么同时参与优先级仲裁？
- Dominant / Recessive 是什么？
- 为什么总线两端通常需要终端电阻？
- Bit Rate 与 Sample Point 为什么重要？
- CAN Controller 与 CAN Transceiver 有什么区别？

## 推荐互动

CAN Arbitration Visualizer：让多个节点同时发送不同 ID，逐 bit 展示谁继续、谁退出仲裁；同时展示错误终端电阻或 Bit Timing 不匹配的故障模式。

## 故障视角

“收不到 CAN”可能来自 Controller 配置、Filter、Bit Timing、Transceiver、终端、线序、共地、总线状态或对端根本没有 ACK。