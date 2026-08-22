# Embedded C — 面向嵌入式的 C 语言主线

这一部分不是重新完整学习一遍 C 语言，而是围绕“读懂并编写 MCU 底层代码”建立能力。

## 学习顺序

1. [01 — 数据、地址与内存](01-Data-Address-Memory.md)
2. [02 — 指针与硬件访问](02-Pointers-and-Hardware.md)
3. [03 — 位运算与寄存器](03-Bitwise-and-Registers.md)
4. [04 — 数组、结构体与数据组织](04-Arrays-Structs.md)
5. [05 — const、volatile、static](05-Const-Volatile-Static.md)
6. [06 — 函数指针与回调](06-Function-Pointers.md)
7. [07 — 多文件工程、头文件与模块化](07-Multi-File-Project.md)
8. [08 — 编译、链接与内存布局](08-Compile-Link-Memory.md)
9. [09 — Phase 1 综合练习](09-Phase1-Practice.md)

## 学习方法

每一节都按四步完成：

**理解概念 → 在 PC 上写最小 C 程序 → 联系 MCU 场景 → 做一次故障/阅读练习。**

这一阶段暂时不要求拥有 STM32 开发板，大部分练习可直接使用 GCC、Visual Studio、VS Code 等环境完成。

## 完成标准

完成 Phase 1 后，应当能够解释并基本读懂下面这种嵌入式代码：

```c
#define REG32(addr) (*(volatile unsigned int *)(addr))

REG32(0x40020014U) |= (1U << 5);
```

重点不是背下这段代码，而是能够逐层解释：地址是什么、为什么转换成指针、为什么解引用、为什么需要 `volatile`、`1U << 5` 在修改什么。