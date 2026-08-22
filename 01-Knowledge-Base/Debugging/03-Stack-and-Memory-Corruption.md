# Stack & Memory Corruption — 为什么错误发生在 A，程序却死在 B

内存破坏最麻烦的地方是：写坏内存的时刻与故障表现的时刻可能相距很远。

典型来源：数组越界、错误指针、buffer 长度错误、栈溢出、返回局部对象地址、错误 DMA destination/length。

## 调试思路

```text
Unexpected Value / Crash
→ Identify corrupted object/address
→ Find who can write there
→ Watchpoint / MPU / Guard / Stack Pattern
→ Reproduce
→ Catch first illegal write
```

## 关键认识

崩溃点不一定是根因点。例如函数 return 时 PC 异常，真正原因可能是更早的数组越界破坏了栈中的返回现场。

## 可用证据

Debugger Watchpoint、map file、stack high-water mark、RTOS stack checking、linker map、sanitizer（PC 侧可用时）、MPU、DMA register snapshot。

Stage 04 会通过故障案例训练“抓到第一次错误写入”，而不是只修复最后一次崩溃。