# Missions — 工程任务关卡

Mission 是 Road to Embedded 的核心学习单元。它从现象、故障或工程目标开始，而不是从知识定义开始。

## 推荐节奏

正式 Mission 尽量遵循：

```text
Mission Brief / Hook
→ Before You Start
→ Predict
→ Observe / Visualize
→ Explain
→ Break It
→ Debug with Evidence
→ Transfer
→ Mission Report
```

不同主题可以调整小节名称，但不应退化成“概念摘要 + API 示例”。

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

Stage 03 当前正式 Mission 为 01～08，并明确拆分：

```text
07 RS-485 Physical Layer
08 Modbus RTU Protocol Meaning
```

因为这两者属于不同系统层。

## Mission 必须连接什么

成熟 Mission 应尽量连接：

- Knowledge Base：技术事实和术语解释；
- Interactive Lab：需要可视化时使用；
- 真机/代码实验：让知识落到真实系统；
- Debugging Case：用于独立取证训练；
- Boss Project：阶段综合验收；
- OpenMAIC Source：只有适合课堂化时才建立，不要求每关都有。

不是每个 Mission 都必须同时拥有全部媒介，但不能复制一份独立知识体系放在 Mission 中。

## 当前建设规则

正式建设中的 Stage 采用“小闭环优先”：

```text
Beginner Knowledge
→ Mission
→ Interactive / Real Measurement
→ Failure Injection
→ Debug Case
→ Stage Navigation
```

单主题完成后还需要：

```text
Mixed Challenge
→ Boss
→ Exit Check
→ Quality Gate
```

当前 V2.3 Phase B 已进入 Stage 03 最终质量验收。Stage 04～08 现有 Mission 仍主要是 vertical-slice prototype，除必要导航修复外，不在 Phase B 提前扩写。