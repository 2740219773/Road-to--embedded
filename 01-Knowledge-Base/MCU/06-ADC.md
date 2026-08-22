# ADC — 电压如何变成数字

ADC 把一定范围内的模拟输入映射为数字码值。

理想化模型：

```text
Analog Voltage → Sample → Quantize → Digital Code
```

## 核心问题

- Resolution 与可表示码值数量是什么关系？
- Reference Voltage 为什么决定换算尺度？
- Sampling Time 为什么不是越短越好？
- 输入阻抗、噪声、接地和参考源为什么会影响结果？
- ADC 读数抖动一定是软件问题吗？

## 推荐互动

ADC Sampling Simulator：拖动输入电压、Reference、Resolution 和 Noise，实时观察量化码值；改变 Sampling Rate，观察对变化信号的采样结果。

## 真机验证

用已知稳定电压源或电位器输入 ADC，同时使用万用表测真实电压，比较理论值和 ADC 结果。

## 故障视角

数值异常时同时检查软件配置、Pin Mode、Vref、采样时间、源阻抗、地线、噪声和换算公式。