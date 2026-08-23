# Debugging Case — ADC Unstable Reference：输入没变，为什么 Code 整体漂？

## Symptom

一个稳定基准源接到 MCU ADC。

万用表持续测得：

```text
Vin ≈ 1.650 V
```

但 ADC 原始 Code 每隔一段时间会整体上移或下移。

## Evidence Pack

```text
ADC resolution: 12 bit
Nominal Vref assumption in software: 3.300 V
Multimeter Vin: 1.649–1.651 V
Oscilloscope Vin ripple: small, about a few mV p-p
Measured analog reference / VDDA:
  state A ≈ 3.30 V
  state B ≈ 3.20 V
Raw ADC mean:
  state A ≈ 2048
  state B ≈ 2112
```

## Your Task

在看 Diagnosis 前回答：

1. Vin 的变化足以解释约 64 codes 的整体偏移吗？
2. ADC 测的是绝对 Vin，还是 `Vin / Vref` 的比例？
3. Vref 从 3.30 V 降到 3.20 V 时，同一个 1.65 V 输入的 Code 应该向上还是向下？
4. 第一优先级应该是加平均滤波，还是调查 Reference / analog supply？

## Calculate

12-bit ADC：

```text
Max Code = 4095
```

状态 A：

```text
Code ≈ 1.65 / 3.30 × 4095
     ≈ 2048
```

状态 B：

```text
Code ≈ 1.65 / 3.20 × 4095
     ≈ 2112
```

这与观察到的整体漂移高度一致。

## Layer Classification

```text
Input source
✓ Vin nearly stable

Quantization
not enough to explain ~64-code shift

Reference / analog supply
✗ changes by about 100 mV

Raw ADC
moves consistently with Vref change

Software filter
not root cause
```

## Diagnosis

根因优先指向 Vref / analog supply 不稳定，而不是输入端随机噪声。

ADC 的理想关系：

```text
Code ∝ Vin / Vref
```

Vref 下降时，同一个 Vin 占满量程的比例变大，因此 Code 上升。

## Why Averaging Does Not Fix This

如果 Vref 在某一段时间稳定在错误的 3.20 V：

```text
average many samples
→ noise becomes smaller
→ mean still around the wrong ratio
```

平均只能让错误结果更稳定。

## Next Investigation

继续检查：

```text
analog supply source
→ decoupling
→ ground path
→ load / switching correlation
→ internal/external reference configuration
→ reference measurement point
```

如果漂移与 PWM、无线模块、显示刷新或大电流负载同步，应重点调查电源完整性和地回路。

## Regression Check

修复 Reference / supply 后：

1. 同时记录 Vin 和 Vref；
2. 连续采集一段 Raw Code；
3. 比较修复前后的 Mean / Min / Max；
4. 确认 Code 不再随系统负载状态整体漂移；
5. 最后再决定是否需要平均或数字滤波处理剩余随机噪声。

## Lesson

```text
Stable Vin
≠ Stable ADC Code
```

ADC 的参考电压是测量链的一部分。

## Learning Links

- [Stage 03 — Peripheral Engineer](../../02-Learning-Path/Stage-03-Peripheral-Engineer/README.md)
- [Mission 04 — ADC Jitter](../../04-Missions/Stage-03-Peripherals/04-ADC-Jitter/Mission.md)
- [ADC Knowledge](../../01-Knowledge-Base/MCU/06-ADC.md)
- [ADC Sampling Simulator](../../03-Interactive-Labs/ADC-Sampling-Simulator/README.md)

完成 Case 后，回到 Mission Report，比较“Vin noise”“Vref drift”“Sampling Time”三种异常各自最先变化的证据。