# Debugging Case — I²C No ACK：地址还没资格被怀疑

## Symptom

软件扫描不到地址为 `0x50` 的 EEPROM。

程序不断报告 NACK。

## Evidence Pack

```text
Device VCC:      3.3 V
MCU I²C enabled: Yes
SDA idle:        about 0.2 V
SCL idle:        about 0.1 V
Board inspection:no external pull-up populated
```

## Your Task

在分析 Address、API 和 ACK 之前，先判断：

> 这条总线现在有没有形成合法 I²C HIGH 电平的能力？

回答：

1. 空闲 SDA / SCL 约 0.2 V / 0.1 V 正常吗？
2. I²C 常见 Open-Drain 结构为什么需要 Pull-up？
3. 现在最有价值的修复是换 Address、换驱动，还是先修总线电气条件？
4. 如果没有合法 HIGH/LOW，还值得继续解释逻辑分析仪里的 Address Byte 吗？

## Layer Classification

把证据放回系统：

```text
Firmware / Controller
✓ I²C enabled

Device power
✓ VCC present

Physical bus idle
✗ SDA/SCL cannot return HIGH

Protocol address
? not worth prioritizing yet
```

这时故障已经在协议分析之前暴露。

## Diagnosis

I²C 常见 Open-Drain 总线依靠 Pull-up 形成 High。

当前没有外部 Pull-up，SDA/SCL 空闲电平也明显异常，因此优先修复：

```text
SDA Pull-up
SCL Pull-up
→ verify idle HIGH
→ then retry START / Address / ACK
```

不要继续通过换地址碰运气。

## Regression Check

修复 Pull-up 后至少验证：

```text
1. SDA idle becomes valid HIGH
2. SCL idle becomes valid HIGH
3. START appears
4. On-wire address byte matches expected transaction
5. Address ACK is checked again
```

如果电气层恢复后仍然 NACK，这时才继续调查：

```text
7-bit Address
→ API address format
→ R/W bit
→ Device ready state
→ Timing
```

## Second-Level Question

假设 EEPROM Datasheet 给出：

```text
7-bit Address = 0x50
```

那么：

```text
Write Address Byte = 0xA0
Read  Address Byte = 0xA1
```

如果修复 Pull-up 后逻辑分析仪看到的 Address Byte 是 `0x40`，这说明问题已经从电气层转移到 Address / API 参数理解层。

## Lesson

```text
Protocol analysis requires a valid physical bus first.
```

没有有效 HIGH / LOW，就没有值得继续解释的 I²C 字节。

同时：

```text
NACK
≠ always wrong address
```

## Learning Links

- [Stage 03 — Peripheral Engineer](../../02-Learning-Path/Stage-03-Peripheral-Engineer/README.md)
- [Mission 02 — I²C No ACK](../../04-Missions/Stage-03-Peripherals/02-I2C-No-ACK/Mission.md)
- [I²C Knowledge](../../01-Knowledge-Base/Protocols/02-I2C.md)
- [I²C Bus Visualizer](../../03-Interactive-Labs/I2C-Bus-Visualizer/README.md)

完成 Case 后，回到 Mission Report，记录一条“物理层错误”和一条“Address 语义错误”，并说明你用什么证据区分它们。