# Mission 06 — CAN Arbitration：三个节点同时发送，谁能继续？

> 学习路径：[Stage 03 — Peripheral Engineer](../../../02-Learning-Path/Stage-03-Peripheral-Engineer/README.md) · 知识支撑：[CAN](../../../01-Knowledge-Base/Protocols/04-CAN.md) · 互动实验：[CAN Arbitration Visualizer](../../../03-Interactive-Labs/CAN-Arbitration-Visualizer/README.md)

## Mission Brief

总线上有三个节点：

```text
Node A — ID 0x120
Node B — ID 0x080
Node C — ID 0x100
```

它们几乎同时开始发送。

如果把 CAN 只理解成“ID 小的优先级高”，你只能背结论；这一关要真正看到：**优先级是怎样从共享总线上的逐 bit 行为自然产生的。**

同时还要建立第二条工程链：赢得仲裁并不等于通信一定成功。

```text
Arbitration succeeded
≠
Frame acknowledged
≠
Physical CAN bus healthy
```

---

## Before You Start

先读：[CAN — 很多设备共用两根线时，怎样有秩序地说话](../../../01-Knowledge-Base/Protocols/04-CAN.md)

第一次只需要认识：

- Node：总线上的一个设备；
- Identifier / ID：CAN Frame 的标识，同时参与仲裁；
- Dominant：显性状态，经典 CAN 仲裁中通常对应逻辑 0；
- Recessive：隐性状态，经典 CAN 仲裁中通常对应逻辑 1；
- Arbitration：多个节点同时发送时，逐 bit 决定谁继续；
- CAN Controller：MCU 内负责帧、仲裁和错误处理的数字逻辑；
- Transceiver：把 Controller 信号变成真实 CAN_H / CAN_L 差分电气信号的器件；
- Termination：总线两端常见的终端电阻；
- ACK：另一个正确接收到 Frame 的节点对当前 Frame 的确认。

---

## 1. Predict — 不用十进制大小直接猜

把三个标准 11-bit ID 写成二进制，从最高有效仲裁位开始比较。

先回答：

1. 哪两个节点会先出现不同 bit？
2. 谁在第一个“自己发 Recessive，却读到 Dominant”的位置退出？
3. 最终谁继续发送？
4. 失败的节点是发生了“通信错误”，还是正常失去仲裁？

不要先运行 Visualizer。

---

## 2. Visualize — 让三个节点逐 bit 竞争

打开 CAN Arbitration Visualizer。

输入：

```text
A = 0x120
B = 0x080
C = 0x100
```

观察每个节点：

```text
TX bit
↓
Shared Bus bit
↓
TX == Bus ?
├─ Yes → continue
└─ No, sent recessive but read dominant → lose arbitration
```

记录：

```text
First node to lose:
Bit position:
Second node to lose:
Bit position:
Winner:
```

然后自己换三组 ID，再预测、验证。

---

## 3. Explain — 为什么不会“撞坏数据”

经典 CAN 仲裁的关键是：节点发送的同时也读取总线。

当节点发送 Recessive，却在总线上读到 Dominant，它会知道：

> 另一个更高优先级 Frame 正在继续，我应该停止当前发送。

因此仲裁不是软件先排序：

```text
software sort IDs
→ choose one
```

而是发生在真实共享 bit 流上：

```text
multiple nodes transmit
→ bus resolves dominant/recessive
→ each node monitors bus
→ losing nodes stop
→ winner continues without restarting the frame
```

---

## 4. Observe — 从 Controller 走到真实 CAN_H/CAN_L

在真机或实验系统中建立下面的地图：

```text
Application Message
↓
CAN Controller
↓
TX/RX logic signal
↓
CAN Transceiver
↓
CAN_H / CAN_L
↓
Termination + Cable
↓
Other CAN Node
```

至少确认：

- MCU/Controller 确实进入发送流程；
- Transceiver 已供电且 Enable/Standby 状态正确；
- CAN_H/CAN_L 线序正确；
- 总线两端终端配置符合当前实验拓扑；
- 两端 Bit Rate / Timing 配置兼容；
- 至少存在另一个真正工作的接收节点。

不要把 `CAN transmit API returned OK` 当成物理总线已经正常。

---

## 5. ACK — 赢得仲裁后为什么还可能一直重发

仲裁只回答：

> 这次谁有权继续发送？

ACK 则回答：

> 有没有其他节点正确接收到这帧？

因此一个节点可能：

```text
wins arbitration
→ sends complete frame
→ no other node acknowledges
→ controller records error / retries according to configuration
```

这时继续调整 ID 并没有意义。

---

## 6. Break It — 主动制造五类问题

至少完成其中四类，每次只改一个主要变量。

### Fault A — 改 ID

只改变 Identifier，观察仲裁顺序怎样改变。

### Fault B — 断开另一个接收节点

观察发送端是否出现 ACK / retry / error counter 相关变化。

### Fault C — Transceiver 进入 Standby / 未使能

比较 Controller 内部状态和 CAN_H/CAN_L 物理波形。

### Fault D — Bit Rate 不匹配

确认“有波形”为什么仍不代表接收节点能正确解码。

### Fault E — Termination / Bus Wiring 异常

只在安全、低风险实验条件下进行。使用示波器观察总线波形质量，而不是只看软件错误码。

---

## 7. Debug — 把“CAN 发不出去”拆成层

面对：

> CAN 节点一直发送失败。

按下面顺序建立证据：

```text
Application queued frame?
↓
CAN Controller entered TX?
↓
Arbitration lost normally or real error?
↓
Transceiver active?
↓
CAN_H/CAN_L waveform exists?
↓
Bit timing compatible?
↓
Other node receiving?
↓
ACK observed?
↓
Error counters / bus state?
```

不要把 `Arbitration Lost` 和 `No ACK` 当成同一种故障。

---

## 8. Transfer — 连接到 Stage 04 的调试方法

CAN 很适合训练“同一个症状来自不同层”：

```text
No received data
```

可能来自：

```text
Application Filter
Controller configuration
Bit Timing
Transceiver state
Wiring / Termination
No peer node
Bus error state
```

所以真正能力不是会初始化 CAN，而是能用 Controller 状态 + 波形 + 对端证据缩小范围。

---

## 9. Mission Report

提交：

```text
Board / MCU:
CAN controller / transceiver:
Bit rate:
Node IDs tested:
Predicted arbitration order:
Observed arbitration order:
Evidence on CAN_H/CAN_L:
Was ACK present?:
One normal arbitration-loss example:
One real communication-failure example:
Injected fault:
Root cause:
Regression evidence:
```

## Achievement Unlocked

完成后，你应该能同时解释两件事：

```text
为什么多个 CAN 节点可以无破坏地争用总线
```

以及：

```text
为什么赢得仲裁仍然不等于通信成功
```

下一关进入 **RS-485 / Modbus**：先分清差分电气层，再处理站号、功能码和寄存器语义。