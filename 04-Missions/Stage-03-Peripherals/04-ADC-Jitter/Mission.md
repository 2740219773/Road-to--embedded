# Mission 04 — ADC Jitter：读数一直抖，应该先滤波吗？

## Beginner Guide

- 适合：已完成 SPI Wrong Data 的学习者；
- 前置：Vin、Vref、Resolution、Sampling 和 Noise；
- 预计：75 分钟；
- 本关产出：输入电压、参考电压、Raw Code 和采样统计证据；
- 上一关：SPI Wrong Data；当前关：ADC Jitter；下一关：DMA No Transfer。

## What to Submit

使用 [Learning Record Template](../../../docs/LEARNING-RECORD-TEMPLATE.md)，记录 ADC 预测码值、采样结果、噪声来源和是否需要滤波的结论。

## If You Are Stuck

先检查 Vin、Vref 和采样时间，再决定是否滤波；不要把所有抖动都归因于软件。

## Ready to Continue

能够把模拟电压、采样过程和数字码联系起来后，再进入 DMA No Transfer。

> 学习路径：[Stage 03 — Peripheral Engineer](../../../02-Learning-Path/Stage-03-Peripheral-Engineer/README.md) · 知识支撑：[ADC](../../../01-Knowledge-Base/MCU/06-ADC.md) · 互动实验：[ADC Sampling Simulator](../../../03-Interactive-Labs/ADC-Sampling-Simulator/README.md)

## Mission Brief

你把一个“看起来很稳定”的 1.65 V 电压接到 ADC。

12-bit ADC 的读数却在：

```text
2038
2044
2051
2041
2048
...
```

第一反应很容易是：

```text
多采几次
→ 求平均
→ 数字稳定了
```

但这可能只是把问题藏起来。

这关真正要调查：

```text
Real Vin
→ Vref
→ Sampling condition
→ Quantization
→ Raw ADC Code
→ Software conversion
```

到底是哪一层在变化。

---

## Before You Start

第一次看到这些词，先建立最小概念：

- ADC：Analog-to-Digital Converter，把模拟电压转换成数字 Code；
- Vref：Reference Voltage，ADC 的参考电压；
- Resolution：分辨率，例如 12 bit；
- LSB：最低有效位；ADC 场景中可理解为一个理想 Code 对应的最小电压格子；
- Quantization：连续电压被映射成离散整数 Code；
- Sampling Time：ADC 内部前端接触输入、让采样节点建立的时间；
- Source Impedance：输入源驱动 ADC 采样网络时的等效阻抗。

先读：[ADC Knowledge](../../../01-Knowledge-Base/MCU/06-ADC.md)

---

## 1. Predict — 先算理想结果

假设：

```text
Vin = 1.650 V
Vref = 3.300 V
Resolution = 12 bit
```

计算：

```text
Max Code = 2^12 - 1 = 4095
Expected Code ≈ Vin / Vref × 4095
1 LSB ≈ Vref / 4095
```

先回答：

1. 理想 Code 大约是多少？
2. 1 LSB 大约等于多少 mV？
3. 如果 Code 只跳 1 个 LSB，它代表的电压变化有多大？
4. 如果读数跳 50 codes，还能轻易解释成“正常量化”吗？

---

## 2. Visualize — 把 Vin 和 Vref 分开

打开：[ADC Sampling Simulator](../../../03-Interactive-Labs/ADC-Sampling-Simulator/README.md)

### A — Pure Quantization

```text
Vin = 1.650 V
Vref = 3.300 V
12 bit
Input Noise = 0
Vref Noise = 0
```

观察 Ideal Code 和 1 LSB。

### B — Input Noise

只增加 Input Noise。

观察 64 samples 的 Min / Max / Peak-to-Peak。

### C — Vref Noise

Input Noise 恢复 0，只增加 Vref Noise。

解释：为什么 Vin 完全不变，Code 仍会变化？

### D — Resolution

保持同样的物理噪声，比较 8 / 12 / 16 bit。

注意：更高 Resolution 让每个 LSB 更小，所以同样的几 mV 噪声反而可能跨越更多 codes。

---

## 3. Observe — 真机同时测三个世界

不要只打印 ADC Code。

同时建立：

```text
Physical Voltage
→ ADC Raw Code
→ Software Converted Voltage
```

至少记录：

