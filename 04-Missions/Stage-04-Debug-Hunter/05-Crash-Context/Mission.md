# Mission 05 — Crash Context：程序死在这里，真正的错误发生在哪里？

> 学习路径：[Stage 04 — Debug Hunter](../../../02-Learning-Path/Stage-04-Debug-Hunter/README.md) · Fault Model：[Cortex-M Fault Model](../../../01-Knowledge-Base/Debugging/02-Cortex-M-Fault-Model.md) · Memory：[Stack & Memory Corruption](../../../01-Knowledge-Base/Debugging/03-Stack-and-Memory-Corruption.md) · Case：[HardFault Bad Pointer](../../../06-Debugging-Cases/HardFault-Bad-Pointer/CASE.md)

## Mission Brief

MCU 突然进入：

```text
HardFault_Handler
```

最容易写出的结论是：

```text
Root Cause = HardFault
```

但这和说“汽车故障灯亮了，所以根因是故障灯”差不多。

这一关要训练：

```text
Exception / Crash Scene
→ reconstruct CPU context
→ locate failing instruction
→ identify accessed state/address
→ connect it to an earlier cause
```

---

## Before You Start

第一次认识：

- Exception：CPU 因某个事件暂时改变正常执行流程；
- HardFault：Cortex-M 上一种严重 Fault 入口，不是具体根因名称；
- PC（Program Counter）：CPU 当前/相关执行位置；
- LR（Link Register）：与函数返回或异常返回有关的重要寄存器；
- xPSR：保存部分 CPU 执行状态；
- Stacked Registers：进入异常时由硬件保存的一部分寄存器现场；
- Fault Status：CPU 对异常原因留下的状态信息，具体可用字段依 Cortex-M 型号；
- Fault Address：部分 Fault 会留下相关访问地址；
- Disassembly：把机器指令映射回来观察实际执行内容；
- Map/ELF Symbol：帮助把代码地址映射回函数/源码。

不同 Cortex-M 型号的 Fault 能力不完全相同，本关训练的是调查思路，不背某一型号所有寄存器。

---

## 1. Preserve — HardFault 后第一动作是什么？

假设 Debugger 已经停在 `HardFault_Handler`。

在 Reset 前列出需要保存的现场：

```text
Current exception
Stacked PC
Stacked LR
Stacked xPSR
Fault status registers
Fault address if valid
Current SP / stack region
Call Stack if trustworthy
Relevant memory / arguments
Firmware build / symbol file
```

然后说明：哪些信息 Reset 后可能消失。

---

## 2. Observe — Handler 地址不是失败指令地址

Debugger 当前 PC 可能指向：

```text
HardFault_Handler
```

但你真正想问：

> CPU 在进入异常前正在执行什么？

因此需要寻找异常保存的执行现场，例如 Stacked PC。

建立：

```text
Current Handler PC
≠
Faulting / interrupted code location
```

具体异常语义和指令位置需要结合 Cortex-M fault 类型及文档解释，不能盲目把任何 PC 值都叫“根因地址”。

---

## 3. Map Address Back to Code

拿到一个代码地址后，使用：

```text
Debugger source mapping
ELF symbols
Map file
Disassembly
```

回答：

```text
Which function?
Which instruction?
Which source line?
What operands / addresses?
```

例如看到：

```c
*config = value;
```

不要停在源码行。

继续问：

```text
config = what address?
Is that address legal / mapped / writable?
Where did config come from?
```

---

## 4. Case A — Null Pointer Write

```c
uint32_t *config = 0;
*config = 0x12345678;
```

调查链：

```text
HardFault
→ Stacked PC near store instruction
→ pointer value = 0
→ attempted write to invalid/unallowed target
```

真正 Root Cause 是错误 Pointer Contract，而不是 Handler 本身。

进入：[HardFault Bad Pointer Case](../../../06-Debugging-Cases/HardFault-Bad-Pointer/CASE.md)

先自己写 Investigation Record，再看 Diagnosis。

---

