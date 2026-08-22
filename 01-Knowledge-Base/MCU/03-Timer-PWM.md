# Timer & PWM — 让硬件自己精确数时间

## Timer 是什么

Timer（定时器）可以先理解成 MCU 芯片内部一个由硬件自动运行的“高速计数器”。

如果 MCU 的某个时钟每隔固定时间来一次，Timer 就可以跟着不断数：0、1、2、3……到达某个值后产生事件，再重新开始或继续计数。

```text
Clock Tick → Counter → Counter → Counter → Target reached → Event
```

它和简单的 `delay()` 最大区别是：Timer 是硬件模块自己计数，CPU 不需要一直停在那里“等时间过去”。

## PWM 是什么

PWM（Pulse Width Modulation，脉宽调制）是一种周期性输出高低电平的方法。

例如：

```text
50% Duty
HIGH ────    ────
        └────    └────
LOW
```

一个周期里，高电平占一半时间，就是约 50% Duty Cycle（占空比）。

PWM 常用于 LED 调光、电机控制、蜂鸣器、功率控制等场景。

可以把 Timer 想成节拍器，而 PWM 是按照这个节拍器不断执行“高一段时间、低一段时间”。

## 再认识正式结构

```text
Clock
↓
Prescaler（先把时钟变慢）
↓
Counter（计数）
↓
ARR / Period（决定数到哪里）
↓
Compare / CCR（决定什么时候切换输出）
↓
PWM / Event / Interrupt
```

不同 MCU 寄存器名称可能不同，但思想类似。

## 初学者先回答三个问题

1. Timer 一秒数多少次？
2. 数多少次算一个周期？
3. 一个周期里有多少时间输出 High？

能回答这三个问题，就已经建立了 Timer/PWM 的核心模型。

## 推荐互动

先进入 `03-Interactive-Labs/PWM-Visualizer/`，只调整 Frequency 和 Duty Cycle；建立波形直觉后，再学习 Prescaler、ARR、CCR 等具体参数。

## 真机验证

不要只通过“LED 看起来亮了一半”判断 PWM。用示波器真正测 Frequency、Period、High Time 和 Duty Cycle，再和程序配置比较。

频率不对时，再进入 Clock Tree、分频和计数模式调查。