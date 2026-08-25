# ADC Sampling Simulator

## Beginner Start

- 第一次操作：保持 Vin、Vref、Resolution 和 Noise 默认，执行一批采样；
- 预期观察：Raw Code 集中在预期范围，并能看到采样统计；
- 观察不到：先恢复默认 Vref 和 Resolution，再检查输入值是否超范围；
- Mission Integration：对应 ADC Jitter 的 Vin / Vref / Sampling / Noise 证据。

浏览器直接打开 `index.html`。

## 它解决什么问题

ADC 读数抖动时，首先要区分几件完全不同的事：

```text
Input Voltage
Vref
Resolution / Quantization
Input Noise
Reference Noise
```

Simulator 可以分别改变：

- 输入电压 Vin；
- 参考电压 Vref；
- ADC Resolution；
- 输入噪声；
- Vref 噪声。

每次生成 64 个样本并显示：

- Ideal Code；
- 1 LSB 对应多少 mV；
- Mean / Min / Max；
- Peak-to-Peak Code Spread；
- 一组样本分布。

## 推荐实验

### Experiment A — Pure Quantization

```text
Vin = 1.650 V
Vref = 3.300 V
12 bit
Input Noise = 0
Vref Noise = 0
```

观察理想 Code 和 LSB。

### Experiment B — Same Voltage, More Resolution

保持 Vin/Vref 不变，把 8 bit 改成 12/16 bit。

重点：分辨率提高会减小理想 LSB，但不会自动消除真实硬件噪声。

### Experiment C — Input Noise

逐渐提高 Input Noise，观察 Code spread。

### Experiment D — Vref Noise

Input Noise 设为 0，只提高 Vref Noise。

即使 Vin 本身稳定，ADC Code 仍可能变化，因为 ADC 测的是 `Vin / Vref`。

## Simulator 的边界

真实 ADC 还受到：

- Source Impedance；
- Sampling Time；
- ADC input network；
- PCB layout / ground；
- digital switching noise；
- power integrity；
- ADC 本身的误差指标。

这些不能用一个通用假参数精确模拟，所以本工具只用于建立量化、Vin 噪声和 Vref 噪声的直觉。

## Navigation

- Stage：[Stage 03 — Peripheral Engineer](../../02-Learning-Path/Stage-03-Peripheral-Engineer/README.md)
- Mission：[ADC Jitter](../../04-Missions/Stage-03-Peripherals/04-ADC-Jitter/Mission.md)
- Knowledge：[ADC](../../01-Knowledge-Base/MCU/06-ADC.md)
- Debug Case：[ADC Unstable Reference](../../06-Debugging-Cases/ADC-Unstable-Reference/CASE.md)

核心目标：看到 ADC 抖动时，先问“模拟输入、参考源、量化和采样条件分别是什么”，而不是马上加平均滤波。
