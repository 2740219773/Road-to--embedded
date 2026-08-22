# Mission — 两个 CAN 节点同时说话，为什么没有撞车？

## 导航

- Stage：`02-Learning-Path/Stage-03-Peripheral-Engineer/`
- Knowledge：`01-Knowledge-Base/Protocols/04-CAN.md`
- Lab：`03-Interactive-Labs/CAN-Arbitration-Visualizer/`

## 场景

Node A 使用标准 ID `0x120`，Node B 使用 `0x080`。它们在同一时刻开始发送。

先预测谁会继续发送，再使用 CAN Arbitration Visualizer 验证。

## 核心调查

CAN 节点发送每一 bit 的同时也读取总线。Dominant 0 可以覆盖 Recessive 1。节点如果发送 1 却读到 0，就知道自己失去仲裁并停止当前发送，而获胜节点无需重新开始整帧。

## Break It

改变两个 ID，观察“数值更小的标准 ID 通常拥有更高仲裁优先级”是如何由逐 bit 比较自然产生的，而不是人为排序函数。

## Boss

给三个同时发送的 11-bit Identifier，不使用十进制比较，直接从二进制位序判断谁最先退出、谁最终获胜。

## Achievement

理解 CAN 仲裁发生在真实共享总线上，并能够把 Identifier、Dominant/Recessive 和优先级连接起来。