# CAN Arbitration Visualizer

浏览器直接打开 `index.html`。

## 它解决什么问题

CAN 多节点同时发送时，并不是先由某个软件调度器“选一个人说话”。

每个仍在竞争的 Node 都会：

```text
发送当前 bit
+
同时读取真实 Bus bit
```

如果它发送：

```text
Recessive 1
```

却读到：

```text
Dominant 0
```

就知道自己失去 Arbitration，并停止当前发送。

Visualizer 现在支持三个标准 11-bit Identifier，并逐 bit 展示：

- Node A/B/C 当前发送 bit；
- Bus 最终是 Dominant 0 还是 Recessive 1；
- 哪个节点在当前 bit 失去仲裁；
- 最终谁继续发送。

## 推荐实验

### A — Three Different IDs

```text
A = 0x120
B = 0x080
C = 0x100
```

不要先比较十六进制大小，先预测第一个不同 bit 在哪里。

### B — Swap IDs

只改变一个 Node 的 ID，观察谁在哪一位退出。

### C — Equal Lowest IDs

让两个 Node 使用完全相同的最低 ID。

观察：11-bit Identifier 本身已经无法把它们区分开；实际 CAN 仲裁/bit monitoring 还会继续进入后续 Frame fields。

## Visualizer 的边界

本工具只训练 Identifier Arbitration，不模拟完整 CAN Frame、Bit Stuffing、CRC、ACK、Error Frame 或真实差分电气波形。

真机学习还必须继续认识：

```text
MCU CAN Controller
→ CAN Transceiver
→ CAN_H / CAN_L
→ Termination
→ Other Node
→ ACK / Error State
```

## Navigation

- Stage：[Stage 03 — Peripheral Engineer](../../02-Learning-Path/Stage-03-Peripheral-Engineer/README.md)
- Mission：[CAN Arbitration](../../04-Missions/Stage-03-Peripherals/06-CAN-Arbitration/Mission.md)
- Knowledge：[CAN](../../01-Knowledge-Base/Protocols/04-CAN.md)
- Debug Case：[CAN No ACK](../../06-Debugging-Cases/CAN-No-ACK/CASE.md)

核心目标：理解 Arbitration 是真实共享总线上的逐 bit 行为，同时明确“CAN Controller 算法正确”和“真实 CAN_H/CAN_L 网络可通信”是两个层级。