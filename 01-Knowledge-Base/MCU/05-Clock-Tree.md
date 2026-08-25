# Clock Tree — MCU 里的“时间”从哪里来

## 先用一句人话理解

MCU 里面的 CPU、UART、Timer、ADC 等模块都需要一个“节拍”才能工作。这个节拍来自 Clock（时钟）。

可以把 Clock 想成整个芯片里的节拍器：每来一次节拍，某些数字电路就向前推进一步。

但真实 MCU 往往不是“所有东西都听同一个固定节拍”，而是先从一个或多个时钟源出发，再经过倍频、分频和选择，最后送到不同模块。

这套路径就叫 Clock Tree（时钟树）。

```text
Clock Source
→ PLL / Divider / Mux
→ System Clock
→ Bus Clock
→ Peripheral Clock
```

## 第一次先认识几个词

- Clock Source：最开始的节拍来源，例如内部振荡器或外部晶振；
- Crystal：板上的外部晶体/晶振器件之一，用来提供较稳定的时钟来源；
- PLL：一种把输入时钟变成另一个更高或合适频率的时钟电路；
- Divider / Prescaler：分频，把时钟变慢；
- Mux：多选一，决定当前使用哪一路时钟；
- Peripheral Clock：真正送给 UART、Timer、ADC 等外设的时钟。

不同 MCU 会使用 HSI、HSE、APB、AHB 等具体名称。第一次看到时不要急着背缩写，先把它们放回“时钟从哪里来、经过哪里、最后给谁”的路径里。

## 为什么这件事很重要

例如 UART（串行通信外设）配置里写的是 115200，但 UART 实际收到的 Peripheral Clock 和程序以为的不一样，那么最终 TX 引脚上的真实 Baud Rate（每秒符号速率）就可能不是 115200。

同样地，PWM Frequency、Timer Period、ADC Sampling 等也都可能被时钟配置影响。

因此：

```text
外设参数写对了
≠ 真实时间一定对了
```

## 一个直觉例子

如果 Timer 每秒收到 1,000,000 个 Clock Tick，而你让它每数 1000 次产生一次事件，那么事件频率大约是 1000 Hz。

如果真实 Timer Clock 其实只有 500,000 Hz，即使计数参数完全没变，输出也会变成大约 500 Hz。

## 调试时怎么用这张图

遇到“频率刚好差一倍、十倍，或者整体都不对”时，不要只盯着 UART/Timer 的最后一个参数。沿着链路往上查：

```text
Source
→ PLL
→ Divider
→ Bus
→ Peripheral Clock
→ Peripheral Divider
→ Real waveform
```

最后用示波器、逻辑分析仪或已知输出反推真实频率。

## 互动说明

Clock Tree Playground 属于后续规划中的 Interactive Lab，目前尚未实现，因此本页只建立概念模型。

现阶段先结合 Stage 02 的 Timer Tick、PWM Measurement 和已实现的 PWM Visualizer 理解“时钟错误如何传递到最终周期和波形”；进入 Stage 03 后，再把同一套方法迁移到 UART、ADC 等更多外设。

学习入口：`02-Learning-Path/Stage-02-MCU-Rookie/README.md`。
