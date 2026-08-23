# Mission 03 — Timer Tick：为什么系统不能一直靠 delay 等时间？

## Mission Brief

你已经能点亮 LED，也能用按键触发事件。

现在需求变成：

```text
LED 每 500 ms 翻转一次
同时按键仍然要及时响应
```

最直接的写法可能是：

```c
while (1)
{
    led_toggle();
    delay_ms(500);
}
```

它看起来能工作，但 CPU 在这 500 ms 里究竟在做什么？如果系统同时还要处理按键、通信或其他任务，这种写法会带来什么问题？

本关第一次把“时间”从软件等待，交给 MCU 内部的 Timer（定时器）硬件管理。

---

## Before You Start

先读：[Timer & PWM](../../../01-Knowledge-Base/MCU/03-Timer-PWM.md)

只建立下面这个模型：

```text
Clock
→ Prescaler
→ Counter
→ Period reached
→ Timer Event / Interrupt
```

- Clock：硬件计时的基础节拍；
- Prescaler：把过快的输入时钟先分慢；
- Counter：硬件自动增加的计数器；
- Period：计数到哪里算一个周期；
- Timer Interrupt：Timer 到期后主动通知 CPU。

不同 MCU 的寄存器名字可能不同，但逻辑基本类似。

---

## Predict

假设 Timer 的计数频率是 1000 Hz，也就是每 1 ms 数一次。

如果希望每 500 ms 产生一次事件，Counter 需要经历大约多少个 Tick？

然后再回答：

> 如果 CPU 此时正在执行别的普通代码，Timer 硬件还会继续计数吗？

---

## Observe — 先证明 Timer 真的在工作

建立一个最小 Timer 周期事件：

```text
Timer Start
↓
Counter runs in hardware
↓
Period Event
↓
ISR / Callback
↓
tick_count++
```

这里的 Callback（回调）可以先理解成：平台库在硬件事件发生后帮你调用的一段处理函数；底层仍然对应 Timer 事件/中断链路。

用 Debugger 观察：

- Timer Counter 是否变化；
- Timer 是否 Enable；
- Update/Period Flag 是否出现；
- ISR 是否被执行；
- `tick_count` 是否按预期增长。

不要只因为 LED 在闪就认定 Timer 配置正确。

---

## Explain — Timer 和 delay 的根本区别

Blocking Delay 常见效果：

```text
CPU
→ enter delay
→ wait / spin
→ wait / spin
→ delay ends
→ continue
```

Timer 模型则更接近：

```text
Timer hardware counts independently
        ↓
CPU continues other work
        ↓
Timer event happens
        ↓
CPU handles event
```

注意：不同 delay 实现不完全相同，有些库内部也可能依赖系统 Tick；这里要理解的是“业务逻辑长时间阻塞等待”与“硬件计时 + 事件驱动”的系统差异。

---

## Build a Non-Blocking Blink

不要在主循环里直接等待 500 ms。

可以建立：

```text
Timer produces base tick
↓
software elapsed counter
↓
500 ms reached?
↓ yes
Toggle LED
```

同时让主循环继续读取或处理其他状态。

你的目标不是追求最漂亮的架构，而是第一次证明：

> 系统可以一边计时，一边做其他事情。

---

## Break It — 主动制造 Timer 故障

至少制造并记录：

### Fault A — Timer Clock 没有打开

预测：Counter 会怎样？ISR 会怎样？

### Fault B — Prescaler 错了

现象可能是：LED 在闪，但周期完全不对。

不要只改数字。先根据 Clock 和 Prescaler 计算预期 Tick Frequency，再用测量验证。

### Fault C — Period 设置错了

分辨这是“计数速度错了”，还是“每次需要数的 Tick 数量错了”。具体芯片里这个周期值可能放在名为 ARR、Period 或其他名称的寄存器/配置项中，不需要在本关死记寄存器名。

### Fault D — Interrupt 没 Enable

观察 Timer Counter 是否仍能计数，以及为什么“Timer 在运行”和“CPU 收到中断”是两件不同的事。

---

## Measurement — 不要用眼睛估时间

LED 看起来“一秒左右闪一次”不是可靠证据。

至少选择一种：

```text
GPIO Toggle + Oscilloscope
Logic Analyzer
Debugger event counter + external time reference
```

测量真实 Period/Frequency。

例如在 Timer Event 中翻转一个测试 Pin：

```text
Timer Event
→ Toggle Test Pin
→ Oscilloscope measures period
```

这会成为后面用示波器验证 PWM、UART 和其他时序的基础方法。

---

## Transfer — 为什么后面所有外设都需要时间模型

UART（串行通信）有 Baud Rate，PWM 有 Frequency，ADC（模数转换）有 Sampling Rate，RTOS（实时操作系统）有 Tick/Deadline，FPGA（可编程逻辑器件）有 Clock。

所以 Timer 这一关真正训练的不是某个 API，而是：

```text
Clock Source
→ Frequency
→ Division
→ Counter
→ Period
→ Observable Event
```

这是嵌入式系统最核心的时间思维之一。

---

## Mission Report

提交：

```text
Timer input clock:
Prescaler:
Counter frequency:
Period setting:
Expected event period:
Measured event period:
Evidence that Timer is counting:
Evidence that ISR is executing:
One blocking-delay problem I observed:
One injected fault and root cause:
```

## Achievement Unlocked

完成后，你应该能区分：

```text
Timer running
≠ Interrupt running
≠ LED looks right
≠ timing is actually correct
```

下一关：**Mission 04 — PWM Measurement**，让 Timer 不只是“到点通知 CPU”，而是直接让硬件持续产生可测量的波形。