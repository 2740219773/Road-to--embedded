# Stage 07 — FPGA

FPGA 不是“更高级的 MCU”。这一阶段的核心是从顺序执行的软件思维，切换到并行数字逻辑和时序设计。

## 当前定位

Stage 07 当前是 prototype，已有第一批纵向样板，用于验证 FPGA 能否按同一套“概念 → Mission → 实验 → 故障 → 项目”体系教学。完整正式建设属于后续版本。

## Entry Requirements / 环境 / 产出

- Entry：建议完成 Stage 01；系统集成学习者还应完成 Stage 05。
- 环境：当前只需要阅读和 HDL 基础示例；真实 FPGA 工具链属于后续实践。
- 必须完成：当前样板 Mission。
- 可选阅读：数字逻辑、时序逻辑、RTL 和 Verilog Knowledge。
- 阶段产出：当前不要求 Boss 或 Exit Check。

当前 V2.6 不继续扩 FPGA 内容，除非修复明显错误或断链。

## 当前 Knowledge 样板

- [FPGA 到底是什么](../../01-Knowledge-Base/FPGA/01-What-Is-FPGA.md)
- [组合逻辑与时序逻辑](../../01-Knowledge-Base/FPGA/02-Combinational-Sequential.md)
- [RTL / Verilog 思维](../../01-Knowledge-Base/FPGA/03-RTL-Verilog-Mindset.md)

## 当前 Mission

- [Software or Hardware：这段 Verilog 到底变成了什么？](../../04-Missions/Stage-07-FPGA/01-Software-or-Hardware/Mission.md)

## 未来完整主线

```text
Digital Logic
→ Verilog / SystemVerilog
→ Combinational / Sequential
→ Register / Counter
→ FSM
→ Clock / Reset
→ Simulation
→ FIFO / RAM
→ CDC
→ Timing Constraint
→ MCU / CPU + FPGA Integration
```

## 当前样板验收

现阶段只验证第一件事：学习者能否明确区分“CPU 执行代码”和“HDL 描述硬件结构/时序”。

完整 Stage 07 在 V2.7 再继续建设；现在不以增加 FPGA 文件数量作为项目进度。
