# CAN — 多个节点共用两根线，怎样有秩序地通信

## 先用一句人话理解

CAN（Controller Area Network）是一种让多个节点共享同一条差分总线的通信系统，汽车、工业控制和设备网络中很常见。

最重要的第一张图不是 Frame 格式，而是系统分层：

```text
Application
↓
MCU CAN Controller
↓
CAN Transceiver
↓
CAN_H / CAN_L Differential Bus
↓
Termination + Other Nodes
```

CAN Controller 负责报文、仲裁、错误计数等数字逻辑；Transceiver 负责把 MCU 内部数字信号转换成真实 CAN_H / CAN_L 电气信号。

所以：

```text
CAN peripheral configured
≠ physical CAN bus is healthy
```

## Node、Frame、Identifier

- Node：挂在 CAN Bus 上的一个设备；
- Frame：一次完整 CAN 报文；
- Identifier / ID：标识报文内容/优先级的字段；
- Arbitration：多个 Node 同时发送时，决定谁继续发送；
- Dominant / Recessive：CAN 总线的两种逻辑状态；
- ACK：其他正确接收该 Frame 的节点在 ACK slot 给出确认；
- Error Counter / Error State：CAN Controller 用来判断通信错误程度的一套机制。

初学阶段不必先背完整 Frame 每一位，先抓住共享总线、ID、仲裁、ACK 和物理层。

## 为什么 CAN 不会像普通推挽输出那样“硬撞”

CAN 设计成可以让多个 Node 同时监视 Bus。

仲裁阶段：

```text
Dominant 0
can override
Recessive 1
```

某 Node 如果：

```text
自己发送 Recessive 1
却读取到 Dominant 0
```

就知道另一个报文拥有更高优先级，于是停止发送。

获胜 Frame 继续，不需要从头重发。

这叫 nondestructive arbitration（非破坏性仲裁）。

## 为什么较小 ID 通常优先级更高

以标准 11-bit ID 为例，从最高位开始逐 bit 比较。

第一个不同 bit：

```text
Node A sends 0 (Dominant)
Node B sends 1 (Recessive)
→ Bus = 0
→ B sees mismatch and withdraws
```

因此数值较小的标准 Identifier 通常会更早产生 Dominant 0，从而获得更高仲裁优先级。

重点是：

> 优先级来自真实 bit 行为，不是软件先把 ID 排序。

## CAN Arbitration Visualizer

进入：[CAN Arbitration Visualizer](../../03-Interactive-Labs/CAN-Arbitration-Visualizer/README.md)

它支持三个 Node，逐 bit 展示谁在什么时候退出。

Visualizer 只模拟 Identifier Arbitration，不代表完整 CAN Bus。

## Controller 和 Transceiver 为什么必须分开理解

典型链：

```text
MCU TX/RX internal CAN signals
↓
Transceiver
↓
CAN_H / CAN_L
```

可能出现：

```text
CAN Controller TX queue正常
but
Transceiver 没供电 / Standby
→ physical bus no valid frame
```

也可能：

```text
CAN_H / CAN_L waveform exists
but
bitrate / sample point incompatible
→ receiver errors
```

所以真机排错至少同时看 Controller state 和 Bus waveform。

## Differential Bus 是什么

CAN_H / CAN_L 是一对差分信号。

接收器更关心两根线之间的差值，而不是单独某一根相对 Ground 的绝对电压。

这种方式有利于在噪声环境中传输。

Stage 03 不要求背某个 CAN PHY 的精确电压门限；测量时应优先参考所用 Transceiver Datasheet，并正确使用示波器差分测量方法或两通道数学运算。

## Termination 是什么

高速 CAN Bus 通常在物理总线两端使用终端电阻，常见网络中会看到两个约 120 Ω termination。

断电状态下，从 CAN_H 到 CAN_L 测到的总等效阻值经常接近：

```text
120 Ω || 120 Ω ≈ 60 Ω
```

这是常见诊断线索，但实际网络结构、器件和测量条件可能不同，不能把“60 Ω”当成任何 CAN 网络都必须机械满足的唯一答案。

缺失/错误 Termination 可能导致反射、波形畸变、在更高 Bit Rate 或更长线缆下通信不稳定。

## Bit Rate 和 Sample Point

CAN 也有时间基准。

所有通信 Node 必须在足够兼容的 Bit Rate / timing 条件下理解同一条 Bus。

因此：

```text
Both configured as CAN
≠ both configured with compatible timing
```

遇到大量 Error Frame、ACK Error、接收失败时，要检查：

- Peripheral Clock；
- Bit Rate；
- Time segments / Sample Point；
- Transceiver；
- Wiring / termination。

## ACK 为什么重要

发送 Node 发完 Frame 后，其他正确接收到该报文的 CAN Node 会在 ACK slot 给出确认。

因此如果总线上只有一个孤立的发送节点：

```text
TX waveform may exist
but
no other receiver ACKs
→ transmitter detects ACK error
→ may retry / error counter changes
```

这说明：

```text
I saw a CAN waveform
≠ network transaction succeeded
```

## Filter 和 ID 是哪一层

CAN 接收 Filter 决定 Controller 把哪些 Frame 交给软件。

如果物理 Bus 上已经存在正确 Frame，但 Application 收不到，才应该继续检查：

```text
Controller receive state
→ Filter
→ FIFO / interrupt
→ application
```

如果 CAN_H / CAN_L 根本没有合法波形，先改 Filter 没意义。

## 真机最小实验

最好至少使用两个真实 CAN Node。

验证顺序：

```text
1. Controller clock / bitrate
2. Transceiver power / enable
3. CAN_H / CAN_L wiring
4. Termination
5. Node A sends known ID
6. Node B receives and ACKs
7. Observe TX/RX counters / errors
8. Use CAN analyzer or oscilloscope for bus evidence
```

然后再让两个节点同时发不同 ID，观察 Arbitration。

## 常见“CAN 发不出去/收不到”调查顺序

```text
Controller running?
↓
Bit timing compatible?
↓
Transceiver powered / enabled?
↓
CAN_H / CAN_L wiring correct?
↓
Termination / bus topology reasonable?
↓
Physical frame visible?
↓
ACK / error counters?
↓
Receive filter / FIFO / interrupt?
↓
Application meaning?
```

## Learning Loop

- Stage：[Stage 03 — Peripheral Engineer](../../02-Learning-Path/Stage-03-Peripheral-Engineer/README.md)
- Mission：[CAN Arbitration](../../04-Missions/Stage-03-Peripherals/06-CAN-Arbitration/Mission.md)
- Interactive Lab：[CAN Arbitration Visualizer](../../03-Interactive-Labs/CAN-Arbitration-Visualizer/README.md)
- Debug Case：[CAN No ACK](../../06-Debugging-Cases/CAN-No-ACK/CASE.md)

完成后，你应该既能解释逐 bit Arbitration，也能区分 Controller、Transceiver、Differential Bus、Termination、ACK 和软件 Filter 这些不同层级。