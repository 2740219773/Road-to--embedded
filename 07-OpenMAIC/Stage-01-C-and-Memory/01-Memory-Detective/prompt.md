# OpenMAIC Prompt — Stage 01 / Mission 01 Memory Detective

请基于：

- `04-Missions/Stage-01-C-and-Memory/01-Memory-Detective/Mission.md`
- `01-Knowledge-Base/C/01-Data-Address-Memory.md`
- `01-Knowledge-Base/C/02-Pointers-and-Hardware.md`

生成一节面向零基础/初级嵌入式学习者的互动课堂。

## 教学目标

不要以“讲解 C 指针语法”为中心，而以这个问题为中心：

> CPU 如何通过地址找到数据，以及为什么 MCU 最终可以通过地址访问硬件寄存器？

## 建议时长

25～35 分钟。

## 课堂角色

AI Teacher 负责建立准确概念模型，但避免连续长篇讲解；Rookie Engineer 提出真实新手误区；Debug Mentor 在故障挑战中只提供逐级提示。

## Slides

至少包含：虚拟内存地图、`value` 和 `p` 的内存格、指针箭头、执行 `*p = 20` 前后的变化，以及从 RAM 地址过渡到 MCU Peripheral Address 的示意图。

## HTML Simulation

优先复用仓库中的 `03-Interactive-Labs/Memory-Visualizer/`。如需平台内重建，应保持同样的概念模型：左侧伪内存、右侧表达式 `value / &value / p / *p`，操作时高亮被读取或写入的地址。

## Quiz

优先使用预测题和迁移题，不要只考定义。例如先预测：

```c
int a = 5;
int *p = &a;
*p = 8;
```

执行后 `a`、`p`、`*p` 各代表什么。

## 故障挑战

给出一个可能无效的地址访问，让学习者按照“现象 → 假设 → 风险 → 验证 → 结论”分析，而不是实际执行危险访问。

## 结束方式

只保留一条视觉链：

```text
数据 → 内存 → 地址 → 指针 → 寄存器地址 → 真实硬件
```

下一关：Stage 01 / Mission 02 — Bit Hacker。