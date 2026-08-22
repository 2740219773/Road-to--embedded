# Mission 001 — 内存侦探：CPU 到底去哪里找数据？

## Hook

你接手了一段“看起来完全正常”的程序：

```c
int value = 10;
int *p = &value;
*p = 20;
```

同事告诉你：

> `value` 明明没有被直接赋值成 20，但它最后却变成了 20。

你的任务不是背“指针定义”，而是调查这次数据变化到底是怎么发生的。

## Mission Goal

完成任务后，你应该能够回答：

1. 数据在计算机里存在哪里？
2. 地址和数据有什么区别？
3. 指针保存的到底是什么？
4. `*p = 20` 为什么能修改 `value`？
5. 这和 MCU 控制硬件有什么关系？

## Predict — 先猜

不要运行代码。

```c
int value = 10;
int *p = &value;
*p = 20;
```

预测：

- `value` 最后是多少？
- `p` 里面保存的是 10、20，还是别的东西？
- `&value` 是什么？

先写下答案，再继续。

## Explore — 打开“内存地图”

把它想象成：

```text
内存

地址          内容
0x1000       10       ← value
0x1004       0x1000   ← p
```

此时：

```text
value    = 10
&value   = 0x1000
p        = 0x1000
*p       = 10
```

现在执行：

```c
*p = 20;
```

不是修改 `p` 自己，而是：

```text
读取 p → 得到 0x1000
         ↓
找到地址 0x1000
         ↓
把这个位置的内容改成 20
```

于是：

```text
0x1000       20       ← value
0x1004       0x1000   ← p
```

## Action — 自己验证

```c
#include <stdio.h>

int main(void)
{
    int value = 10;
    int *p = &value;

    printf("value   = %d\n", value);
    printf("&value  = %p\n", (void *)&value);
    printf("p       = %p\n", (void *)p);
    printf("*p      = %d\n", *p);

    *p = 20;

    printf("after *p = 20, value = %d\n", value);

    return 0;
}
```

观察实际结果是否和预测一致。

## Break It — 故障注入

现在出现一个危险版本：

```c
int *p = (int *)0x12345678;
*p = 20;
```

先不要运行。

你是值班工程师，请判断：

A. 一定正常运行  
B. 只要 C 语法正确就没问题  
C. 这个地址可能无效，程序可能异常  
D. `20` 太大了

然后解释你的判断依据。

## Transfer — 真正进入嵌入式

芯片手册可能告诉你：

```text
某 GPIO 输出寄存器地址：0x40020014
```

于是底层 C 代码可能出现：

```c
*(volatile unsigned int *)0x40020014 = 0x20;
```

现在重新看它。

它表达的是：

```text
找到地址 0x40020014
        ↓
把它当作一个 32 位硬件寄存器
        ↓
访问这个位置
        ↓
写入 0x20
        ↓
硬件状态发生变化
```

## Boss Challenge

为什么嵌入式 C 语言中的“指针”比很多普通应用开发场景更重要？

尝试从“硬件本身也映射到地址空间”这个角度回答。

## Knowledge Links

V2.1 迁移期间暂时参考旧知识底稿：

- `01-Fundamentals/C/01-Data-Address-Memory.md`
- `01-Fundamentals/C/02-Pointers-and-Hardware.md`

迁移完成后将改为 `01-Knowledge-Base/C/` 下的新路径。

## Achievement / Exit Criteria

如果你可以不看资料解释下面四个表达式，就通过本关：

```c
value
&value
p
*p
```

并且能够说明：

> 指针是软件世界通向 MCU 地址空间和硬件寄存器的重要桥梁之一。

下一关：**Mission 002 — Bit Hacker：只想打开一个 LED，为什么其他灯全灭了？**