# CAN — 很多设备共用两根线时，怎样有秩序地说话

## 先用一句人话理解

CAN（Controller Area Network）是一种让多个控制器共享同一条通信总线的方式，汽车、工业控制和设备网络里非常常见。

你可以先把它想成“很多人共用一个对讲频道”：每个节点都能听到总线上的信息，但同一时刻只能有一个节点把自己的报文完整发出去。

```text
Node A ─┐
Node B ─┼─ CAN_H / CAN_L
Node C ─┘
```

CAN_H 和 CAN_L 是一对差分信号线。真正的设备通常还需要 CAN Transceiver，把 MCU 内部 CAN Controller 的数字信号转换成适合总线传输的电气信号。

## 第一次先认识这些词

- Node：挂在 CAN 总线上的一个设备；
- Frame：一次发送的完整报文；
- Identifier / ID：报文的标识，同时参与总线仲裁；
- Arbitration：多个节点同时发送时，决定谁继续发送的过程；
- Dominant / Recessive：CAN 总线中两种逻辑状态，Dominant 可以覆盖 Recessive；
- Transceiver：连接 MCU CAN 控制器和真实 CAN_H/CAN_L 总线的收发器；
- Termination：总线两端常见的终端电阻，用于改善信号完整性。

第一次学习不用背完整帧格式。先建立三个概念：多人共享总线、报文有 ID、冲突不是简单“撞坏”，而是通过仲裁解决。

## 为什么 ID 会影响优先级

当两个节点同时发送时，它们一边发送，一边读取总线。某节点如果发出 Recessive，却读到 Dominant，就知道有更高优先级的报文存在，于是停止当前发送。

因此仲裁是在真实 bit 流上发生的，不是软件先做一个排序函数。

## Controller 和 Transceiver 不一样

```text
MCU Software
↓
CAN Controller
↓
CAN Transceiver
↓
CAN_H / CAN_L Bus
```

Controller 负责帧、仲裁、错误处理等数字逻辑；Transceiver 负责真实总线电气层。排查“CAN 收不到”时必须区分这两层。

## 推荐互动

进入 `03-Interactive-Labs/CAN-Arbitration-Visualizer/`，给两个节点不同 ID，观察逐 bit 仲裁。

## 故障视角

收不到 CAN 时，不要只改 Filter 或 ID。还要检查 Bit Rate、Sample Point、Transceiver、终端电阻、线序、共地、总线状态和对端是否真正工作。

学习入口：`02-Learning-Path/Stage-03-Peripheral-Engineer/README.md`。