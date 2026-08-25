# Data / Address / Memory — 变量到底放在哪里

## 先用一句人话理解

程序里的数字、字符和状态不能凭空存在，它们最终都要放在某种 Memory（内存）里。

可以把 Memory 想成一排很多很多的小格子，每个格子都有自己的编号。这个编号就叫 Address（地址）。

```text
Address      Content
0x1000       10
0x1004       25
```

这里的 `0x1000` 不是数据 10 本身，而是“去哪里找这个数据”的位置编号。

## Variable 是什么

写：

```c
int value = 10;
```

初学时可以理解成：程序申请了一块能保存 `int` 的存储位置，把 10 放进去，再给这块位置起了名字 `value`。

所以可以先建立：

```text
value
→ 程序里的名字
→ 对应某块 Memory
→ Memory 有 Address
→ 里面保存 Data
```

## `&value` 是什么

C 里的 `&` 放在变量前面时，可以取得这个对象的地址：

```c
&value
```

如果 `value` 位于 `0x1000`，那么概念上：

```text
value   → 10
&value  → 0x1000
```

一个是内容，一个是位置，不要混在一起。

## 为什么地址对嵌入式特别重要

普通 PC 程序里，我们经常只关心变量名。

MCU 中还有另一种情况：芯片设计者会规定某些固定地址对应真实硬件控制单元。

这类方式叫 Memory-mapped I/O，可以先理解成：

```text
某个固定 Address
↓
不是普通变量
↓
而是一个 Hardware Register
↓
读/写这个地址
↓
真实外设状态可能改变
```

所以 Address 是 Pointer、Register、Debugger Memory Window 和外设控制之间的共同基础。

## 这一页先掌握四件事

1. Data 最终要存在 Memory 中；
2. Memory 中的位置由 Address 标识；
3. Variable 是程序给数据对象使用的名字；
4. `&variable` 可以取得这个对象的地址。

接下来不要继续背定义，进入 [Mission 01 — Memory Detective](../../04-Missions/Stage-01-C-and-Memory/01-Memory-Detective/Mission.md)，实际观察变量、地址和指针的关系。
