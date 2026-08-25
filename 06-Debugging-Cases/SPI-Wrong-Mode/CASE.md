# Debugging Case — SPI Wrong Mode：Decoder 有数据，Device ID 为什么错了？

## Symptom

程序读取 SPI Flash 的 Device ID。

Datasheet 期望：

```text
0xA5
```

程序持续读到错误值。

逻辑分析仪确认：

```text
CS toggles
SCLK toggles
MOSI command exists
MISO also toggles
```

所以“没有波形”不是当前问题。

## Datasheet Requirement

器件要求：

```text
Clock idle: LOW
Device samples input on rising edge
Controller should sample response on rising edge
MSB first
CS LOW during whole command + response
Max SCLK: 10 MHz
```

这等价于常见的 Mode 0 timing contract。

## Measured Evidence

```text
CS: LOW during whole transaction
SCLK idle: LOW
SCLK frequency: 2 MHz
Controller changes MOSI near falling edge
Logic analyzer decoder: configured as Mode 1
MCU peripheral configuration: CPOL=0, CPHA=1
Bit order: MSB first
```

## Your Task

不要先改 Command Byte。

回答：

1. CS 是否首先值得怀疑？
2. Clock Frequency 是否超出器件能力？
3. CPOL 是否匹配？
4. CPHA / Sample Edge 是否匹配？
5. 为什么“逻辑分析仪能解出 Byte”仍不能证明 Mode 正确？

## Layer Classification

```text
Electrical activity
✓ CS / SCLK / MOSI / MISO exist

CS timing
✓ covers transaction

Clock frequency
✓ 2 MHz < 10 MHz

CPOL
✓ idle LOW

CPHA / sampling contract
✗ controller configured for the other edge

Bit order
✓ MSB first
```

高价值差异已经集中到 Sample Edge。

## Root Cause / Diagnosis

Controller 使用：

```text
CPOL=0
CPHA=1
```

而 Device 要求：

```text
CPOL=0
CPHA=0
```

Clock idle level 相同，但采样边沿不同。

因此：

```text
waveform exists
→ decoder can still produce bytes
→ device/controller may sample at wrong time
→ received ID is wrong
```

## Why the Decoder Can Mislead You

逻辑分析仪 Decoder 也需要你告诉它 Mode。

如果 Decoder 被设成和 MCU 一样的错误 Mode，它可能显示一个看起来稳定的 Byte，但这个 Byte 只是“按错误采样规则解释出的结果”。

真正确认需要：

```text
Datasheet timing diagram
vs
raw SCLK / MOSI / MISO edge relationship
```

## Minimal Fix

把 Controller timing 调整为 Device 要求的采样规则。

修复后不要只看“Device ID 对了”。还要重新验证：

```text
SCLK idle = LOW
sample edge = rising
bit order = MSB first
CS timing valid
SCLK within limit
Device ID = expected
```

## Regression

至少再读：

- Device ID；
- 一个 Status Register；
- 连续重复 100 次，确认不是偶然正确。

## Lesson

```text
SPI waveform present
≠ SPI timing contract correct
```

遇到错数据时，应优先比较 Datasheet timing 和真实 edge，而不是只依赖自动 Decoder。

## Learning Links

- [Stage 03 — Peripheral Engineer](../../02-Learning-Path/Stage-03-Peripheral-Engineer/README.md)
- [Mission 03 — SPI Wrong Data](../../04-Missions/Stage-03-Peripherals/03-SPI-Wrong-Data/Mission.md)
- [SPI Knowledge](../../01-Knowledge-Base/Protocols/03-SPI.md)
- [SPI Timing Playground](../../03-Interactive-Labs/SPI-Timing-Playground/README.md)

完成 Case 后，回到 Mission Report，再制造一次 Bit Order 或 CS Timing 错误，比较它与 CPHA 错误的证据差异。
