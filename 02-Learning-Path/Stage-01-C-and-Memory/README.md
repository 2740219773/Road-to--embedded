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
→ volatile / Hardware State
→ Struct / Module
→ Compile / Link
→ Hardware
```

这一阶段主要在 PC 上完成，不要求先购买 MCU 开发板。

## Entry Requirements

只需要知道变量、if/for、函数这些最基本概念。遇到不认识的术语，可以先查 `01-Knowledge-Base/Glossary.md`。

## 当前 Mission Map

1. [Mission 01 — Memory Detective](../../04-Missions/Stage-01-C-and-Memory/01-Memory-Detective/Mission.md)
2. [Mission 02 — Bit Hacker](../../04-Missions/Stage-01-C-and-Memory/02-Bit-Hacker/Mission.md)
3. [Mission 03 — Volatile Mystery](../../04-Missions/Stage-01-C-and-Memory/03-Volatile-Mystery/Mission.md)
4. Struct Explorer — V2.2 next
5. Linker Detective — V2.2 next

## 当前 Interactive Labs

- `03-Interactive-Labs/Memory-Visualizer/`
- `03-Interactive-Labs/Register-Playground/`

V2.2 暂时不以增加 Lab 数量为目标。优先把现有互动工具真正嵌入 Mission 流程，验证学习闭环。

## Knowledge Scope

知识底稿位于 `01-Knowledge-Base/C/`。不要从第一页开始顺序背完整目录；Mission 遇到问题时再进入对应 Knowledge。

主要主题：数据/地址/内存、指针、位运算、`volatile/const/static`、结构体、函数指针、对象生命周期、编译与链接。

## V2.2 学习节奏

每关尽量遵循：

```text
Predict
→ Observe
→ Explain
→ Break It
→ Debug
→ Transfer
```

也就是先预测，再观察，再解释，然后故意把系统弄坏，通过证据修复，最后连接到下一层硬件场景。

## Boss Project — Virtual GPIO Controller

不用真实 MCU，先用普通 C 模拟一个 GPIO 寄存器和设备状态。

要求最终覆盖：

- 位运算控制多个虚拟输出；
- 指针/地址访问虚拟寄存器；
- 使用 `volatile` 表达外部状态变化；
- 使用 struct 组织设备状态；
- 拆分多文件工程；
- 故意制造 `=` / `|=` 错误；
- 制造并修复一次编译/链接错误；
- 留下一份证据驱动的 Debug 记录。

## Exit Criteria

能够解释：

```c
#define REG32(addr) (*(volatile uint32_t *)(addr))
REG32(0x40020014U) |= (1U << 5);
```

重点不是背代码，而是能说明地址、指针、解引用、`volatile`、bit 和硬件寄存器之间的关系。

完成 Stage 01 后进入 `Stage-02-MCU-Rookie/`，第一次把这些概念连接到真实引脚和开发板。
