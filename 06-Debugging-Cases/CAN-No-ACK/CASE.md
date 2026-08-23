# Debugging Case — CAN 能发波形，为什么一直失败？

## Symptom

一个 CAN 节点的软件持续报告发送失败或重复发送。

你已经确认：

- TX 请求确实被提交；
- CAN_H / CAN_L 上能看到完整帧波形；
- Identifier 合法；
- 当前只有这一台节点接在总线上。

## Evidence Pack

```text
Configured bit rate: 500 kbit/s
CAN_H / CAN_L waveform: present
Arbitration lost flag: no
ACK observed: no
Transmit error counter: increasing
Peer node on bus: none
```

## Your Task

在看 Diagnosis 前回答：

1. 这更像 Arbitration 问题还是 ACK 问题？
2. “能看到完整波形”证明了哪些层？没有证明哪些层？
3. 为什么只有一个节点时，发送端可能无法得到正常 ACK？
4. 下一步最有价值的实验是什么？

## Layer Map

```text
Application
↓
CAN Controller
↓
Transceiver
↓
CAN_H / CAN_L
↓
Other Node
↓
ACK
```

## Diagnosis

发送节点已经赢得仲裁并发送完整 Frame，但总线上没有另一个正确工作的接收节点，因此没有其他节点在 ACK Slot 提供确认。

这不是“ID 太低/太高”的问题，也不是“没有波形”的问题。

关键证据是：

```text
complete frame waveform present
+ no arbitration loss
+ no ACK
+ TX error counter increases
+ no peer node
```

## Fix

加入一个 Bit Timing 兼容、正确连接且正常工作的第二节点，确认：

- 对端能正确接收；
- ACK 出现；
- 发送错误计数停止异常增长；
- 应用层接收结果符合预期。

## Regression

修复后再故意：

1. 让对端断电；
2. 让对端 Bit Rate 错误；
3. 让 Transceiver Standby；

比较三种情况下：

```text
Physical waveform
ACK
Error counter
Application result
```

是否一致。

## Lesson

```text
CAN waveform exists
≠ another node decoded it
≠ frame was acknowledged
≠ communication succeeded
```

同样：

```text
Arbitration Lost
```

通常是共享总线正常工作的一部分，而：

```text
No ACK + increasing error counter
```

更应该继续调查 Peer Node、Bit Timing、Transceiver 与物理总线。

## Learning Links

- [Stage 03 — Peripheral Engineer](../../02-Learning-Path/Stage-03-Peripheral-Engineer/README.md)
- [Mission 06 — CAN Arbitration](../../04-Missions/Stage-03-Peripherals/06-CAN-Arbitration/Mission.md)
- [CAN Knowledge](../../01-Knowledge-Base/Protocols/04-CAN.md)
- [CAN Arbitration Visualizer](../../03-Interactive-Labs/CAN-Arbitration-Visualizer/README.md)
