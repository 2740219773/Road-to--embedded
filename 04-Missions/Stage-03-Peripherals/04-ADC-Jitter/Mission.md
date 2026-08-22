# Mission — ADC 为什么一直抖？

## 故障现场

输入一个你认为稳定的电压，ADC 读数却在多个码值之间变化。

第一反应如果是“加平均滤波”，你可能只是隐藏了问题。

## Hypotheses

- 输入本身存在噪声；
- Vref/电源不稳定；
- Source Impedance 太高；
- Sampling Time 不合适；
- PCB/接地/数字开关噪声耦合；
- ADC 量化本身；
- 软件换算或数据处理错误。

## Investigation

1. 用万用表确认平均输入电压。
2. 用示波器观察输入与参考源噪声。
3. 改变 Sampling Time。
4. 改变 ADC Resolution 或采样速率。
5. 使用 ADC Sampling Simulator 区分量化步长和随机噪声。
6. 最后再评估平均、低通等数字处理是否合理。

## Boss

给出一组 ADC 数据、Vref、分辨率和示波器噪声幅度，判断波动是否可能仅由量化解释，并提出下一步测量方案。

## Achievement

不把所有 ADC 抖动都归结为“ADC 不准”，能够同时从模拟、电源、采样和软件四个方向分析。