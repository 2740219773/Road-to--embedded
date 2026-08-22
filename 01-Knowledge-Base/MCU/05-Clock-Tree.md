# Clock Tree — MCU 的时间从哪里来

MCU 中 CPU、Timer、UART、ADC 等模块的工作速度通常来自一套时钟树，而不是一个固定的“主频数字”。

```text
Clock Source
→ PLL / Divider / Mux
→ System Clock
→ Bus Clock
→ Peripheral Clock
```

## 核心问题

- HSI/HSE/Crystal/PLL 分别扮演什么角色？
- CPU Clock 与 Peripheral Clock 为什么可能不同？
- 为什么 Timer Clock 有时不是简单等于 APB Clock？
- UART Baud Rate、PWM Frequency 为什么都会受到 Clock 配置影响？

## 工程意义

很多“协议配置完全正确但实际频率不对”的问题，本质上来自错误的 Clock 假设。

## 推荐互动

Clock Tree Playground：选择 Source、PLL、Divider，实时显示 CPU/Bus/Timer/UART Clock，并把结果传给 PWM/UART Visualizer。

## 故障视角

频率异常时不要只检查外设参数。先确认真实时钟源、PLL Lock、分频链路以及代码认为的 SystemCoreClock 是否与硬件一致。