# Stage 01 — C & Memory Explorer

## Identity

这一阶段要从“会写 C 语法”走向“理解代码如何访问内存和硬件”。

## Entry Requirements

- 基本变量、if/for/函数概念；
- 不要求有 MCU 开发板。

## Mission Map

1. [Mission 001 — Memory Detective](../../04-Missions/Mission-001-Memory-Detective/Mission.md)
2. Mission 002 — Bit Hacker（V2.2）
3. Mission 003 — Volatile Mystery（V2.2）
4. Mission 004 — Struct Explorer（V2.2）
5. Mission 005 — Linker Detective（V2.2）

## Interactive Labs

计划：

- Memory Visualizer；
- 32-bit Register Playground。

## Knowledge Scope

- 数据、地址、内存；
- 指针；
- 二进制/十六进制；
- 位运算；
- 数组、结构体；
- const / volatile / static；
- 函数指针；
- 多文件工程；
- 编译、链接与内存布局。

V2.1 迁移期间知识底稿仍位于 `01-Fundamentals/C/`，后续迁移到 `01-Knowledge-Base/C/`。

## Boss Project — Virtual GPIO Controller

不使用真实 MCU，先用普通 C 模拟 32 位 GPIO 寄存器。

要求：

- 使用位运算控制多个虚拟输出；
- 拆分多文件工程；
- 不直接暴露内部状态；
- 故意制造 `=` / `|=` 错误并定位；
- 制造一次链接错误并修复；
- 最后逐层解释典型寄存器访问表达式。

## Exit Criteria

能够解释：

```c
#define REG32(addr) (*(volatile uint32_t *)(addr))
REG32(0x40020014U) |= (1U << 5);
```

重点不是背代码，而是说明地址、指针、解引用、volatile、bit 和硬件之间的关系。