# Mission 04 — PWM Measurement：LED 变暗了，就能证明 PWM 配对了吗？

## Mission Brief

你已经会让 Timer 周期性产生事件。

现在希望硬件自动输出一个周期波形：

```text
HIGH ──────      ──────
          └──────      └──────
LOW
```

这就是 PWM（Pulse Width Modulation，脉宽调制）最常见的形式之一。

本关不以“LED 看起来变暗了”为通过标准，而要真正测出：Frequency、Period、High Time、Duty Cycle。

---

## Before You Start

先读：[Timer & PWM](../../../01-Knowledge-Base/MCU/03-Timer-PWM.md)

第一次只需要理解：

```text
Timer Clock
↓
Counter
↓
Period decides waveform frequency
↓
Compare value decides high-time ratio
↓
PWM output pin
```

Duty Cycle（占空比）表示一个周期中 High 状态所占的比例。

例如 1 ms 周期里，高电平 0.25 ms：

```text
Duty = 0.25 / 1.00 = 25%
```

---

## Predict

在真正连接示波器前，先写下：

```text
Expected frequency:
Expected period:
Expected duty cycle:
Expected high time:
```

如果只知道“设置成 50%”，却说不出周期是多少，说明时间模型还没有真正连起来。

---

## Observe — 让仪器告诉你真实结果

将 PWM 输出 Pin 接到示波器或逻辑分析仪。

至少测量：

- Frequency；
- Period；
- High Time；
- Low Time；
- Duty Cycle；
- High/Low Voltage Level。

然后比较：

```text
Configured Value
vs
Calculated Value
vs
Measured Value
```

这三者应该形成证据链。

---

## Explain — 为什么 PWM 不需要 CPU 每个边沿都去翻转 Pin

软件 Toggle 模型：

```text
CPU decides HIGH
CPU waits
CPU decides LOW
CPU waits
...
```

硬件 PWM 模型：

```text
CPU configures Timer once
↓
Timer + Compare hardware keep generating waveform
↓
CPU can do other work
```

这就是“Peripheral Offload（外设卸载）”的最初体验：把规律、重复、时间敏感的动作交给专用硬件模块。

---

## Break It

至少制造以下三个故障。

### Fault A — Frequency 正确，Duty 错误

说明 Period 链可能正确，但 Compare value 相关设置需要调查。

### Fault B — Duty 看起来正确，Frequency 错误

优先检查 Clock、Prescaler、Period，而不是先改 Compare。

### Fault C — Timer 内部状态正确，但 Pin 没波形

检查：

```text
Timer
→ PWM channel enabled?
→ Pin Alternate Function?
→ Correct physical pin?
→ Oscilloscope probe ground/reference correct?
```

第一次认识 Alternate Function（复用功能）：很多 MCU Pin 不只可以当普通 GPIO，还可以切换给 Timer/UART/SPI 等外设控制。

示波器的 probe ground/reference 可以先理解成“测量时的电压参考地”；如果参考地没有正确连接，即使被测 Pin 有波形，也可能得到错误或无意义的结果。

---

## Change One Variable

保持 Frequency 不变，只修改 Duty：

```text
10%
25%
50%
75%
90%
```

每次都测量真实 High Time。

然后保持 Duty = 50%，只改变 Frequency。

这个实验训练一个很重要的习惯：**一次只改变一个主要变量。**

---

## LED Experiment

如果板上 PWM Pin 能驱动 LED，可以观察不同 Duty 下的亮度变化。

但请明确区分：

```text
Human visual perception
≠ Electrical measurement
```

LED 亮度只是现象；示波器波形才是你证明 PWM 配置的主要证据。

---

## Transfer

PWM 后面会连接到：

- LED dimming；
- Motor control；
- Servo pulse；
- Power electronics；
- DAC-like filtering；
- FPGA Counter/Compare logic。

这些应用现在只需要知道“PWM 会在后面反复出现”，不要求在 Stage 02 展开学习。

因此这里真正建立的是：

```text
Configuration
→ Hardware timing
→ Physical waveform
→ Instrument evidence
```

---

## Mission Report

提交：

```text
Timer clock:
Configured frequency:
Measured frequency:
Configured duty:
Measured duty:
Measured high/low voltage:
How Period controls frequency:
How Compare controls duty:
One failure where Timer was correct but Pin was wrong:
How I proved the fix:
```

## Achievement Unlocked

完成后，“PWM 正常”必须意味着你能给出真实 Frequency / Duty / Voltage 证据，而不是只说“LED 会变亮变暗”。

下一步：Stage 02 Mixed Debug Challenge。