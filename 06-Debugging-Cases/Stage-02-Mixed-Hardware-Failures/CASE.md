# Stage 02 Debug Challenge — 软件、寄存器还是电路？

## Scenario

你拿到一块已经能烧录程序的 MCU 开发板。工程包含 LED、Button、External Interrupt、Timer 和 PWM，但现在同时存在多个故障。

这一关第一次要求你在“软件世界”和“物理世界”之间来回调查。

你不能只看源码，也不能只拿示波器乱测。

---

## Fault A — Debugger 能跑，LED 永远不亮

已知：

```text
Breakpoint can hit main()
Output register bit changes
LED does not light
```

你需要继续判断：

```text
GPIO Mode?
Physical Pin?
Pin Voltage?
LED polarity?
Board circuit?
```

目标：证明“程序执行正确”和“物理输出正确”不是同一件事。

---

## Fault B — 按一次按钮，计数增加很多次

现象：

```text
one physical press
→ several ISR entries
```

候选原因可能包括：Button Bounce、Interrupt Flag handling、错误 Edge 配置等。

要求：先测或观察输入变化，再决定去哪里改代码。

---

## Fault C — Timer ISR 在运行，但周期不对

已知：

```text
ISR counter increases
but 500 ms expected ≠ measured period
```

调查：

```text
Clock Source
→ Timer Clock
→ Prescaler
→ Counter Frequency
→ Period
→ Measured Event
```

禁止通过“不断试数字直到差不多”作为修复方法。

---

## Fault D — PWM 配置看起来正确，但输出 Pin 是固定电平

内部 Timer Counter 正常，Compare 值也合理，但示波器没有看到 PWM。

调查链：

```text
Timer enabled?
PWM channel enabled?
Alternate Function selected?
Correct Pin?
Probe/reference correct?
```

---

## Fault E — 修改代码后，板子行为完全没变化

不要直接判断源码没生效。

先重新验证：

```text
Did Build succeed?
Did new image Flash?
Did MCU Reset?
Can a new breakpoint prove this firmware is running?
```

把 Mission 00 的 Bring-up 证据重新拿出来。

---

## Investigation Record

每个 Fault 必须记录：

```text
Symptom:
Expected:
Layer:
Hypotheses:
Software evidence:
Hardware evidence:
Root cause:
Minimal fix:
Regression:
```

其中 `Layer` 至少从下面选一个：

```text
Build / Flash / Run
Clock
Peripheral configuration
Register
Pin mux / GPIO
Interrupt
Timing
Physical voltage / waveform
Board circuit
```

---

## Acceptance

这关真正考核的是：面对“硬件不工作”，你是否会先建立分层证据链，而不是把所有故障都叫成“程序问题”。

通过后进入 Stage 02 Boss — GPIO Control Node。