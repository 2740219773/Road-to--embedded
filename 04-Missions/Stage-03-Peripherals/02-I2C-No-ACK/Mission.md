# Mission 02 — I²C No ACK：地址明明对，为什么设备不回答？

> 学习路径：[Stage 03 — Peripheral Engineer](../../../02-Learning-Path/Stage-03-Peripheral-Engineer/README.md) · 知识支撑：[I²C](../../../01-Knowledge-Base/Protocols/02-I2C.md) · 互动实验：[I²C Bus Visualizer](../../../03-Interactive-Labs/I2C-Bus-Visualizer/README.md)

## Mission Brief

Datasheet 写着 EEPROM 的 Address 是：

```text
0x50
```

程序里也写了 `0x50`，但 MCU 始终得到 NACK。

很多人的第一反应是：

> “地址是不是写错了？”

这关要建立另一种调查顺序：

```text
Power / Ground
→ SDA / SCL Electrical Condition
→ START
→ Address Meaning
→ R/W Bit
→ ACK
→ Device State
→ Data / Register Meaning
```

也就是说，**NACK 是现象，不是根因。**

---

## Before You Start

第一次看到这些词时先建立最小概念：

- SDA：I²C Data 线；
- SCL：I²C Clock 线；
- Bus：多个设备共享的一组线路；
- 7-bit Address：设备在总线上的身份编号；
- R/W bit：这次事务是 Read 还是 Write；
- ACK：接收方确认当前字节；
- NACK：没有确认；
- Pull-up：把被释放的总线拉回 High 的上拉电阻；
- Open-Drain：节点主要主动拉 Low，而 High 依靠 Pull-up 形成。

先读：[I²C Knowledge](../../../01-Knowledge-Base/Protocols/02-I2C.md)

---

## 1. Predict — 先区分三个数字

假设 Datasheet 说：

```text
7-bit Address = 0x50
```

在不查答案前，算：

```text
Write Address Byte = ?
Read  Address Byte = ?
```

提示：

```text
Address Byte = (7-bit Address << 1) | R/W
```

然后回答：

1. `0x50`、`0xA0`、`0xA1` 是三个不同设备地址吗？
2. 如果一个 API 要求 7-bit Address，但你传入已经左移后的 `0xA0`，可能发生什么？
3. 如果 SDA / SCL 空闲电压只有 0.2 V，继续纠结 0x50 还是 0x51 有意义吗？

---

## 2. Visualize — 把 Address 和 ACK 分开

打开：[I²C Bus Visualizer](../../../03-Interactive-Labs/I2C-Bus-Visualizer/README.md)

先设置：

```text
Device Address = 0x50
Master Address = 0x50
Power = ON
Pull-up = ON
Write
```

观察：

```text
7-bit Address = 0x50
On-wire Address Byte = 0xA0
Address ACK = YES
```

然后依次只改一个变量：

### A — Wrong Address

```text
Master = 0x51
```

### B — Device Power Off

恢复地址，关闭 Power。

### C — No Pull-up

恢复 Power，关闭 Pull-up。

### D — Read Direction

恢复总线，只切换 Read。

观察 `0xA0` 为什么变成 `0xA1`，但 7-bit Device Address 仍然是 `0x50`。

---

## 3. Observe — 真机先看总线有没有“活着”

拿到真实板子后，不要第一步就扫描全部地址。

先测：

```text
Device VCC:
SDA idle voltage:
SCL idle voltage:
```

正常 I²C 总线在空闲时通常应看到 SDA / SCL 为 High。

如果两根线一直很低，先调查：

```text
Power
Pull-up
Short / stuck-low device
Pin mode
Wiring
```

而不是直接修改 Address。

---

## 4. Explain — Open-Drain 为什么改变了调试顺序

普通 Push-Pull 输出可以主动输出 High 或 Low。

I²C 常见 Open-Drain 思路更像：

```text
Node wants LOW
→ pull line down

Node wants HIGH
→ release line
→ Pull-up resistor restores HIGH
```

因此：

```text
No valid Pull-up
→ No reliable HIGH
→ No valid I²C waveform
```

这就是为什么协议分析之前先看电气层。

---

## 5. Build the Address Transaction

让 MCU 只进行一个最小事务，并用逻辑分析仪观察：

```text
START
→ Address bits
→ R/W
→ ACK / NACK
→ STOP
```

记录：

```text
Datasheet 7-bit Address:
API parameter passed:
On-wire Address Byte:
Direction:
ACK / NACK:
```

如果三者对不上，就先把地址语义理清楚。

---

## 6. Break It — 主动制造五类 No ACK

一次只破坏一个条件。

### Fault A — Wrong 7-bit Address

例如 `0x50 → 0x51`。

观察：总线电气是否仍然正常？Address Byte 是否改变？ACK 在哪里消失？

### Fault B — Wrong Address Format

模拟 API 需要 7-bit Address，但程序传入已左移后的形式，或者相反。

目标是理解“源码里看起来有 0x50”仍然不够，必须看线上真实 Address Byte。

### Fault C — Remove Pull-up

观察 SDA/SCL 空闲电平先变坏，协议分析为什么应该停止。

### Fault D — Device Power Off

总线可能仍能被 Master 拉出时序，但没有真正的 Device ACK。

### Fault E — Clock Too Fast / Device Not Ready

保持地址正确，让设备因时序或状态无法响应。

这一步用来证明：

```text
Correct Address
≠ Device must ACK
```

---

## 7. Debug — No ACK 的优先调查顺序

以后遇到 NACK，优先按：

```text
1. Device VCC / GND correct?
2. SDA / SCL idle HIGH?
3. Pull-up present?
4. Correct SDA / SCL pins and Alternate Function?
5. START really appears?
6. Datasheet 7-bit Address understood correctly?
7. On-wire Address Byte correct?
8. ACK bit present?
9. Device ready / timing / state correct?
```

如果第 2 步已经失败，就不要先研究第 7 步。

---

## 8. Debug Case — 先看物理层

进入：[I²C No ACK Debug Case](../../../06-Debugging-Cases/I2C-No-ACK/CASE.md)

Case 会给出：

```text
Device VCC = 3.3 V
SDA idle ≈ 0.2 V
SCL idle ≈ 0.1 V
No external pull-up populated
```

先判断这时最有价值的下一步是什么，而不是先猜地址。

---

## 9. Transfer — 下一关为什么是 SPI

I²C 第一次让你真正遇到：

```text
Shared Bus
Address
ACK
Open-Drain
Pull-up
```

下一关 SPI 会换一种完全不同的物理/时序模型：通常没有 Address/ACK，而是依赖 CS、Clock Edge、CPOL/CPHA 和 bit order。

你要继续保留同一个调查框架：

```text
Configuration
→ Pin / Bus
→ Waveform
→ External Device
→ Data Meaning
```

---

## Mission Report

提交：

```text
Board / MCU:
Target device:
Datasheet 7-bit address:
API address argument:
Observed on-wire address byte:
SDA idle voltage:
SCL idle voltage:
Pull-up location / value if known:
Address ACK observed?:
One Visualizer observation:
Three injected faults:
Evidence that separated them:
Root cause of one No ACK case:
Minimal fix:
Regression check:
```

---

## Achievement Unlocked

完成后，你应该不再把：

```text
NACK = 地址错
```

当成默认结论。

你已经建立：

```text
Electrical Bus
→ START
→ Address + R/W
→ ACK
→ Device State
→ Data
```

下一关：**Mission 03 — SPI Wrong Data**。