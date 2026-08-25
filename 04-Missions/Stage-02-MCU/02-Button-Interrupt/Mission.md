# Mission 02 — Button Interrupt：按下按键，CPU 怎么知道？

## Beginner Guide

- 适合：已完成 First LED 的学习者；
- 前置：GPIO 输入、Pin 电压、Polling 和基本 Debugger 观察；
- 预计：60 分钟；
- 本关产出：Button → Pin → Interrupt → ISR 的证据记录；
- 上一关：First LED；当前关：Button Interrupt；下一关：Timer Tick。

## What to Submit

使用 [Learning Record Template](../../../docs/LEARNING-RECORD-TEMPLATE.md)，记录输入电平、Edge、Pending、ISR 和 Bounce 证据。

## If You Are Stuck

先不用中断，只证明 Button Pin 的电平真的会变化，再继续检查 Edge 和 ISR。

## Ready to Continue

能够区分物理输入变化、Pending Flag 和 ISR 命中后，再进入 Timer Tick。

> 学习路径：[Stage 02 — MCU Rookie](../../../02-Learning-Path/Stage-02-MCU-Rookie/README.md) · 知识支撑：[GPIO](../../../01-Knowledge-Base/MCU/01-GPIO.md) · [Interrupt](../../../01-Knowledge-Base/MCU/02-Interrupt.md) · [Debugger Basics](../../../01-Knowledge-Base/MCU/06-Debugger-Basics.md)

## Before You Start

如果这是第一次看到这些词：

- GPIO Input：把引脚当作输入，读取外部高/低电平；
- Polling：CPU 主动反复检查“事件发生了吗”；
- Interrupt：硬件事件主动通知 CPU；
- ISR：Interrupt Service Routine，中断发生后 CPU 临时执行的处理函数；
- Edge：电平从低到高或从高到低的变化瞬间；
- Pull-up / Pull-down：让没有外部驱动时的输入引脚拥有稳定默认电平。

本关目标不是记中断 API，而是把真实事件链看清楚。

---

## Mission Brief

开发板上有一个按键。

你的第一版程序使用 Polling：

```text
while (1)
{
    read_button();
    if (pressed)
        toggle_led();
}
```

它可以工作，但 CPU 必须不停询问按键状态。

现在你要让按键变化主动触发 CPU：

```text
Finger
↓
Button Circuit
↓
Pin Voltage
↓
GPIO Input
↓
External Interrupt Request
↓
CPU
↓
ISR
↓
Event Flag / Counter
↓
Main Program
```

---

## Predict

在动手前回答：

1. 如果按键没有按下，输入 Pin 应该稳定在 High 还是 Low？依据是什么？
2. 按下时是 Rising Edge 还是 Falling Edge？
3. 如果中断配置成了错误的 Edge，会发生什么？
4. 如果 Pin 电压确实变化，但 ISR 从来不进入，问题更可能在哪一层？

先根据原理图和电路连接做预测，不要先复制代码。

---

## Observe — 先不用中断

第一步只把 Pin 配成 Input。

通过 Debugger 或简单输出观察：

```text
Button released → GPIO input = ?
Button pressed  → GPIO input = ?
```

如果连输入状态都读不对，先不要进入中断。

你需要证明：

```text
Physical Button
→ Pin Voltage
→ GPIO Input Register
```

这条链已经成立。

---

## Explain — Polling 和 Interrupt 的区别

Polling：

```text
CPU: 按了吗？
CPU: 按了吗？
CPU: 按了吗？
CPU: 按了吗？
```

Interrupt：

```text
CPU: 做别的事
Button: 现在有事件
CPU: 暂停当前工作 → ISR → 返回
```

中断不是“更高级的 if”。真正变化的是谁主动发起检查。

---

## Build the Interrupt Chain

不要只看一个平台库里的外部中断 API 是否存在。

把真实链路拆开：

```text
Pin configured as input
↓
Correct external-interrupt source selected
↓
Correct edge selected
↓
Interrupt line enabled
↓
CPU interrupt controller enabled
↓
Event occurs
↓
Pending flag appears
↓
ISR executes
↓
Pending/source condition cleared or acknowledged
```

不同 MCU 的寄存器和命名会不同，但调查思路一致。

---

## Debug — ISR 到底进没进？

在 ISR 或对应回调入口设置 Breakpoint。

按一次按键。

记录：

```text
Pin voltage changed?        Yes / No
GPIO input changed?         Yes / No
Interrupt pending appeared? Yes / No
ISR breakpoint hit?         Yes / No
Event flag changed?         Yes / No
```

不要只写“中断不工作”。要说清楚信号在哪一层停止。

---

## Break It

依次只破坏一个条件：

1. 把 Rising Edge 改成 Falling Edge，或反过来；
2. 禁用对应 Interrupt Line；
3. 配错输入 Pin；
4. 去掉或改错 Pull-up / Pull-down 条件（仅在硬件允许且安全的情况下）；
5. 故意不正确处理中断 pending/source 条件，观察是否出现重复进入。

每次都记录“哪一层证据先变异常”。

---

## Button Bounce — 为什么按一次可能触发很多次

机械按键不是理想开关。

你手指只按了一次，但触点可能在极短时间里多次接触/断开：

```text
理想：  ____|‾‾‾‾‾
真实：  ____|_|‾|_|‾‾‾
```

这叫 Bounce（抖动）。

因此看到“按一次 ISR 进了 5 次”，不要马上认为中断控制器坏了。

先确认：

- Pin 波形是否真的有多个 Edge；
- 软件是否需要 Debounce（消抖）；
- 消抖应该放在哪里，而不是在 ISR 里长时间阻塞等待。

---

## ISR Design Rule

第一版 ISR 尽量只做：

```text
Capture event
→ update a small flag/counter
→ clear/ack source
→ return
```

不要把长时间 delay、复杂打印、大量业务逻辑都塞进 ISR。

以后进入 RTOS 后，会进一步学习 ISR → Task 协作。

---

## Transfer — 连接回 Stage 01 的 volatile

如果 ISR 修改：

```c
volatile uint8_t button_event;
```

主循环读取它，你应该能解释：

- 为什么它可能在主循环当前代码流之外变化；
- 为什么 `volatile` 可能需要；
- 为什么 `volatile` 仍然不等于 atomic / thread-safe。

这就是 Stage 01 的抽象概念第一次接到真实异步硬件事件。

---

## Mission Report

提交：

```text
Board / MCU:
Button pin:
Released voltage / logic:
Pressed voltage / logic:
Configured edge:
Polling evidence:
Interrupt pending evidence:
ISR breakpoint evidence:
Bounce observed? How verified?:
One injected fault:
Root cause:
Minimal fix:
What I keep out of ISR and why:
```

---

## Achievement Unlocked

完成后，你应该能把“按键触发中断”展开成：

```text
Mechanical event
→ Voltage
→ GPIO Input
→ Edge
→ Interrupt Request
→ CPU / ISR
→ Shared State
→ Main Program
```

下一关：**Mission 03 — Timer Tick**。让系统第一次不依赖手指，而由硬件时间源周期性地产生事件。
