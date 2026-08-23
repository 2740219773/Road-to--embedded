# Stage 07 — FPGA

FPGA 不是“更高级的 MCU”。这一阶段的核心是从顺序执行的软件思维，切换到并行数字逻辑和时序设计。

## 当前定位

Stage 07 已有第一批纵向样板，用于验证 FPGA 能否按同一套“概念 → Mission → 实验 → 故障 → 项目”体系教学。完整正式建设属于 ROADMAP 的 V2.7。

当前 V2.3 不继续扩 FPGA 内容，除非修复明显错误或断链。

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