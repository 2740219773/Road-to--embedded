# Mission 08 — Modbus Wrong Register：通信明明通了，为什么读到的不是那个参数？

## Beginner Guide

- 适合：已完成 RS-485 No Reply 的学习者；
- 前置：Frame、Function Code、PDU Address、手册显示地址和数据语义；
- 预计：75 分钟；
- 本关产出：物理通信、Frame、地址映射和数据含义证据；
- 上一关：RS-485 No Reply；当前关：Modbus Wrong Register；下一关：Stage 03 Mixed Challenge。

## What to Submit

使用 [Learning Record Template](../../../docs/LEARNING-RECORD-TEMPLATE.md)，列出 Manual Display、API Value、PDU Address、Actual Bytes 和最终含义。

## If You Are Stuck

先确认 RS-485 和 Frame 已经正确，再检查站号、功能码、PDU 地址和手册映射。

## Ready to Continue

能够把物理层、协议层和数据语义分开后，再进入 Stage 03 Mixed Challenge。

> 学习路径：[Stage 03 — Peripheral Engineer](../../../02-Learning-Path/Stage-03-Peripheral-Engineer/README.md) · 知识支撑：[RS-485 与 Modbus RTU](../../../01-Knowledge-Base/Protocols/05-RS485-Modbus.md) · 互动实验：[Modbus RTU Frame Builder](../../../03-Interactive-Labs/Modbus-Frame-Builder/README.md)

## Mission Brief

上一关你已经证明：

```text
UART bytes
→ RS-485 A/B request
→ remote response waveform
→ received response bytes
```

物理链路是通的。

现在设备手册写：

```text
Holding Register 40001 — Device Temperature
```

你把程序起始地址直接填写成 `40001`，结果设备返回 `Illegal Data Address`，或者读到了完全不相关的数据。

这关训练一个长期高频问题：**文档里的“寄存器编号”不一定就是报文里真正发送的地址字段。**

---

## Before You Start

先区分四个东西：

```text
Manual display number
Software/API input value
Modbus PDU address field
Actual RTU bytes on wire
```

第一次认识：

- Slave Address：和哪台 Modbus 设备通信；
- Function Code：要执行什么操作，例如 FC03 读取 Holding Registers；
- PDU Address：Modbus 请求中的协议地址字段；
- Quantity：一次读取多少个寄存器；
- CRC：用于检测传输错误的校验值；
- Exception Response：从站理解了请求，但用异常码告诉主站“这个操作不能这样执行”。

---

## 1. Predict — `40001` 会不会真的变成 `9C 41`？

十进制 `40001` 转成十六进制约为 `0x9C41`。

先预测：如果你真的把 40001 直接塞进 16-bit 地址字段，请求帧里的两个 Address Byte 会是什么？

然后再问：

> 手册写“40001”，厂商真的想让报文发送 `0x9C41` 吗？

不要凭经验回答，必须去确认当前设备手册对地址的定义。

---

## 2. Visualize — 文档编号和 PDU 地址不是一回事

打开 Modbus Frame Builder。

分别使用：

```text
Protocol/PDU address = 0
```

和：

```text
Manual 4xxxx display number = 40001
```

观察工具展示的“常见映射示例”：

```text
40001 display label
→ protocol address 0
→ request bytes 00 00
```

注意：这是常见 Holding Register 编号习惯，不是所有厂商、所有软件都强制遵循的万能规则。

真正需要确认的是：

```text
manual convention
+ software/API convention
+ captured frame bytes
```

三者是否一致。

---

## 3. Observe — 先抓真正的请求帧

不要只看程序变量 `startAddress = ...`。

抓取实际 RTU 请求，例如：

```text
01 03 00 00 00 02 CRC_LO CRC_HI
```

逐字段解释：

```text
01      Slave
03      Function Code
00 00   Start Address
00 02   Quantity
CRC     Frame Check
```

只有抓到真实 bytes，你才知道软件最终到底发了什么。

---

## 4. Explain — 物理层正常以后还会有哪些协议问题

现在把两层分开：

```text
RS-485 physical layer
A/B waveform / direction / transceiver
```

与：

```text
Modbus protocol meaning
Slave / Function / Address / Quantity / CRC
```

如果请求和响应波形都存在、UART 也收到了完整 bytes，那么继续检查 DE/RE 通常已经不是最高价值动作。

调查重点应转到：

```text
Wrong slave?
Wrong function?
Wrong protocol address?
Wrong quantity?
Exception response?
Wrong data interpretation?
```

---

## 5. Exception Response — “设备回复错误”反而是好证据

例如从站返回 Modbus Exception，至少说明很多事情已经成立：

```text
request reached device
→ device recognized frame structure
→ device recognized slave/function context enough to respond
→ response returned through physical link
```

所以：

```text
Illegal Data Address
```

和：

```text
Timeout / no response
```

应该进入完全不同的调查方向。

---

## 6. Break It — 主动制造协议层故障

至少完成四项：

### Fault A — 把常见 40001 映射错误地当成 PDU 40001

抓真实 Address Byte。

### Fault B — Wrong Slave Address

比较“没人回应”与“有 Exception Response”是否相同。

### Fault C — Wrong Function Code

观察设备是否返回异常码。

### Fault D — Quantity 超出允许范围

确认错误来自地址/数量语义，而不是物理层。

### Fault E — 数据字节解释错误

即使寄存器地址正确，16/32-bit 字节顺序、缩放系数、Signed/Unsigned 等应用语义仍可能造成“值不对”。这里只建立意识，不在本关扩展成完整数据编码课程。

---

## 7. Debug — 建立 Modbus 分层决策树

面对“读不到正确寄存器”：

```text
No A/B request waveform?
→ go back to RS-485 physical layer

Request exists, no response waveform?
→ peer / direction / slave / physical conditions

Response exists, UART bytes valid?
→ parse Modbus

Exception response?
→ function/address/quantity semantics

Normal response but value wrong?
→ register mapping / byte order / scaling / data meaning
```

这比“把 40001、0、1、40000 都试一遍”更可复用。

---

## 8. Transfer — 从协议号走向设备语义

Stage 03 最后需要意识到：

```text
communication success
≠ data meaning correct
```

真正工程里还会遇到：

```text
register map
unit/scaling
signedness
word order
firmware version differences
```

这些都属于“设备数据契约”的一部分。

---

## 9. Mission Report

提交：

```text
Device / manual:
Slave address:
Function code:
Manual register label:
Software input value:
Actual PDU address bytes:
Request frame:
Response frame:
Exception code if any:
How the manual maps to protocol address:
One injected protocol fault:
Root cause:
Regression evidence:
```

## Achievement Unlocked

完成后，你应该能够明确区分：

```text
RS-485 line works
≠ Modbus frame is correct
≠ register address mapping is correct
≠ returned data meaning is correct
```

至此 Stage 03 的单外设主线完成，下一步进入 **Mixed Peripheral Debug Challenge**。
