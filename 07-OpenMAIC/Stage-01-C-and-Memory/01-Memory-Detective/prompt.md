# OpenMAIC Prompt — Stage 01 / Mission 01 Memory Detective

## Source manifest

- `status`: `prompt-only`
- `mission`: `04-Missions/Stage-01-C-and-Memory/01-Memory-Detective/Mission.md`
- `knowledge`: `01-Knowledge-Base/C/00-CSharp-to-C-Bridge.md`, `01-Knowledge-Base/C/01-Data-Address-Memory.md`, `01-Knowledge-Base/C/02-Pointers-and-Hardware.md`
- `lab`: `03-Interactive-Labs/Memory-Visualizer/index.html`
- `expectedScenes`: `slides`, `quiz`, `html-simulation`, `debug-challenge`, `review`

这个文件是课堂生成约束，不是已生成课堂。生成结果必须经过人工验收后，才可以从 `prompt-only` 变为已审阅状态。

请基于：

- `04-Missions/Stage-01-C-and-Memory/01-Memory-Detective/Mission.md`
- `01-Knowledge-Base/C/01-Data-Address-Memory.md`
- `01-Knowledge-Base/C/02-Pointers-and-Hardware.md`

生成一节面向零基础/初级嵌入式学习者的互动课堂。

## 生成约束

- 只把 Knowledge 当作技术事实源、Mission 当作任务和验收源、Lab 当作可操作实验源；不要复制整篇 Knowledge，也不要另造一套结论。
- 必须保留“先预测、再操作/观察、故意制造故障、用证据调试、迁移到寄存器”的闭环。
- 不得虚构真实 MCU、示波器、逻辑分析仪或其他硬件测量结果；没有真实证据时必须明确写成虚拟模型或静态推理。
- 每个生成场景都要能回指仓库中的 Mission 或 Lab；不相关的游戏化内容不能替代学习证据。
- 课堂验收至少包括：预测题有可核对答案，Memory Visualizer 可操作，故障挑战要求写出现象/假设/证据/结论，结束复习回到 Mission Exit Check。

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
