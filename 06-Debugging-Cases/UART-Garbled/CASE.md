# Debugging Case — UART Garbled：源码 115200，为什么波形只有 57600？

## Symptom

MCU 预期持续发送 ASCII `U`：

```text
'U' = 0x55
```

PC 串口工具持续收到乱码。

源码和 PC 看起来都配置成了：

```text
115200, 8N1
```

不要先改参数。先看证据。

## Evidence Pack

```text
PC configuration:        115200, 8N1
MCU source configuration:115200, 8N1
TX waveform bit time:    about 17.36 µs
TX voltage:              about 0–3.3 V
Firmware send code:      confirmed running
```

## Before Diagnosis

先独立回答：

1. `17.36 µs/bit` 对应的真实 Baud 大约是多少？
2. 如果源码写 115200，但 TX Pin 真实不是 115200，哪个证据优先级更高？
3. 0–3.3 V 的 TX 电压是否支持“先怀疑 RS-232 电平不兼容”这个假设？
4. 下一步最值得检查 UART 数据内容、PC 软件，还是 Peripheral Clock？为什么？

## Calculate

```text
Baud ≈ 1 / Bit Time
     ≈ 1 / 17.36 µs
     ≈ 57600 bit/s
```

真实 TX 速度接近目标值的一半。

## Evidence Classification

把当前证据放回系统层：

```text
Firmware
✓ send path reached

Configuration
? source says 115200

Physical TX waveform
✗ measured ≈ 57600

Voltage level
✓ looks like normal 3.3 V logic-level UART

PC receiver
configured as 115200
```

问题已经可以从“PC 为什么乱码”缩小到：

> MCU 为什么在目标配置为 115200 时，真实只产生约 57600 的 TX bit rate？

## Most Valuable Next Investigation

沿着：

```text
Clock Source
→ Bus / Peripheral Clock
→ UART Clock Input
→ Baud Divider / Timing Configuration
→ TX Bit Time
```

继续调查。

如果真实 UART Peripheral Clock 只有软件假设的一半，那么即使 Baud 配置字段本身没有写错，也可能生成约一半的真实 Baud。

## What Not to Do

不推荐：

```text
115200 不行
→ 试 57600
→ 能显示了
→ 宣布修复
```

这样只绕过了现象，并没有回答 MCU Clock 为什么和设计预期不一致。

真正修复后应重新验证：

```text
Expected Baud
≈ Calculated Baud
≈ Measured TX Baud
≈ Receiver Configuration
```

## Regression Check

修复 Clock / UART Timing 后：

1. 再次发送 `0x55`；
2. 示波器重新测 bit time；
3. 确认约为 `8.68 µs/bit`；
4. PC 保持 115200 / 8N1；
5. 确认连续数据稳定正确；
6. 再测试至少一个不同字节或短字符串。

## Lesson

```text
Source Configuration
≠ Physical Fact
```

对于串行通信，TX Pin 上真实发生的 bit time 是高价值证据。

## Learning Links

- [Stage 03 — Peripheral Engineer](../../02-Learning-Path/Stage-03-Peripheral-Engineer/README.md)
- [Mission 01 — UART Garbled](../../04-Missions/Stage-03-Peripherals/01-UART-Garbled/Mission.md)
- [UART Knowledge](../../01-Knowledge-Base/Protocols/01-UART.md)
- [Clock Tree](../../01-Knowledge-Base/MCU/05-Clock-Tree.md)
- [UART Frame Visualizer](../../03-Interactive-Labs/UART-Frame-Visualizer/README.md)

完成这个 Case 后，回到 Mission Report，用同样格式记录你自己制造的一次 UART 故障。