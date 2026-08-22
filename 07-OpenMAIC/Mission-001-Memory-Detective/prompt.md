# OpenMAIC Prompt — Mission 001 Memory Detective

请基于：

- `04-Missions/Mission-001-Memory-Detective/Mission.md`
- `01-Fundamentals/C/01-Data-Address-Memory.md`（V2.1 迁移期间临时源）
- `01-Fundamentals/C/02-Pointers-and-Hardware.md`（V2.1 迁移期间临时源）

生成一节面向零基础/初级嵌入式学习者的互动课堂。

## 教学目标

不要以“讲解 C 指针语法”为中心，而以这个工程问题为中心：

> CPU 如何通过地址找到数据，以及为什么 MCU 可以通过地址访问硬件寄存器？

## 建议时长

25～35 分钟。

## 课堂角色

### AI Teacher

负责建立准确概念模型，避免连续长篇讲解。

### Rookie Engineer

提出真实初学者误区，例如：

- “p 里面是不是保存了 value 的值？”
- “地址是不是每次都固定？”
- “C 语法没错为什么程序还会崩？”

### Debug Mentor

在故障挑战中只提供逐级提示，不直接公布答案。

## Slides

至少包含：

1. 虚拟内存地图；
2. `value` 所在内存格；
3. `p` 所在内存格；
4. 从 `p` 指向 `value` 的箭头；
5. 执行 `*p = 20` 前后的变化；
6. 从普通 RAM 地址过渡到 MCU Peripheral Address 的示意图。

避免一页出现大段文字。

## HTML Simulation

如果平台支持，请生成一个简单交互模拟器：

左侧显示伪内存：

```text
0x1000 | 10
0x1004 | 0x1000
```

右侧显示：

```text
value
&value
p
*p
```

提供按钮：

- `p = &value`
- `*p = 20`
- Reset

点击后高亮被读取/写入的地址，并用箭头表示指针访问过程。

第二阶段加入一个“危险地址”输入框，例如 `0x12345678`，让学习者判断是否应该访问，而不是实际执行危险内存访问。

## Quiz

优先使用预测题和迁移题，不要只考定义。

例如：

```c
int a = 5;
int *p = &a;
*p = 8;
```

执行后：

- `a` 是多少？
- `p` 保存什么？
- `*p` 是多少？

## 故障挑战

给出：

```c
int *p = (int *)0x12345678;
*p = 100;
```

要求学习者按照：

```text
现象 → 假设 → 风险 → 验证方法 → 结论
```

进行分析。

## 结束方式

只留下视觉链路：

```text
数据
 ↓
内存
 ↓
地址
 ↓
指针
 ↓
寄存器地址
 ↓
真实硬件
```

并预告下一关：

> Mission 002 — Bit Hacker：只想打开一个 LED，为什么其他灯全灭了？