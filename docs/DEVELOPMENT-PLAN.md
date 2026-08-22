# Development Plan — V2.1

## 目标

V2.1 不以增加课程数量为目标，而以完成架构重构和维护体系为目标。

## Workstream A — Project Governance

- [x] `PROJECT.md`
- [x] `ROADMAP.md`
- [x] `CONTRIBUTING.md`
- [x] `docs/ARCHITECTURE.md`
- [x] `docs/CONTENT-DESIGN.md`
- [ ] `docs/MIGRATION-V2.1.md`
- [ ] 课程/任务/实验模板
- [ ] README 与新架构完全一致

## Workstream B — New Directory Model

建立：

```text
01-Knowledge-Base/
02-Learning-Path/
03-Interactive-Labs/
04-Missions/
05-Projects/
06-Debugging-Cases/
07-OpenMAIC/
08-Resources/
09-Progress/
```

每个目录先建立职责说明，再迁移内容。

## Workstream C — Migration

优先迁移 Phase 0 / Phase 1，因为这些内容已经存在且能用于验证架构。

迁移顺序：

1. System Map → Knowledge Base；
2. Embedded C → Knowledge Base；
3. Memory Detective → Mission；
4. OpenMAIC prompt → OpenMAIC；
5. Progress → 09-Progress；
6. Projects / Debugging / Resources → 新目录；
7. 旧路径标注 deprecated；
8. 内部链接统一更新；
9. 确认无引用后删除旧目录。

## Workstream D — Learning Path

建立 Stage Map：

```text
Stage 00 System Explorer
Stage 01 C & Memory
Stage 02 MCU Rookie
Stage 03 Peripheral Engineer
Stage 04 Debug Hunter
Stage 05 RTOS Engineer
Stage 06 Embedded Linux
Stage 07 FPGA Builder
Stage 08 System Integrator
```

每个 Stage 定义：

- Entry Requirements；
- Missions；
- Labs；
- Debug Challenges；
- Boss；
- Exit Criteria。

V2.1 至少完成 Stage 00 和 Stage 01 的具体映射。

## Workstream E — Interactive Pilot

V2.1 只要求验证机制，不要求批量开发模拟器。

保留第一关 Memory Detective，并规划：

- Memory Visualizer；
- 32-bit Register Playground。

真正实现交互工具放到 V2.2。

## Workstream F — Quality

重构完成前检查：

- [ ] 主 README 不再把旧目录当最终结构；
- [ ] 所有新顶层目录都有 README；
- [ ] Stage 00 / 01 能从首页连续导航；
- [ ] Knowledge 和 Mission 没有大段重复；
- [ ] OpenMAIC prompt 指向正确源文件；
- [ ] 没有明显死链；
- [ ] 旧内容都有迁移去向；
- [ ] backup branch 可恢复重构前状态。

## 优先级

### P0

架构、迁移、导航、维护文档。

### P1

Stage 00 / 01 的新结构落地。

### P2

第二个 Mission 和 Register Playground。

### P3

继续扩展 MCU 课程。

## 维护节奏建议

后续每次新增内容尽量采用小批次：

```text
一个知识主题
→ 一个 Mission
→ 一个实验/互动
→ 一个故障案例
→ 更新 Stage Progress
```

避免一次生成几十篇互相没有验证过的课程。