# Evidence Pack — UART / Clock

## Symptom

源码和 PC 都配置 115200，但测得 TX bit time 约 17.36 µs。

## Static / Host Evidence

```text
configured baud = 115200
host fixture model baud = 57600
expected bit time at 57600 ≈ 17.36 µs
```

这是模型输出，不是实际示波器测量。目标平台仍需检查 Clock Source、Peripheral Clock 和 Divider。

## Regression

修复 divider 后 Host 模型应返回 115200；目标平台需要重新测量约 8.68 µs bit time。
