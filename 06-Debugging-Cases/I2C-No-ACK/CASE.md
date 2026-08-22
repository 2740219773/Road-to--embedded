# Debugging Case — I²C No ACK

## Symptom

软件扫描不到地址为 `0x50` 的 EEPROM。

## Evidence Pack

- Device VCC: 3.3 V
- MCU I2C enabled
- SDA idle: ~0.2 V
- SCL idle: ~0.1 V
- Board inspection: no external pull-up populated

## Your Task

在分析地址、驱动 API 和 ACK 之前，先判断这条总线是否具备形成合法 I²C HIGH 电平的条件。

## Diagnosis

I²C 常见 Open-Drain 总线需要上拉形成高电平。当前 SDA/SCL 空闲状态已经异常，优先修复物理层条件，而不是继续更换地址。

## Lesson

协议分析之前先确认电气层。没有有效 HIGH/LOW，就没有值得继续解释的 I²C 字节。

关联 Mission：`04-Missions/Stage-03-Peripherals/02-I2C-No-ACK/Mission.md`。