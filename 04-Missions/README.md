# Missions — 工程任务关卡

Mission 是 Road to Embedded 的核心学习单元。它从现象、故障或工程目标开始，而不是从知识定义开始。

标准节奏：

```text
Hook → Predict → Observe / Play → Build → Break It → Debug → Boss → Review
```

## 当前 Stage 结构

```text
Stage-01-C-and-Memory/
Stage-02-MCU/
Stage-03-Peripherals/
Stage-04-Debug-Hunter/
Stage-05-RTOS/
Stage-06-Embedded-Linux/
Stage-07-FPGA/
```

Stage 00 目前以系统地图和认知建立为主；Stage 08 目前保留系统集成路线骨架，还没有正式 Mission 资产。不要为了目录完整而创建空 Mission。

## 命名规则

统一使用：

```text
04-Missions/Stage-XX-Name/NN-Mission-Name/Mission.md
```

编号只在同一个 Stage 内排序，不使用全仓 `Mission-001` 这类第二套编号体系。

## Mission 必须连接什么

成熟 Mission 应尽量连接：

- Knowledge Base：技术事实和术语解释；
- Interactive Lab：需要可视化时使用；
- 真机/代码实验：让知识落到真实系统；
- Debugging Case：用于独立取证训练；
- Boss Project：阶段综合验收；
- OpenMAIC Source：只有适合课堂化时才建立，不要求每关都有。

不是每个 Mission 都必须同时拥有六种资源，但不能复制一份独立知识体系放在 Mission 中。

## P0 规则

当前暂停新增课程主题，只允许：修导航、补已有资产互链、修命名、修死链和提升新手可读性。