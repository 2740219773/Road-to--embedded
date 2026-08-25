# Mission 04 — Struct Explorer：明明只有 6 字节，为什么 sizeof 可能更大？

## Beginner Guide

- 适合：已完成 Volatile Mystery 的学习者；
- 前置：变量、数组、内存地址和基本类型大小；
- 预计：45 分钟；
- 本关产出：一份 Struct 内存布局和 Padding 记录；
- 上一关：Volatile Mystery；当前关：Struct Explorer；下一关：Linker Detective。

## What to Submit

使用 [Learning Record Template](../../../docs/LEARNING-RECORD-TEMPLATE.md)，记录成员偏移、Padding、`sizeof` 和协议布局风险。

## If You Are Stuck

先分别写出每个成员的类型和预计大小，再使用 `sizeof` 和地址观察实际布局。

## Ready to Continue

能够解释 Struct Layout 为什么会影响寄存器块或协议数据后，再进入 Linker Detective。

## Mission Brief

你正在给一个小型采集设备定义数据结构：

```c
#include <stdint.h>

typedef struct {
    uint8_t  channel;
    uint32_t value;
    uint8_t  status;
} Sample;
```

你下意识地算：

```text
1 + 4 + 1 = 6 bytes
```

但在某些平台上运行：

```c
printf("%zu\n", sizeof(Sample));
```

结果却可能不是你心里想的那个数字。

任务不是记住某个平台的答案，而是调查：**结构体在内存里究竟是怎样摆放的？**

---

## 0. Before You Start

如果第一次看到这些词，先建立最小概念：

- `struct`：把相关变量组织成一个整体；
- Member：结构体内部的一个字段；
- Address：数据在内存里的位置；
- `sizeof`：询问一个类型/对象占多少字节；
- Alignment：数据在内存中常需要按照某些地址边界摆放；
- Padding：编译器为了满足布局规则插入的空字节；
- ABI：Application Binary Interface，可以先理解成“编译后的程序在数据布局、调用方式等方面遵守的一组二进制约定”。不同平台/工具链的 ABI 可能不同。

先读：[Struct / Enum / Typedef](../../../01-Knowledge-Base/C/05-Struct-Enum-Typedef.md)

---

## 1. Predict

在运行程序前，在纸上画：

```text
Sample
+0 ? channel
+? ? value
+? ? status
```

然后写下你的预测：

1. `sizeof(Sample)` 是多少？
2. 三个成员地址之间相差多少？
3. `value` 会不会紧跟在 `channel` 后面？

不要先查答案。

---

## 2. Observe

运行：

```c
#include <stdio.h>
#include <stdint.h>

typedef struct {
    uint8_t  channel;
    uint32_t value;
    uint8_t  status;
} Sample;

int main(void)
{
    Sample s = {1, 0x12345678, 2};

    printf("sizeof(Sample) = %zu\n", sizeof(Sample));
    printf("&s         = %p\n", (void *)&s);
    printf("&s.channel = %p\n", (void *)&s.channel);
    printf("&s.value   = %p\n", (void *)&s.value);
    printf("&s.status  = %p\n", (void *)&s.status);

    return 0;
}
```

记录真实结果。

注意：不同平台和 ABI 的结果可能不同。Mission 的目标是观察你当前环境的真实布局，而不是背一个固定数字。

---

## 3. Build the Memory Map

根据地址差值画出真实布局，例如：

```text
Sample base
│
├─ channel
├─ padding ?
├─ value
├─ status
└─ tail padding ?
```

现在回答：

> `struct` 是一个抽象语法，还是最终真的对应一段有布局的 Memory？

---

## 4. Change One Thing

把成员顺序改成：

```c
typedef struct {
    uint32_t value;
    uint8_t  channel;
    uint8_t  status;
} Sample;
```

再次运行。

比较：

- `sizeof` 有没有变化；
- 成员地址有没有变化；
- 仅仅改变字段顺序，为什么可能改变内存占用？

这一步开始建立一个重要工程直觉：**数据结构的写法会影响真实内存布局。**

---

## 5. Pointer View

增加：

```c
Sample *p = &s;
printf("%u\n", p->channel);
```

然后用自己的话解释：

```text
p
↓
保存 Sample 的地址
↓
p->channel
↓
通过地址找到结构体
↓
按照成员布局找到 channel
```

如果这条链解释不清楚，回到 Mission 01 Memory Detective。

---

## 6. Hardware Transfer

现在再看：

```c
GPIOA->ODR
```

不要把它当成神秘语法。

尝试用已经掌握的概念拆开：

```text
GPIOA
→ Pointer
→ 指向一组按照 struct 描述的寄存器
→ ODR 是其中一个 Member
→ Member Offset 对应硬件寄存器偏移
```

你现在已经开始理解为什么芯片头文件里到处都是结构体。

---

## 7. Break It

假设 PC 端程序直接把一个 C `struct` 的原始内存通过串口发出去，另一台不同架构的设备直接按同一个 struct 强制解析。

列出至少三个潜在风险。

提示方向：

- Padding；
- Alignment；
- Endianness；
- 类型宽度；
- 编译器/ABI 差异。

这里暂时不要求全部深入掌握，只要意识到：**内存布局不能想当然地当成通信协议。**

---

## 7.5 Debug with Evidence

现在假设接收端读出的 `channel` 和 `value` 都不对。不要直接修改结构体定义，先填写：

```text
Symptom:
Expected:
Hypotheses:
First high-value measurement:
Observed evidence:
Root cause:
Minimal fix:
Regression:
```

至少区分三种假设：Padding/Alignment、Endianness、发送长度或类型宽度错误。使用 `sizeof`、成员地址和实际字节序列作为证据，才能把“布局不同”与“传输范围错误”区分开。

---

## 8. Mission Report

提交一页调查记录：

```text
My prediction:
Observed sizeof:
Member addresses:
Where padding appeared:
What changed after reordering:
What p->member means:
Why GPIOA->ODR now makes more sense:
One protocol risk I discovered:
```

---

## Achievement Unlocked

完成后，你应该不再把 `struct` 理解成“把几个变量括起来”。

你已经建立：

```text
Struct
→ Member
→ Memory Layout
→ Address / Offset
→ Pointer
→ Hardware Register Block
```

下一关：[Mission 05 — Linker Detective](../05-Linker-Detective/Mission.md)。
