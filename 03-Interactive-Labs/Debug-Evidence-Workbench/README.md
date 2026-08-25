# Debug Evidence Workbench

## Beginner Start

- 第一次操作：先进入 Fault Scene，选择一个故障并写下预测，再揭示 Evidence Pack；
- 预期观察：系统按现象、层级、证据和根因组织反馈；
- 观察不到：先确认选择了模式和故障，再一次只查看一条证据；
- Mission Integration：对应 Stage 04 Fault Scene、Who Wrote It 和 Choose the Instrument。

## Purpose

这是 Stage 04 的虚拟调试实验，用来练习“先预测，再揭示证据，再形成调查记录”。它不连接 MCU、Debugger、示波器或逻辑分析仪，也不代表真实硬件测量已经发生。

## Modes

- **Fault Scene**：从 HardFault、Interrupt Storm、Stack Overflow、DMA Boundary、UART Timing 中选择场景，预测根因层级后逐步揭示 Evidence Pack。
- **Watchpoint**：观察变量、候选写入者、Watchpoint 命中信息和 DMA/越界写的能力边界。
- **Instrument Selection**：根据故障现象选择第一件高信息量工具，并查看支持、反驳和误判提示。

## Mission Integration

- [Mission 01 — Fault Scene](../../04-Missions/Stage-04-Debug-Hunter/01-Fault-Scene/Mission.md)
- [Mission 02 — Who Wrote It](../../04-Missions/Stage-04-Debug-Hunter/02-Who-Wrote-It/Mission.md)
- [Mission 03 — Choose the Instrument](../../04-Missions/Stage-04-Debug-Hunter/03-Choose-The-Instrument/Mission.md)
- [Stage 04 Mixed Debug Challenge](../../06-Debugging-Cases/Stage-04-Mixed-Failures/CASE.md)

## Interaction and accessibility

所有主要操作都可以通过键盘完成，动态反馈使用 `role="status"` / `aria-live`。Evidence Record 只保存在当前浏览器的本地存储，不上传任何内容。

## Technical notes

- 单文件 HTML；
- 只依赖仓库共享的 `lab-foundation.css`；
- 使用浏览器原生 JavaScript；
- 375×812 和 1280×800 是验收尺寸；
- 反馈中的数字和证据均为教学用合成数据。
