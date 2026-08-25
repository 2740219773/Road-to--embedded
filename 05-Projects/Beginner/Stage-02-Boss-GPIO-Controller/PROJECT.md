# Stage 02 Boss Project — GPIO Control Node

## Navigation

- [Stage 02 — MCU Rookie](../../../02-Learning-Path/Stage-02-MCU-Rookie/README.md)
- [Mission 00 — First Contact](../../../04-Missions/Stage-02-MCU/00-First-Contact/Mission.md)
- [Mission 01 — First LED](../../../04-Missions/Stage-02-MCU/01-First-LED/Mission.md)
- [Mission 02 — Button Interrupt](../../../04-Missions/Stage-02-MCU/02-Button-Interrupt/Mission.md)
- [Mission 03 — Timer Tick](../../../04-Missions/Stage-02-MCU/03-Timer-Tick/Mission.md)
- [Mission 04 — PWM Measurement](../../../04-Missions/Stage-02-MCU/04-PWM-Measurement/Mission.md)
- [Stage 02 Debug Challenge](../../../06-Debugging-Cases/Stage-02-Mixed-Hardware-Failures/CASE.md)

## 项目目标

做一个最小但完整的真实 MCU 控制节点：Button 作为输入，LED/PWM 作为输出，Timer 提供时间基准；程序不能依赖长时间阻塞式 delay 完成核心行为。

这不是“再做一个点灯程序”，而是第一次把：

```text
Firmware
→ Debugger
→ GPIO Input/Output
→ Interrupt
→ Timer
→ PWM
→ Physical Voltage/Waveform
→ Evidence
```

放进同一个系统。

## Minimum System Behavior

至少实现：

- Button 改变设备工作状态；
- 至少两种 LED 模式，例如常亮 / 周期闪烁；
- Timer 驱动时间逻辑；
- 主要业务流程不使用长时间 Blocking Delay；
- 至少一个硬件 PWM 输出，并测量真实 Frequency / Duty；
- 能处理或明确解释按钮 Bounce；
- Debugger 可观察关键状态；
- 能从 Schematic 找到 LED/Button/PWM Pin；
- 提供一份完整故障定位记录。

## System Map

在写大量代码前，先画：

```text
Button Circuit
→ GPIO Input
→ Polling or Interrupt
→ Device State
→ Timer Time Base
→ LED / PWM Logic
→ GPIO / Timer Peripheral
→ Physical Pin
→ LED / Oscilloscope
```

并标记每一层用什么证据验证。

## Required Evidence

Boss 演示不能只说“现在能工作”。至少提供：

1. Breakpoint 或 Debugger 证据，证明当前 Firmware 正在运行；
2. GPIO Input/Output Register 观察；
3. 一个 Pin 静态电压测量；
4. 一个 Timer/PWM 波形测量；
5. Button Event / ISR 证据；
6. Schematic 中 Pin 与外部电路的对应关系。

## Required Failure Injection

至少主动制造并修复五项中的四项：

- GPIO Clock 未开；
- Pin Mode / Alternate Function 错误；
- LED 极性理解错误；
- Button Edge / Bounce 问题；
- Timer Prescaler / Period 错误；
- PWM channel 正常但输出 Pin 选择错误；
- 修改源码后没有真正 Flash 新 Firmware。

每个故障记录：

```text
Symptom
Expected
Layer
Hypothesis
Software Evidence
Hardware Evidence
Root Cause
Minimal Fix
Regression
```

## Acceptance

项目通过需要同时满足：

- 功能能运行；
- 能解释输入如何进入 MCU；
- 能解释 ISR / 主流程状态如何协作；
- 能解释 Timer 如何驱动非阻塞时间逻辑；
- 能计算并测量 PWM；
- 能解释寄存器如何最终影响真实 Pin；
- 能区分软件证据和物理证据；
- 至少四个故障有完整证据链；
- 修复后有回归验证。

## Final Demo

建议 8 分钟以内：

```text
1. 展示 Schematic / System Map
2. 证明 Firmware 正在运行
3. Button 改变状态
4. Timer 驱动 LED 行为
5. 示波器展示 PWM
6. 展示一次故障注入
7. 展示软件 + 硬件证据链
8. 说明怎样进入 Stage 03 外设学习
```

## 能力覆盖

C bit operations、GPIO、Clock、Interrupt/Polling、Timer、PWM、Debugger、Datasheet/Schematic、Multimeter/Oscilloscope、Evidence-driven Debugging。

完成 Boss 后进入 Stage 02 Exit Check，而不是直接跳到下一个外设。