```text
Multimeter Vin:
Measured / known Vref or analog supply:
ADC resolution:
Raw 64 samples:
Min / Max / Mean:
Software converted voltage:
```

如果软件显示 1.72 V，但万用表是 1.65 V，先检查换算和 Vref 假设，不要先讨论滤波。

---

## 4. Explain — 为什么 Vref 变化会让 Code 变化

ADC 近似关系：

```text
Code ∝ Vin / Vref
```

因此：

```text
Vin stable
Vref moves
→ ratio moves
→ Code moves
```

这和万用表直接显示一个电压值的直觉不同。

所以 ADC 调试时，Reference 本身也是被测系统的一部分。

---

## 5. Sampling Time — 万用表正常，ADC 为什么仍可能偏？

万用表输入通常非常高阻，对被测源影响较小。

ADC 内部采样网络在采样窗口内要从信号源获取电荷。

如果：

```text
Source Impedance high
+
Sampling Time too short
```

内部采样节点可能没有充分建立到真实 Vin。

### 实验

保持同一个输入源，只改变 ADC Sampling Time。

记录：

```text
Short sampling raw mean:
Long sampling raw mean:
Code spread:
```

如果平均 Code 随 Sampling Time 明显变化，这比“再加一层平均”更值得调查。

具体可接受 Source Impedance 和 Sampling Time 必须查目标 MCU Datasheet。

---

## 6. Break It — 主动制造五类 ADC 异常

一次只改变一个条件。

### Fault A — Wrong Vref in Software

真实 Vref 不是 3.3 V，但换算代码硬编码 3.3 V。

Raw Code 可能完全合理，Converted Voltage 却错误。

### Fault B — Add Input Noise

给输入叠加可观察的小纹波，比较示波器波形与 Code spread。

### Fault C — Disturb Reference / Analog Supply

观察 Code 是否跟着变化。

### Fault D — Sampling Time Too Short

配合较高 Source Impedance，观察平均值是否偏移或更不稳定。

### Fault E — Digital Coupling

让 PWM / GPIO 高频开关与 ADC 采样同时发生，观察噪声是否与数字活动相关。

每个故障都要回答：

```text
Vin changed?
Vref changed?
Raw Code changed?
Converted Voltage changed?
Which evidence moved first?
```

---

## 7. Debug — ADC 抖动的调查顺序

以后看到 ADC 不稳定，按：

```text
1. Multimeter / oscilloscope says Vin = ?
2. Vref / analog supply = ?
3. Ideal Code should be ?
4. Raw spread = how many codes / LSB / mV?
5. Sampling Time suitable for source impedance?
6. Noise correlated with PWM / CPU / power switching?
7. Software conversion / buffer / channel correct?
8. Only then choose averaging / filtering
```

不要把“平均后好看了”当成根因已经解决。

---

## 8. Debug Case — 输入没变，Code 为什么整体漂？

进入：[ADC Unstable Reference Debug Case](../../../06-Debugging-Cases/ADC-Unstable-Reference/CASE.md)

Case 会给出稳定 Vin、变化的 Vref 和 ADC Code，让你判断“输入噪声”是不是最优先假设。

---

## 9. Transfer — 下一关为什么是 DMA

现在你已经能让 ADC 产生一串 Sample。

当采样速度提高、数据量变大时，新的问题出现：

```text
CPU 要不要每次亲自把 ADC Data Register 搬进 Buffer？
```

DMA 会负责“数据怎么搬”，但它不能解决“ADC 本身测得对不对”。

因此 Stage 03 故意先独立学 ADC，再学 DMA。

---

## Mission Report

提交：

```text
Board / MCU:
ADC channel / pin:
Input source:
Measured Vin:
Vref / analog supply:
Resolution:
1 LSB:
Expected Code:
64-sample Min / Max / Mean:
Sampling Time:
Source impedance information if known:
One Simulator observation:
Three injected faults:
Evidence separating Vin / Vref / sampling / software:
Root cause of one jitter case:
Minimal fix:
Regression check:
```

---

## Achievement Unlocked

完成后，你应该不再把：

```text
ADC code moves
=
ADC is inaccurate
```

当成默认结论。

你已经建立：

```text
Analog Input
→ Reference
→ Sampling
→ Quantization
→ Raw Code
→ Software Meaning
```

下一关：**Mission 05 — DMA No Transfer**。
