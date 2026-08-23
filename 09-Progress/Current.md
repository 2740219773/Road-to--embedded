# Current Progress

## Project Version

V2.2 — Stage 01 Interactive Pilot

## V2.1 Status

- [x] Architecture Refactor completed;
- [x] P0 navigation / stale-link / beginner-readability validation completed;
- [x] PR #1 merged to `main`;
- [x] V2.1 is now the project baseline.

## Current Work — V2.2

目标：把 Stage 01 从“知识页 + 两个互动原型”整理成一条完整、连续、可验证的学习体验。

### Core Missions

- [x] Mission 01 — Memory Detective;
- [x] Mission 02 — Bit Hacker;
- [x] Mission 03 — Volatile Mystery;
- [x] Mission 04 — Struct Explorer;
- [x] Mission 05 — Linker Detective;

### Interactive / Knowledge

- [x] Memory Visualizer;
- [x] Register Playground;
- [x] volatile / const / static 新手重写；
- [x] Struct / Enum / Typedef 新手重写；
- [x] Compilation / Linking 新手重写；

### Integration & Validation

- [x] Stage 01 Debug Challenge — mixed failures;
- [x] Virtual GPIO Controller Boss Project;
- [x] Stage 01 Exit Check;
- [ ] 统一五个 Mission 的 Predict → Observe → Explain → Break It → Debug → Transfer 节奏；
- [ ] 完整走查一个零基础学习者从 Stage 入口到 Boss 的路径；
- [ ] 检查 Stage 01 所有内部链接与首次术语解释；
- [ ] 更新 PR #2 最终范围与验收状态；

## Current Rule

V2.2 聚焦 Stage 01 教学闭环，不扩展新的 MCU / RTOS / Linux / FPGA 主题。后续阶段已有内容继续视为 vertical-slice prototype。

## V2.2 Completion Target

```text
Stage Entry
→ Mission 01～05
→ Existing Interactive Labs
→ Mixed Debug Challenge
→ Virtual GPIO Controller Boss
→ Exit Check
→ Stage 02
```

当这条路径可以由零基础学习者连续走通，并且不需要维护者在中间解释仓库结构时，V2.2 才算完成。