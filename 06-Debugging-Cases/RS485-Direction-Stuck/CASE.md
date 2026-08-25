# Debugging Case — RS-485 请求发出后，为什么从站永远没机会回应？

## Symptom

主站 UART 发送正常，A/B 总线上也能看到请求波形，但请求结束后总线仍然被主站持续驱动，最终软件 Timeout。

## Evidence Pack

```text
UART TX bytes: correct
A/B request waveform: present
DE state after final byte: still active
Remote node power: normal
Remote node response attempt: not visible on bus
```

## Your Task

1. 这是 Modbus 地址错误最典型的证据吗？
2. 哪一层已经被证明正常？
3. 为什么远端即使想回应，也可能无法真正驱动总线？
4. 下一步最有价值的是抓协议字节，还是测 Direction timing？

## Root Cause / Diagnosis

主站发送后没有及时释放 RS-485 Driver。半双工总线仍被主站占用，因此远端没有正常的发送窗口。

真正故障链是：

```text
UART request complete
→ DE remains asserted
→ local transceiver keeps driving bus
→ remote cannot take bus
→ no response
→ application timeout
```

## Fix

按照实际 UART / Transceiver 机制，在最后一个字节真正完成物理发送后切换到接收状态。

注意：

```text
software TX buffer empty
```

不一定等于：

```text
last stop bit has physically left the TX pin
```

具体时机必须根据 MCU UART 状态标志、驱动方式和 Transceiver Datasheet 确认。

## Regression

修复后同时记录：

```text
UART last byte end
DE falling / driver release
Remote response start
A/B differential waveform
Received UART bytes
```

确认请求结束和远端响应之间存在合理 Turnaround Window。

## Lesson

```text
Modbus timeout
≠ Modbus protocol must be wrong
```

如果物理层方向控制没有释放，总线上甚至没有形成“让对端回应”的条件。

## Learning Links

- [Stage 03 — Peripheral Engineer](../../02-Learning-Path/Stage-03-Peripheral-Engineer/README.md)
- [Mission 07 — RS-485 No Reply](../../04-Missions/Stage-03-Peripherals/07-RS485-No-Reply/Mission.md)
- [RS-485 / Modbus Knowledge](../../01-Knowledge-Base/Protocols/05-RS485-Modbus.md)
- [RS-485 Half-Duplex Visualizer](../../03-Interactive-Labs/RS485-Half-Duplex-Visualizer/README.md)
