# Mission 07 — RS-485 No Reply：UART 已经发了，A/B 总线为什么没有正确回应？

## Beginner Guide

- 适合：已完成 CAN Arbitration 的学习者；
- 前置：UART、Transceiver、DE/RE、A/B、参考地和总线方向；
- 预计：75 分钟；
- 本关产出：UART、Transceiver、Direction、A/B 和 Peer 证据；
- 上一关：CAN Arbitration；当前关：RS-485 No Reply；下一关：Modbus Wrong Register。

## What to Submit

使用 [Learning Record Template](../../../docs/LEARNING-RECORD-TEMPLATE.md)，记录 UART TX、DE/RE、差分总线和远端响应的分层证据。

## If You Are Stuck

先区分 MCU UART 已发、Transceiver 已驱动和 A/B 总线真实变化，不要直接修改 Modbus 地址。

## Ready to Continue

能够证明 RS-485 物理路径后，再进入 Modbus Wrong Register。

> 学习路径：[Stage 03 — Peripheral Engineer](../../../02-Learning-Path/Stage-03-Peripheral-Engineer/README.md) · 知识支撑：[RS-485 与 Modbus RTU](../../../01-Knowledge-Base/Protocols/05-RS485-Modbus.md) · 互动实验：[RS-485 Half-Duplex Visualizer](../../../03-Interactive-Labs/RS485-Half-Duplex-Visualizer/README.md)

## Mission Brief

MCU 的 UART 发送函数返回成功，逻辑分析仪在 MCU UART TX 引脚上也能看到字节。

但 RS-485 设备完全不回应。

这关故意**先不讨论 Modbus 地址和功能码**。你要先证明：

```text
UART Bytes
→ RS-485 Transceiver
→ A/B Differential Bus
→ Remote Transceiver
→ Remote UART
```

这条物理通信链真的成立。

---

## Before You Start

第一次只认识这些词：

- RS-485：一种常见的差分电气接口标准；
- Differential：接收端主要关注两根线之间的电压差；
- Transceiver：把 MCU 的 UART 逻辑电平转换成 RS-485 总线信号；
- Half Duplex：同一组 A/B 线路在某一时刻主要朝一个方向传输；
- DE：Driver Enable，很多收发器用它控制发送驱动是否开启；
- RE / Receiver Enable：某些器件用独立或组合引脚控制接收；
- Termination：总线两端常见的终端配置；
- Bias / Fail-safe：帮助空闲总线保持稳定逻辑状态的电气措施之一。

不同芯片的 DE/RE 极性和连接方式可能不同，必须看实际 Transceiver Datasheet / Schematic。

---

## 1. Predict — UART TX 有波形说明了什么？

假设已经确认：

```text
MCU UART TX pin has valid bytes
RS-485 A/B has no differential activity
```

优先怀疑：

```text
Modbus Register Address?
```

还是：

```text
UART → Transceiver → Direction Control → A/B
```

先写出原因。

---

## 2. Visualize — Direction Control

打开 RS-485 Half-Duplex Visualizer。

分别测试：

```text
MCU A sends + DE enabled
MCU A sends + DE disabled
Remote node offline
Termination/bias questionable
```

观察一个关键现象：

> UART 可以在 MCU 内部正常发送，而 RS-485 Driver 仍然可能没有真正驱动总线。

---

## 3. Observe — 分三处取证

### Evidence A — MCU UART Side

观察 MCU UART TX：

```text
Byte timing correct?
Baud correct?
Expected bytes exist?
```

这一步证明“数字字节已经离开 UART Controller”。

### Evidence B — Transceiver Control

查看：

```text
Transceiver power
DE / RE state
Standby / Shutdown pin
Direction switching timing
```

不要默认“驱动库调用发送”就一定控制了外部 DE。

### Evidence C — A/B Bus

用合适的测量方式观察实际 A/B 差分行为。

重点确认：

```text
发送期间真的出现差分波形？
空闲状态稳定？
远端回应期间总线方向真的切回来？
```

测量 RS-485 时要遵守仪器和系统的安全接地要求，不要在不了解隔离/参考关系时随意把普通示波器地夹接到任意总线节点。

---

## 4. Explain — 为什么 UART 和 RS-485 不是一层

把路径写成：

```text
Application bytes
↓
UART peripheral
↓
TX logic signal
↓
RS-485 transceiver
↓
A/B differential signal
↓
remote transceiver
↓
remote UART bytes
```

如果 UART TX 正常、A/B 不正常，继续修改 Modbus Function Code 几乎没有信息价值。

---

## 5. Half-Duplex Turnaround — 发完以后为什么仍收不到回应

典型半双工过程：

```text
Enable TX driver
↓
Send request bytes
↓
Wait until final byte is physically shifted out
↓
Disable TX driver / enable receive
↓
Remote node responds
↓
Receive response bytes
```

这里容易出现一个重要错误：

```text
software buffer empty
≠ final stop bit already left the UART pin
```

如果过早切回接收，最后一个字节可能被截断；如果太晚关闭 Driver，又可能占着总线，让从站无法回应。

---

## 6. Break It — 主动制造故障

至少完成四项：

### Fault A — DE 永远不打开

观察 UART TX 与 A/B 的区别。

### Fault B — DE 永远保持发送

观察远端是否有机会驱动回应。

### Fault C — Remote Node 断电

确认“本地请求波形正常”和“有人回应”是两件事。

### Fault D — A/B 接线或总线条件错误

仅在安全实验条件下操作。用物理波形证明问题，而不是只看 Timeout。

### Fault E — Baud 不匹配

比较 UART 字节和远端解码结果。

---

## 7. Debug — Timeout 先查哪一层

面对：

> RS-485 request timeout.

按下面顺序：

```text
Correct UART bytes generated?
↓
Transceiver powered?
↓
DE/RE timing correct?
↓
Differential request exists on A/B?
↓
Remote node powered / configured?
↓
Differential response exists on A/B?
↓
Local receiver enabled?
↓
UART received response bytes?
↓
Only then parse Modbus meaning
```

这就是本关最重要的分层习惯。

---

## 8. Transfer — 下一关才进入 Modbus

只要下面这条已经能被证据证明：

```text
request bytes
→ real A/B waveform
→ remote response waveform
→ response bytes
```

下一关就可以放心问：

```text
这些 bytes 的站号、功能码、地址和 CRC 到底对不对？
```

---

## 9. Mission Report

提交：

```text
MCU / UART:
RS-485 transceiver:
Baud:
DE / RE control method:
UART TX evidence:
A/B request evidence:
Remote response evidence:
Direction turnaround evidence:
Termination / bias observation:
One injected physical-layer fault:
Root cause:
Regression evidence:
```

## Achievement Unlocked

完成后，你应该真正理解：

```text
UART bytes correct
≠ RS-485 physical bus correct
```

并且在 Timeout 时先证明“线上的事实”，而不是马上修改 Modbus 地址。

下一关：**Mission 08 — Modbus Wrong Register**。
