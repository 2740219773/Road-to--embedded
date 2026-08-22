# Stage 01 — C & Memory Explorer

## 这一阶段为什么存在

你不需要先成为 C 语言专家。Stage 01 的目标是建立一条很重要的底层链路：

```text
C Code
→ Data
→ Memory
→ Address
→ Pointer
→ Bit / Register
→ Hardware
```

这一阶段主要在 PC 上完成，不要求先购买 MCU 开发板。

## Entry Requirements

只需要知道变量、if/for、函数这些最基本概念。遇到不认识的术语，可以先查 `01-Knowledge-Base/Glossary.md`。

## 当前 Mission Map

1. [Mission 01 — Memory Detective](../../04-Missions/Stage-01-C-and-Memory/01-Memory-Detective/Mission.md)
2. [Mission 02 — Bit Hacker](../../04-Missions/Stage-01-C-and-Memory/02-Bit-Hacker/Mission.md)
3. Volatile Mystery — planned for V2.2
4. Struct Explorer — planned for V2.2
5. Linker Detective — planned for V2.2

## 当前 Interactive Labs

- `03-Interactive-Labs/Memory-Visualizer/`
- `03-Interactive-Labs/Register-Playground/`

## Knowledge Scope

知识底稿已经迁入 `01-Knowledge-Base/C/`。学习过程中不要要求自己从头顺序读完；Mission 遇到概念时再进去查。

主要主题：数据/地址/内存、指针、位运算、结构体、`const/volatile/static`、函数指针、对象生命周期、编译与链接。

## Boss Project — Virtual GPIO Controller

不用真实 MCU，先用普通 C 模拟一个 GPIO 寄存器。

要求：使用位运算控制多个虚拟输出、拆分多文件工程、故意制造 `=` / `|=` 错误、制造并修复一次链接错误，最后逐层解释典型寄存器访问表达式。

## Exit Criteria

能够解释：

```c
#define REG32(addr) (*(volatile uint32_t *)(addr))
REG32(0x40020014U) |= (1U << 5);
```

重点不是背代码，而是能说明地址、指针、解引用、`volatile`、bit 和硬件寄存器之间的关系。

完成 Stage 01 后进入 `Stage-02-MCU-Rookie/`，第一次把这些概念连接到真实引脚和开发板。