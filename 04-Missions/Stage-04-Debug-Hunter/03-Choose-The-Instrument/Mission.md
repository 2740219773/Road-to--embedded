# Mission 03 — Choose the Instrument：这次该拿什么工具？

## Beginner Guide

- 适合：已完成 Who Wrote It 的学习者；
- 前置：Debugger、Memory View、万用表、示波器、逻辑分析仪和 Datasheet 的能力边界；
- 预计：60 分钟；
- 本关产出：故障现象到高价值测量的选择记录；
- 上一关：Who Wrote It；当前关：Choose the Instrument；下一关：Stage 04 Mixed Challenge。

## What to Submit

使用 [Learning Record Template](../../../docs/LEARNING-RECORD-TEMPLATE.md)，为每个故障写出假设、首选工具、测量对象、支持和排除结果。

## If You Are Stuck

先问“我要观察什么量、什么时间尺度、哪条结果能排除最多假设”，再选择工具。

## Ready to Continue

能够解释工具能回答什么、不能回答什么后，再进入 Stage 04 Mixed Challenge。

## Hook

同一个“通信失败”现象，可能来自 Clock、Peripheral、Pin、Electrical、Protocol 或 Peer。工具不是按“高级程度”选择，而是按当前假设需要什么证据选择。

## Mission Goal

面对陌生故障时，为第一步测量选择信息量最高的工具，并明确测量对象、预期结果、反驳条件和下一步。

## 导航

- Stage：[Stage 04 — Debug Hunter](../../../02-Learning-Path/Stage-04-Debug-Hunter/README.md)
- Knowledge：[Evidence-Driven Debugging](../../../01-Knowledge-Base/Debugging/01-Evidence-Driven-Debugging.md)、[Oscilloscope & Logic Analyzer](../../../01-Knowledge-Base/Debugging/05-Oscilloscope-Logic-Analyzer.md)、[Debugger Watchpoint](../../../01-Knowledge-Base/Debugging/04-Debugger-Watchpoint.md)
- Lab：[Debug Evidence Workbench](../../../03-Interactive-Labs/Debug-Evidence-Workbench/README.md)
- Boss：[Broken Firmware Investigation](../../../05-Projects/Intermediate/Stage-04-Boss-Broken-Firmware/PROJECT.md)

## Predict

在每个场景中先选工具，再展开 Evidence Pack：

| 场景 | 候选工具 |
|---|---|
| UART PC 端乱码，但 TX 有输出 | Debugger / Logic Analyzer / Oscilloscope / 万用表 |
| I²C 错误帧，SDA 上升沿很慢 | Debugger / Logic Analyzer / Oscilloscope / 万用表 |
| 变量偶发变成非法值 | Debugger / Watchpoint / Logic Analyzer |
| SPI 只在高频率下错误 | Logic Analyzer / Oscilloscope / Datasheet |
| 修改源码后板子行为不变 | Build Log / Flash Log / Debugger / 示波器 |
| 输出固定电平，怀疑 Pin 或供电 | Debugger / 万用表 / 示波器 / Datasheet |

先写出“我需要看到什么才会改变判断”。

## Explore / Observe

使用 Workbench 的 Instrument Selection 模式，比较工具能直接回答的问题、不能回答的问题和常见误判。每次选择后读取反馈，再更新假设。

## Action

为每个场景填写：

```text
Hypothesis
→ First Instrument
→ Measurement Object
→ Predicted Evidence if True
→ Evidence that Rejects It
→ Next Measurement
```

必须覆盖：UART Baud、I²C Idle Bus、SPI Sample Edge、ADC Reference、DMA Boundary、CAN ACK、RS-485 Direction、Modbus Address Meaning，以及 Build/Flash/Run provenance。

## Break It

故意把工具选错：用 Protocol Decoder 代替示波器判断慢上升沿，用 Debugger 代替测量 UART Bit Time，用万用表代替捕获短时序。写出这些选择为什么信息不足或可能误导。

## Debug with Evidence

将“软件证据”和“物理证据”分栏记录，禁止用源码配置替代 Pin 上的真实事实，也禁止用一次通过替代回归验证。

## Transfer / Boss

从四个场景中任选一个改写为陌生设备版本，并完成一份完整 Evidence Record。然后进入 [Broken Firmware Boss](../../../05-Projects/Intermediate/Stage-04-Boss-Broken-Firmware/PROJECT.md)，为五类故障选择第一条测量。

## Review / Exit

通过标准：每个场景都有首选工具、测量对象、支持/反驳证据；能解释为什么不立即改代码；能把工具选择迁移到未见过的系统层。完成后进入 [Stage 04 Exit Check](../../../02-Learning-Path/Stage-04-Debug-Hunter/EXIT-CHECK.md)。

## Achievement

不再把仪器当作截图工具，而是根据假设主动选择测量点、时间尺度、触发条件和需要验证的量。
