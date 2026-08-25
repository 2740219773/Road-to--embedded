# Mission 00 — System Map：一段代码怎样变成真实动作？

## Beginner Guide

- 适合：第一次接触嵌入式的学习者；
- 前置：能阅读短文本；完全零基础者先完成 Programming Warmup；
- 预计：30 分钟；
- 本关产出：一张系统地图和一份预测记录；
- 上一关：无，这是主路线第一关；当前关：System Map；下一关：Stage 00 Exit Check。

## What to Submit

使用 [Learning Record Template](../../../docs/LEARNING-RECORD-TEMPLATE.md)，提交系统图、预测、观察和一次分层故障判断。

## If You Are Stuck

回到 Stage 00 的“必读” Knowledge，只查当前图中无法解释的节点，不要一次打开整个 Knowledge Base。

## Ready to Continue

能够解释代码、编译/链接、Flash、CPU、RAM/Register、外设和 Pin 的关系后，再进入 Stage 00 Exit Check。

> 学习路径：[Stage 00 — System Explorer](../../../02-Learning-Path/Stage-00-System-Explorer/README.md) · 术语入口：[Glossary](../../../01-Knowledge-Base/Glossary.md)

## Hook

你拿到一块开发板和一段看起来很短的 C 程序。程序是怎样从文件变成 Flash 里的指令，最后让 LED、传感器或电机发生变化的？

## Goal

完成后，你能用自己的话说明代码、工具链、CPU、Memory、Register、外设和真实设备之间的关系。

## Predict

在阅读知识页之前，先回答：

1. C 文件能不能直接被 MCU 执行？
2. 程序第一次上电时，CPU 从哪里取得指令？
3. LED 的亮灭更接近“变量变化”、 “寄存器变化”还是“物理输出变化”？

把答案和理由写下来，不要求一开始正确。

## Explore

按下面顺序阅读四篇必需知识：

1. [什么是嵌入式系统](../../../01-Knowledge-Base/System/01-What-Is-Embedded-System.md)
2. [计算机系统分层](../../../01-Knowledge-Base/System/02-Computer-System-Layers.md)
3. [嵌入式产品由什么组成](../../../01-Knowledge-Base/System/03-Embedded-Product-Anatomy.md)
4. [上位机与下位机](../../../01-Knowledge-Base/System/04-Upper-Lower-Computer.md)

遇到具体术语时，再查 [CPU、MCU、SoC 与 FPGA](../../../01-Knowledge-Base/System/05-CPU-MCU-SoC-FPGA.md) 或 [工具链地图](../../../01-Knowledge-Base/System/07-Toolchain-Map.md)，不需要一次读完全部 System Knowledge。

## Action

选择一个熟悉的设备或开发板，画出这条链：

```text
输入
→ 处理器
→ 程序/数据
→ 外设
→ 引脚或总线
→ 传感器/执行器
```

然后给每个节点标注它属于 PC、MCU、FPGA、软件、寄存器、引脚还是物理设备。

## Failure Drill

故意把“程序没有运行”和“程序运行但引脚没有输出”混成一个问题，再使用系统层和证据把它们拆开。

## Transfer

解释下面两个变化分别发生在哪一层：

- 上位机显示的温度数值不变；
- MCU 的 UART 引脚没有波形。

至少写出两个可能层级和一个下一步证据。

## Review

完成 [Stage 00 Exit Check](../../../02-Learning-Path/Stage-00-System-Explorer/EXIT-CHECK.md)。通过后再进入 [Stage 01 — C & Memory](../../../02-Learning-Path/Stage-01-C-and-Memory/README.md)。
