# Stage 01 — C & Memory Explorer

## 当前状态与适合谁

正式阶段。适合已经完成 Stage 00、会读变量/条件/循环/函数的学习者；C# 学习者通过 Bridge 把已有直觉迁移到 C 的内存模型。

## 学习环境与阶段产出

- 环境：普通 PC、已验证的 C 编译器、浏览器；先完成 [Beginner Setup](../../docs/BEGINNER-SETUP.md)，不要求开发板。
- 必做产出：五份 Mission Record、一份 Mixed Debug Record、Virtual GPIO Boss 和 Exit Check。
- 必须阅读：当前 Mission 的 Before You Start；其他 Knowledge 按需查询。
- 选读内容：完整 C Knowledge 目录用于复习，不作为线性教材。

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
→ Struct / Layout
→ Compile / Link
→ Hardware
```

这一阶段主要在 PC 上完成，不要求先购买 MCU 开发板。

## Entry Requirements

只需要知道变量、`if/for`、函数这些最基本概念。完全零基础者先完成 [C Basics Check](C-BASICS-CHECK.md)。C# 上位机开发者应先完成 [Mission 00 — C# → C → Embedded C Bridge](../../04-Missions/Stage-01-C-and-Memory/00-CSharp-to-C-Bridge/Mission.md)，把对象、数组和 API 的直觉迁移到 C 的内存、指针和寄存器模型。

第一次看到陌生词时，不要求马上记住定义。先看当前 Mission 的 `Before You Start`，必要时再查 `01-Knowledge-Base/Glossary.md`。

## 推荐学习方式

不要先把整个 C Knowledge Base 从头读完。

按这个顺序走：

```text
C Basics Check / C# Bridge
→ Mission 提出问题
→ 先预测
→ 只查当前需要的 Knowledge
→ 运行 / 互动观察
→ 自己解释
→ 故意制造问题
→ 用证据 Debug
→ 连接真实硬件场景
```

## Core Mission Map

0. [Mission 00 — C# → C → Embedded C Bridge](../../04-Missions/Stage-01-C-and-Memory/00-CSharp-to-C-Bridge/Mission.md)
1. [Mission 01 — Memory Detective](../../04-Missions/Stage-01-C-and-Memory/01-Memory-Detective/Mission.md)
2. [Mission 02 — Bit Hacker](../../04-Missions/Stage-01-C-and-Memory/02-Bit-Hacker/Mission.md)
3. [Mission 03 — Volatile Mystery](../../04-Missions/Stage-01-C-and-Memory/03-Volatile-Mystery/Mission.md)
4. [Mission 04 — Struct Explorer](../../04-Missions/Stage-01-C-and-Memory/04-Struct-Explorer/Mission.md)
5. [Mission 05 — Linker Detective](../../04-Missions/Stage-01-C-and-Memory/05-Linker-Detective/Mission.md)

六关是一条连续调查链；Mission 00 是进入底层内存模型前的迁移关：

```text
数据到底放哪？
→ 一个整数里的 bit 怎么控制多个状态？
→ 硬件/ISR 能不能在当前代码之外改变数据？
→ 一组数据在 Memory 里怎样形成真实布局？
→ 多个 Source File 最后怎样变成一个程序？
```

## Interactive Labs

当前 Stage 01 使用两个已有互动工具：

- `03-Interactive-Labs/Memory-Visualizer/`
- `03-Interactive-Labs/Register-Playground/`

V2.2 不追求 Lab 数量，而是验证这些互动是否真的帮助完成 Mission。

## Knowledge Scope

知识底稿位于 `01-Knowledge-Base/C/`。

核心主题：Data / Address / Memory、Pointer、Bitwise / Register、`volatile/const/static`、Struct / Layout、对象生命周期、Compilation / Linking。

## Standard Mission Rhythm

Stage 01 尽量统一为：

```text
Before You Start
→ Predict
→ Observe
→ Explain
→ Break It
→ Debug
→ Transfer
→ Mission Report
```

不同主题可以略有变化，但不能退化成“概念说明 + 答案”。

## 综合验证路径

完成五关之后还不能直接跳到 MCU：

1. [Stage 01 Debug Challenge — Five Clues, One Broken Program](../../06-Debugging-Cases/Stage-01-Mixed-Failures/CASE.md)
2. [Stage 01 Boss — Virtual GPIO Controller](../../05-Projects/Beginner/Stage-01-Boss-Virtual-GPIO/PROJECT.md)
3. [Stage 01 Exit Check](./EXIT-CHECK.md)

完整路径是：

```text
Mission 00 Bridge
↓
5 Core Missions
↓
Mixed Debug Challenge
↓
Virtual GPIO Boss
↓
Exit Check
↓
Stage 02 — MCU Rookie
```

## Boss Project — Virtual GPIO Controller

不用真实 MCU，使用普通 C 模拟一个 GPIO Register 和设备状态。

最终覆盖：

- bit 操作控制多个虚拟输出；
- Pointer / Address 访问虚拟 Register；
- `volatile` 表达外部状态变化；
- Struct 组织设备数据并观察 Memory Layout；
- Multi-file Project；
- Compile / Link；
- 主动 Failure Injection；
- Evidence-driven Debug Record。

## Exit Criteria

进入 Stage 02 前，至少能独立拆解：

```c
#define REG32(addr) (*(volatile uint32_t *)(addr))
REG32(0x40020014U) |= (1U << 5);
```

并解释：

```text
Address
→ Pointer Cast
→ volatile
→ Dereference
→ Register Value
→ Bit Mask
→ Read-Modify-Write
→ Future Physical Pin
```

如果只能背这句代码，而不能解释它，就继续回到对应 Mission。

通过 Exit Check 后进入 `Stage-02-MCU-Rookie/`，把这些虚拟模型第一次接到真实 MCU、Pin、Voltage 和仪器上。
