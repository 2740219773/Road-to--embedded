# ADC — MCU 怎么“测量电压”

## 先用一句人话理解

ADC 是 Analog-to-Digital Converter，中文叫模数转换器。它的作用是把现实世界里的模拟电压，转换成 MCU 能处理的数字。

例如一个电位器输出 0～3.3V，MCU 本身不能像万用表一样直接“理解 1.65V”，ADC 会把这个电压转换成一个数字码值。

```text
真实电压
1.65 V
  ↓
ADC
  ↓
数字值
例如 2048（12-bit ADC，理想情况附近）
```

可以把 ADC 想成一把电子尺子：Reference Voltage 决定尺子的总量程，Resolution 决定这把尺子一共被分成多少小格。

## Resolution 是什么

Resolution（分辨率）通常用 bit 表示。

例如 12-bit ADC 可以表示大约 `2^12 = 4096` 个等级，也就是从 0 到 4095。

如果量程是 0～3.3V，那么理想情况下每一个最小数字格代表大约：

```text
3.3 V / 4095
```

的电压变化。

## Reference Voltage 是什么

Reference Voltage（参考电压，Vref）告诉 ADC“满量程电压是多少”。

所以 ADC 的数字值不是凭空产生的，它一定是“输入电压相对于参考电压”的结果。

## Sampling 是什么

ADC 不是连续无穷快地看电压，而是在某个时刻把输入“取样”下来再转换。这个过程叫 Sampling（采样）。

Sampling Time 太短时，某些高阻信号可能还没来得及稳定；太长则会影响采样速度。因此它不是简单的“越短越好”。

## 为什么 ADC 数值会抖

真实世界不是理想公式。输入噪声、电源、Vref、接地、PCB 布线、信号源阻抗、数字开关干扰以及量化本身都会让读数变化。

所以看到 ADC 抖动，不要第一反应就是“加平均滤波”。先判断它为什么抖。

## 推荐互动

进入 `03-Interactive-Labs/ADC-Sampling-Simulator/`，改变 Input Voltage、Resolution 和 Noise，观察同一个模拟电压为什么可能对应不同数字结果。

## 第一次真机实验

用一个已知稳定电压或电位器接 ADC，引入万用表作为“现实世界参考”，同时比较：万用表电压、理论 ADC Code、MCU 实际 ADC Code。

这样就建立了“模拟世界 → ADC → 数字世界”的第一条链路。