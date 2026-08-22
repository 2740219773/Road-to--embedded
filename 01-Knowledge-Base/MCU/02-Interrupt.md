# Interrupt — CPU 为什么会停下手里的事？

轮询让 CPU 不断询问“事情发生了吗？”，中断则允许硬件在事件发生时通知 CPU。

```text
Main Flow
   ↓
Hardware Event
   ↓
Interrupt Pending
   ↓
CPU 保存必要现场
   ↓
ISR
   ↓
返回原执行流
```

## 核心问题

- 为什么需要中断？
- Interrupt Vector 是什么？
- Priority 有什么意义？
- ISR 为什么应该尽量短？
- 主流程与 ISR 共享数据为什么容易出问题？
- `volatile` 在这里解决什么、又不能解决什么？

## 互动形式

最适合用 CPU Timeline：让学习者拖动事件发生时间，观察主程序何时暂停、ISR 何时执行，以及两个中断同时发生时优先级如何影响顺序。

## 故障视角

典型现象：中断从不进入、不断进入、丢事件、主程序状态异常、优先级配置导致时序问题。

学习入口：`02-Learning-Path/Stage-02-MCU-Rookie/`。