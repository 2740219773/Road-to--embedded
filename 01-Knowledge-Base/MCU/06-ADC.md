# ADC — 模拟电压怎样变成数字码

## 先用一句人话理解

ADC 是 Analog-to-Digital Converter，中文叫模数转换器。

它做的事情不是“直接读出几伏”，而是把输入电压和参考电压比较，再把这个比例量化成一个整数 Code。

```text
Analog Voltage
↓
Sample
↓
Compare against Vref
↓
Quantize to N-bit code
↓
Digital Number
```

例如理想 12-bit ADC、Vref = 3.3 V、Vin = 1.65 V：

```text
Code ≈ Vin / Vref × (2^12 - 1)
     ≈ 2048
```

这条公式很重要，但更重要的是知道：真实系统里 Vin、Vref、采样过程都可能不是理想值。

## ADC 在系统哪里

Stage 03 前三关都在处理数字总线。

ADC 第一次把链路改成：

```text
Real Analog Source
→ ADC Pin
→ Sample/Hold front end
→ ADC Conversion
→ Digital Code
→ Software conversion / filtering
```

所以一个“ADC 数值抖动”的问题，可能来自：

```text
模拟信号
电源 / Vref
采样条件
ADC 前端
数字换算
```

不能只盯着 C 代码。

## Resolution 是什么

Resolution（分辨率）决定 ADC 一共有多少个数字等级。

例如：

```text
8 bit  → 256 levels
12 bit → 4096 levels
16 bit → 65536 levels
```

理想情况下：

```text
1 LSB ≈ Vref / (2^N - 1)
```

LSB（Least Significant Bit，最低有效位）在这里可以理解为“最小一个理想数字格子对应多少电压”。

Vref = 3.3 V、12 bit 时：

```text
1 LSB ≈ 3.3 / 4095
      ≈ 0.806 mV
```

因此输入变化小于一个量化格时，数字 Code 不一定能够连续反映它。

## Quantization 是什么

现实电压是连续的，而 ADC Code 是离散整数。

例如真实输入可能对应：

```text
2047.3 codes
```

但 ADC 最终只能给：

```text
2047 or 2048
```

这个离散化过程叫 Quantization（量化）。

所以最末一两位有变化，不一定意味着 ADC “坏了”。首先要比较这个变化对应多少 LSB、多少 mV。

## Vref 为什么和 Vin 一样重要

ADC 测的是比例：

```text
Vin / Vref
```

如果 Vin 很稳定，但 Vref 在变化：

```text
same Vin
÷ changing Vref
→ changing Code
```

因此：

```text
稳定输入
≠ 稳定 ADC Code
```

还必须看 Reference Voltage。

Vref 可能来自芯片电源、独立参考源或芯片内部参考结构，具体取决于 MCU。

## Sampling 是什么

ADC 不可能无限连续地观察输入。

通常会先在一个短时间窗口里让内部采样网络接触输入，再进行转换。

这一步叫 Sampling（采样）。

可以先想成：

```text
Input source
→ ADC internal sample capacitor/network
→ wait for it to settle close enough
→ convert
```

如果信号源阻抗很高、Sampling Time 太短，内部采样节点可能来不及接近真实输入电压。

因此：

```text
Sampling Time shorter
≠ always better
```

不同 MCU 的 ADC 前端、电容和推荐 Source Impedance 都不同，应该查 Datasheet，而不是死记一个通用数值。

## Source Impedance 是什么

Source Impedance（信号源阻抗）可以先理解成：输入信号向 ADC 提供电流、给内部采样网络充电时有多“费劲”。

低阻源通常更容易快速建立；高阻源可能需要更长 Sampling Time 或前级缓冲。

真实问题经常表现成：

- 连万用表看起来电压正常；
- ADC Code 却偏低或随着 Sampling Time 改变；
- 换低阻信号源后明显改善。

这类现象不能靠平均滤波解决。

## 为什么 ADC 会抖

至少区分：

### 1. Input Noise

输入电压本身真的在变化。

用 Oscilloscope 查看输入节点。

### 2. Vref / Power Noise

参考源或供电在变化。

ADC Code 会随比例变化。

### 3. Quantization

输入恰好位于两个 Code 边界附近，即使非常小的噪声也可能让最后一位来回跳。

### 4. Sampling / Source Impedance

Sampling Time 不够，结果可能偏差、随条件变化。

### 5. Ground / Layout / Digital Coupling

高频数字开关、电源纹波、接地路径会把噪声耦合进模拟测量。

### 6. Software Conversion

例如：

```text
整数除法截断
错误 Vref
错误 resolution/max-code
通道数据混淆
buffer index 错
```

也会让最终显示不对。

## 不要第一步就平均

平均可以降低某些随机噪声，但它也可能隐藏根因。

推荐顺序：

```text
Measure Vin
→ Measure / verify Vref
→ Calculate ideal Code
→ Compare raw ADC Code
→ Change Sampling Time / source condition
→ Inspect noise spectrum / switching correlation if needed
→ Then decide filtering
```

如果原始测量链本身错了，平均 1000 次只是得到一个“更稳定的错误答案”。

## ADC Sampling Simulator

进入：[ADC Sampling Simulator](../../03-Interactive-Labs/ADC-Sampling-Simulator/README.md)

它会让你分别改变：

```text
Vin
Vref
Resolution
Input Noise
Vref Noise
```

并观察 64 个样本的 Mean / Min / Max / Peak-to-Peak。

Simulator 不模拟某颗具体 MCU 的采样电容和 Source Impedance，因为不同芯片参数不同。真实 Sampling Time 问题必须回到 Datasheet 和真机实验。

## 真机最小实验

推荐使用一个稳定电位器或已知电压源：

```text
Voltage source
→ ADC Pin
```

记录：

```text
Multimeter Vin:
Vref / VDDA measurement:
Resolution:
Expected Code:
Raw 64 samples:
Min / Max / Mean:
Sampling Time setting:
```

然后只改变一个条件，例如 Sampling Time，再比较结果。

## ADC Jitter 调查顺序

```text
1. Vin really stable?
2. Vref / analog supply stable?
3. Expected code calculated correctly?
4. Raw code spread = how many LSB?
5. Sampling time suitable for source impedance?
6. Noise correlated with PWM/CPU/other switching?
7. Software conversion / buffer correct?
8. Only then choose averaging/filtering
```

## Learning Loop

- Stage：[Stage 03 — Peripheral Engineer](../../02-Learning-Path/Stage-03-Peripheral-Engineer/README.md)
- Mission：[ADC Jitter](../../04-Missions/Stage-03-Peripherals/04-ADC-Jitter/Mission.md)
- Interactive Lab：[ADC Sampling Simulator](../../03-Interactive-Labs/ADC-Sampling-Simulator/README.md)
- Debug Case：[ADC Unstable Reference](../../06-Debugging-Cases/ADC-Unstable-Reference/CASE.md)

完成后，你应该能把“ADC 抖”拆成模拟输入、Vref、量化、采样和软件处理几层，而不是统一归因于“ADC 不准”。