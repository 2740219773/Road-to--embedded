# Pointer & Hardware — 用一个地址找到另一个对象

## Pointer 到底是什么

Pointer（指针）首先仍然只是一个变量，只不过它保存的不是普通业务数据，而是另一个对象的 Address。

```c
int value = 10;
int *p = &value;
```

可以画成：

```text
value
Address 0x1000
Content 10

p
Address 0x2000
Content 0x1000
```

所以：

```text
value   = 10
&value  = 0x1000
p       = 0x1000
*p      = 10
```

## `*p` 为什么不是地址

`p` 本身保存地址。

`*p` 表示：按照 p 里保存的地址走过去，访问那个地址里的对象。

因此：

```c
*p = 20;
```

可以按步骤理解：

```text
读取 p
→ 得到 0x1000
→ 找到 0x1000
→ 修改那个位置里的内容
→ value 变成 20
```

这叫 Dereference（解引用）。第一次学习不必背英文，只需要能解释这个动作。

## 为什么要用 Pointer

Pointer 允许程序在不知道对象变量名、只知道地址的情况下访问对象。

这在很多场景都非常重要，例如：

- 函数修改调用者的数据；
- 遍历数组和 Buffer；
- 动态数据结构；
- Driver 操作 Memory；
- MCU 访问固定 Hardware Register Address。

## Pointer 为什么容易出错

语法正确不代表这个地址真的可以访问。

例如：

```c
int *p = (int *)0x12345678;
*p = 20;
```

Compiler 可能接受这种写法，但这个地址是否存在、是否对齐、是否允许当前程序访问，是另一回事。

所以嵌入式里看到 Pointer 问题时，要同时问：

```text
Pointer value 是多少？
这个 Address 属于什么 Memory？
访问长度是什么？
当前 CPU 是否允许访问？
```

## Pointer 怎样连到真实硬件

MCU 常把 Peripheral Register 映射到固定地址。

于是底层思想变成：

```text
Fixed Hardware Address
↓
Pointer
↓
Dereference
↓
Read / Write Register
↓
Peripheral State Changes
```

芯片厂商通常会用宏和结构体把这些地址包装起来，所以实际代码看起来没有这么裸，但底层模型仍然一样。

下一步进入 [Mission 01 — Memory Detective](../../04-Missions/Stage-01-C-and-Memory/01-Memory-Detective/Mission.md)，亲手观察 `value / &value / p / *p`。