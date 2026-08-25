# Stage 01 Exit Check — 你真的准备好进入 MCU 了吗？

Stage 01 的目标不是“学完 C 语言”，而是确认你已经能把最关键的底层概念连起来。

如果下面的问题大部分只能靠背答案，而不能自己解释，建议回到对应 Mission，而不是急着进入 STM32。

---

## Part A — Explain Without Code

用自己的话解释：

1. Variable、Memory、Address、Pointer 之间是什么关系？
2. `*p` 和 `&x` 分别在做什么？
3. 为什么 `reg = (1U << 5)` 和 `reg |= (1U << 5)` 行为不同？
4. `volatile` 为什么常出现在硬件寄存器和 ISR 共享状态附近？
5. 为什么 `volatile` 不等于线程安全？
6. `struct` 为什么可能出现 Padding？
7. `p->member` 底层在做什么？
8. Declaration 和 Definition 有什么区别？
9. `undefined reference` 更像 Compile 问题还是 Link 问题？为什么？
10. 一个 `.c` 文件放在工程目录里，为什么仍可能没有进入最终程序？

---

## Part B — Read This Expression

不要背结论，逐层解释：

```c
#define REG32(addr) (*(volatile uint32_t *)(addr))
REG32(0x40020014U) |= (1U << 5);
```

至少解释：

```text
0x40020014U
→ cast
→ uint32_t *
→ volatile
→ dereference
→ current register value
→ bit mask
→ read-modify-write
```

最后回答：这段代码为什么有可能最终改变一个真实 MCU 引脚？

---

## Part C — Debug Classification

看到下面现象，先分类而不是立刻修：

### Case 1

```text
Before: 0xA1
Set bit5
After: 0x20
```

最先检查哪类问题？

### Case 2

```text
undefined reference to `device_init`
```

最先检查哪一层？

### Case 3

某个状态变量被莫名改变，附近有数组写入。

最先观察什么证据？

### Case 4

`sizeof(Packet)` 与协议文档长度不一致。

最先想到哪些布局问题？

### Case 5

硬件/ISR 会改变一个 flag，但主循环观察行为异常。

应该想到什么关键词？同时还需要警惕什么误区？

---

## Part D — Build a Mental Map

不看资料，画出：

```text
C Source
↓
Compiler
↓
Object Files
↓
Linker
↓
Executable / ELF
↓
Memory
↓
Register
↓
Peripheral
↓
Pin
```

然后指出 Stage 01 已经学到哪里，Stage 02 会第一次真正补上哪些物理层内容。

---

## Passing Standard

不要求满分。

建议满足：

- Part A 至少 8/10 可以独立解释；
- Part B 能完整讲通，不靠背诵；
- Part C 至少能正确分类 4/5；
- 完成 Stage 01 Debug Challenge；
- 完成 Virtual GPIO Controller Boss；
- 至少留下 4 条自己的 Debug Evidence Record。

## Ready for Stage 02

当你看到：

```text
GPIOA->ODR |= (1U << 5)
```

不再觉得它是“STM32 神秘代码”，而能把它拆成 Pointer、Struct、Register、Bit、Memory 时，就可以进入 Stage 02。

下一阶段真正新增的是：

```text
真实 MCU
真实 Peripheral Clock
真实 Pin
真实 Voltage
真实 LED
Debugger / Multimeter / Oscilloscope
```

也就是说，Stage 02 不是推翻 Stage 01，而是把虚拟模型接到真实世界。
