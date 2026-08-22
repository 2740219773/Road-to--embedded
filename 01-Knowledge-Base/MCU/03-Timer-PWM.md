# Timer & PWM — MCU 如何精确控制时间

Timer 的核心不是“延时函数”，而是由硬件按时钟自动计数。

```text
Clock → Prescaler → Counter → Compare/Overflow → Event/Interrupt/Output
```

PWM 则利用计数器和比较值周期性改变输出状态。

## 核心问题

- Timer Clock 从哪里来？
- Prescaler 和 Auto Reload 如何决定周期？
- Compare Value 如何决定 PWM Duty Cycle？
- 为什么 `delay()` 与硬件 Timer 的系统能力不同？

## 推荐互动

Timer/PWM Visualizer：调整 Clock、PSC、ARR、CCR，实时显示计数器、频率、周期、占空比和输出波形。

## 真机验证

不要只看 LED 亮度。使用示波器测量 Frequency、Period、High Time 和 Duty Cycle，再与计算结果比较。

## 故障视角

频率不对时优先检查 Clock Tree、分频、计数模式和单位换算；没有输出时检查 GPIO Alternate Function 与 Channel 配置。
