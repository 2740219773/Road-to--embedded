# Mission 01 — 内存侦探：CPU 到底去哪里找数据？

## Hook

你接手了一段“看起来完全正常”的程序：

```c
int value = 10;
int *p = &value;
*p = 20;
```

同事告诉你：`value` 明明没有被直接赋值成 20，但它最后却变成了 20。

你的任务不是背“指针定义”，而是调查这次数据变化到底是怎么发生的。

## Mission Goal

完成任务后，你应该能够回答：数据存在什么地方、地址和数据有什么区别、指针保存什么、`*p = 20` 为什么能修改 `value`，以及这些概念为什么最终会连接到 MCU 寄存器。

## Predict

先不要运行代码。预测 `value` 最后是多少、`p` 保存的是什么、`&value` 表示什么。

## Explore — 打开内存地图

```text
地址          内容
0x1000       10       ← value
0x1004       0x1000   ← p
```

于是：

```text
value    = 10
&value   = 0x1000
p        = 0x1000
*p       = 10
```

执行 `*p = 20` 的过程可以理解为：读取 p → 得到 0x1000 → 找到这个地址 → 把其中的数据改成 20。

## Interactive Lab

配套：`03-Interactive-Labs/Memory-Visualizer/`。

先在可视化里观察，再用普通 C 程序打印 `value`、`&value`、`p` 和 `*p` 验证。

## Break It

```c
int *p = (int *)0x12345678;
*p = 20;
```

语法可能成立，但这个地址不一定允许当前程序访问。思考为什么“语法正确”不能证明“内存访问正确”。

## Transfer — 进入 MCU

芯片手册可能规定某个 GPIO 寄存器位于固定地址。于是底层 C 会通过地址、指针和解引用访问硬件。

这就是：

```text
数据 → 内存 → 地址 → 指针 → 寄存器地址 → 真实硬件
```

## Knowledge

- `01-Knowledge-Base/C/01-Data-Address-Memory.md`
- `01-Knowledge-Base/C/02-Pointers-and-Hardware.md`

## Boss

不查资料解释 `value`、`&value`、`p`、`*p` 四者的区别，并解释为什么嵌入式开发中特别常见“通过地址访问对象”。

下一关：`02-Bit-Hacker/`。