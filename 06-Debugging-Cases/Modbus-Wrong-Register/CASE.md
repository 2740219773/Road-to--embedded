# Debugging Case — Modbus 有响应，为什么还是读错寄存器？

## Symptom

主站与设备之间的 RS-485 请求和响应波形都正常，UART 也能收到完整响应。

设备手册写：

```text
Holding Register 40001 — Temperature
```

主站发送：

```text
01 03 9C 41 00 01 CRC...
```

从站返回 `Illegal Data Address`。

## Evidence Pack

```text
RS-485 request waveform: present
RS-485 response waveform: present
Slave address: 1
Function code: 03
Request address bytes: 9C 41
Manual label: 40001
Exception response: Illegal Data Address
```

## Your Task

1. 物理层是否已经有足够证据证明基本可用？
2. `9C 41` 是怎么来的？
3. 手册中的 40001 是否一定应该直接写入 PDU Address？
4. 下一步应该验证“收发器方向”还是“手册地址映射”？

## Root Cause / Diagnosis

主站把人类显示编号 `40001` 直接当成 Modbus PDU 的 16-bit 地址字段发送，因此实际请求地址变成了十六进制 `0x9C41`。

对于当前设备手册约定，Holding Register 40001 对应协议起始地址 `0x0000`。

正确请求应类似：

```text
01 03 00 00 00 01 CRC...
```

注意：`40001 → 0` 是常见约定，但不能把它当成所有厂商/软件都必然采用的规则。真正证据必须来自当前 Manual / API convention / captured bytes。

## Why the Exception Is Useful

从站已经返回结构化异常响应，这说明：

```text
request reached device
→ device decoded enough of the Modbus frame
→ response traveled back successfully
```

因此继续优先调查 A/B 有没有波形已经不是最高价值动作。

## Fix

明确记录三种地址：

```text
Manual display number: 40001
Software input value: 0 (for this API/device convention)
PDU address bytes: 00 00
```

并在代码/配置说明里注明转换规则，避免后续维护者再次把显示编号直接当协议地址。

## Regression

至少验证：

- 40001；
- 下一个连续寄存器；
- 一个明确不存在的寄存器；

确认抓到的 Request Bytes、响应类型和实际数据语义都符合手册。

## Lesson

```text
Manual register number
≠ software API value
≠ PDU address field
```

以及：

```text
communication works
≠ register mapping is correct
```

## Learning Links

- [Stage 03 — Peripheral Engineer](../../02-Learning-Path/Stage-03-Peripheral-Engineer/README.md)
- [Mission 08 — Modbus Wrong Register](../../04-Missions/Stage-03-Peripherals/08-Modbus-Wrong-Register/Mission.md)
- [RS-485 / Modbus Knowledge](../../01-Knowledge-Base/Protocols/05-RS485-Modbus.md)
- [Modbus RTU Frame Builder](../../03-Interactive-Labs/Modbus-Frame-Builder/README.md)