## 5. Case B — Crash Point 不是 Corruption Point

假设：

```text
t = 1 s   array overflow corrupts stack
 t = 5 s  program continues
 t = 8 s  function returns
 t = 8 s  invalid return context → Fault
```

此时 Stacked PC / return path 可以告诉你：

```text
where failure became visible
```

但真正 Root Cause 仍可能更早。

因此把证据分成：

```text
Crash Context Evidence
```

和：

```text
First Corruption Evidence
```

后者可能需要 Watchpoint、Stack Pattern、Guard、Memory snapshot 等方法。

---

## 6. Stack — 为什么 Call Stack 也可能不可信

如果 Stack 本身已经被破坏：

```text
saved LR / return address / frame data corrupted
```

Debugger 展示的 Call Stack 可能：

- 缺失；
- 跳到奇怪函数；
- 无法 unwind；
- 随运行变化。

所以 Call Stack 是证据，但不是永远可信的“真相源”。

需要结合：

```text
SP range
stack bounds
stack pattern
memory content
fault status
actual instructions
```

交叉验证。

---

## 7. Fault Status — 用状态缩小类别，不用状态替代根因

Fault Status 可能告诉你：

```text
memory/bus access issue?
undefined instruction?
invalid state?
precise/imprecise bus fault?
valid fault address available?
```

不同 Cortex-M 型号支持不同。

正确使用方式：

```text
Fault Status
→ narrow hypothesis category
→ inspect instruction/address/context
→ explain why program created that condition
```

而不是：

```text
status says BusFault
→ Root Cause = BusFault
```

---

## 8. Break It — 主动制造三个 Crash 类型

只在安全实验工程/仿真环境操作。

### Fault A — Invalid Pointer

目标：从 Fault Context 找到访问指令和目标地址。

### Fault B — Function Pointer / Return Context Problem

目标：观察 Control Flow 异常与普通 Data Fault 有什么不同。

### Fault C — Buffer / Stack Corruption

目标：证明最终 Crash 地址可能变化，而 Earlier Corruption 更稳定。

不要追求“制造越危险越好”，只需要可恢复、可解释的小实验。

---

## 9. Interrupt Storm — 没有 Crash 也可以用 Context 思维

进入：[Interrupt Storm Case](../../../06-Debugging-Cases/Interrupt-Storm/CASE.md)

现象：

```text
main loop almost disappears
CPU often observed in same ISR
```

同样问：

```text
Where is CPU spending time?
What status remains asserted?
What condition makes it re-enter?
```

Context Reconstruction 不只属于 HardFault，它本质是在回答：

> 系统现在为什么走到了这个状态？

---

## 10. Stack Overflow Case

进入：[Stack Overflow Case](../../../06-Debugging-Cases/Stack-Overflow/CASE.md)

注意这个 Case 已涉及 RTOS Task Stack，但 Stage 04 只使用它训练：

```text
visible crash location
≠ first corruption location
```

不在这里扩展 RTOS 调度课程。

---

## 11. Crash Investigation Record

标准记录：

```text
Crash / exception type:
Was scene preserved before reset?:
Current handler PC:
Stacked PC:
Stacked LR:
Fault status:
Fault address if valid:
Mapped instruction:
Relevant pointer/address/value:
Stack bounds / SP:
What this evidence proves:
What it does not prove:
Could earlier corruption explain this?:
Next measurement:
Root cause:
```

---

## 12. Transfer — 先问“最后现场”，再问“第一原因”

Crash 调查通常需要两次追踪：

```text
1. Last Scene
Where did execution finally fail?
```

```text
2. First Cause
What earlier state transition made that failure inevitable?
```

Stage 04 真正希望你掌握的是第二个问题。

---

## Achievement Unlocked

完成后：

```text
HardFault_Handler
```

不再是答案，而只是 Investigation Entry Point。

你应该能够从异常现场回到指令和地址，再继续追问更早的状态破坏。

下一关：**Mission 06 — Minimal Fix & Regression**。