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
- [x] Data / Address / Memory 新手重写；
- [x] Pointer & Hardware 新手重写；
- [x] Bitwise / Register 新手重写；
- [x] volatile / const / static 新手重写；
- [x] Struct / Enum / Typedef 新手重写；
- [x] Compilation / Linking 新手重写；

### Integration & Validation

- [x] Stage 01 Debug Challenge — mixed failures;
- [x] Virtual GPIO Controller Boss Project;
- [x] Stage 01 Exit Check;
- [x] 统一五个 Mission 的 Before You Start → Predict → Observe → Explain → Break It → Debug → Transfer → Report 教学节奏；
- [x] 按零基础学习者视角走查 Stage Entry → Mission 01～05 → Debug Challenge → Boss → Exit Check；
- [x] 检查 Stage 01 核心内部链接与首次术语解释；
- [x] 修复走查中发现的旧 `Phase-1-C` 路径；
- [x] 修复 Struct Explorer 标题字节数错误；
- [ ] PR #2 final review / mergeability check；
- [ ] PR #2 Ready for Review；
- [ ] merge to `main`；

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

内容和学习路径验收已完成。V2.2 当前只剩 PR 最终检查与合并流程。