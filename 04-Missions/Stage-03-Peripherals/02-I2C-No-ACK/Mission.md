# Mission — I²C No ACK：地址明明对，为什么设备不回答？

> 学习路径：[Stage 03 — Peripheral Explorer](../../../02-Learning-Path/Stage-03-Peripheral-Explorer/README.md) · 知识支撑：[I²C](../../../01-Knowledge-Base/Protocols/02-I2C.md) · 互动实验：[I²C Bus Visualizer](../../../03-Interactive-Labs/I2C-Bus-Visualizer/README.md)

## 故障现场

Datasheet 写着设备地址是 `0x50`，程序也配置了 `0x50`，但 MCU 始终得到 NACK。

任务不是寻找一段新的 I²C 驱动，而是确认故障发生在哪一层。

## 分层假设

```text
Application / Address
↓
I2C Controller Configuration
↓
GPIO Alternate Function
↓
SDA / SCL Electrical Bus
↓
Device Power / State
```

## Investigation

1. 确认 7-bit 地址与 API 要求的地址格式。
2. 确认设备供电和 GND。
3. 测 SDA/SCL 空闲电平。
4. 确认 Pull-up 是否存在。
5. 用逻辑分析仪确认 START、Address、R/W 与 ACK bit。
6. 对照 Datasheet 确认设备是否需要上电延时或初始化。

## Break It

分别制造：拔掉上拉、设备断电、错误地址、SCL 过快。记录四种情况下波形和软件错误是否一样。

## Boss

只给出一张 SDA/SCL 波形，判断问题更像是“没有物理总线条件”还是“设备拒绝当前事务”，并说明判断依据。

## Achievement

看到 NACK 后不再只改地址，而是能够沿协议层、电气层和设备状态逐层取证。