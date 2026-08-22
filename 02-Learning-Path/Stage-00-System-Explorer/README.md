# Stage 00 — System Explorer

## Identity

你现在不是在学习某个芯片，而是在建立整个嵌入式世界的地图。

## Entry Requirements

无。

## Skills

完成本阶段后，应能够：

- 区分 MCU / MPU / SoC / FPGA；
- 解释 CPU / RAM / Flash / Register / Peripheral 的基本关系；
- 区分 Bare-metal / RTOS / Embedded Linux；
- 解释 C 源码到芯片运行的大致流程；
- 知道常见调试工具分别观察什么。

## Learning Sources

V2.1 迁移期间暂时参考：

- `01-Fundamentals/00-System-Map/01-MCU-MPU-SoC-FPGA.md`
- `01-Fundamentals/00-System-Map/02-CPU-RAM-Flash-Register.md`
- `01-Fundamentals/00-System-Map/03-Baremetal-RTOS-Linux.md`
- `01-Fundamentals/00-System-Map/04-From-C-to-Chip.md`

后续迁移到 `01-Knowledge-Base/System-Map/`。

## Boss

给出一块常见 MCU 开发板、芯片框图和一段最小 C 程序，能够解释：

```text
代码写在哪里
→ 怎么变成机器可执行内容
→ 怎么进入 Flash
→ CPU 如何开始执行
→ RAM 和寄存器在运行时分别做什么
```

## Exit Criteria

不要求记住所有术语细节，但遇到常见嵌入式讨论时，不再完全不知道对方在说系统的哪一层。