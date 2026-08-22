# Architecture — Road to Embedded V2.1

## 1. 总体架构

Road to Embedded 将“知识组织”和“学习体验”分离。

```text
                    Road to Embedded
                           │
        ┌──────────────────┼──────────────────┐
        ↓                  ↓                  ↓
 Knowledge Base      Learning Experience   Engineering Practice
        │                  │                  │
   Accurate Source     Stage / Mission      Lab / Project
        │                  │                  │
        └──────────────┬───┴───────┬──────────┘
                       ↓           ↓
                 Debugging Cases  OpenMAIC
```

## 2. 顶层职责

### 00-Project

项目本身的简要说明和治理入口。核心治理文档仍以根目录 `PROJECT.md / ROADMAP.md / CONTRIBUTING.md` 与 `docs/` 为准。

### 01-Knowledge-Base

知识真相源：按技术主题组织，不等同于学习顺序，可被多个 Mission 复用，适合搜索、解释和复习。

### 02-Learning-Path

真正面向学习者的主线：

```text
Stage 00  System Explorer
Stage 01  C & Memory
Stage 02  MCU Rookie
Stage 03  Peripheral Engineer
Stage 04  Debug Hunter
Stage 05  RTOS Engineer
Stage 06  Embedded Linux
Stage 07  FPGA Builder
Stage 08  System Integrator
```

Stage 不复制完整技术知识，而是组织 Mission、Lab、Debug Challenge 与 Boss Project。

### 03-Interactive-Labs

可直接操作的 HTML/可视化组件。一个 Lab 可以被多个 Mission 复用。

### 04-Missions

学习体验核心。Mission 以问题、现象或工程目标开场，而不是以技术定义开场。

Mission 命名统一按 Stage：

```text
04-Missions/
  Stage-01-C-and-Memory/
  Stage-02-MCU/
  Stage-03-Peripherals/
  Stage-04-Debug-Hunter/
  Stage-05-RTOS/
  Stage-06-Embedded-Linux/
  Stage-07-FPGA/
```

### 05-Projects

阶段综合项目，用于验证多个知识点的组合、迁移和工程交付能力。

### 06-Debugging-Cases

真实故障案例库，统一强调 Symptom、Evidence、Hypothesis、Root Cause、Fix 与 Regression。

### 07-OpenMAIC

保存 OpenMAIC 课程源和生成提示。OpenMAIC 是课堂表现层，不是技术事实的 Source of Truth。

### 08-Resources

外部书籍、课程、工具、开源项目、Datasheet 等精选索引。

### 09-Progress

阶段建设状态、验收与复盘信息。

## 3. 依赖方向

```text
Mission ───────→ Knowledge Base
   │
   ├───────────→ Interactive Lab
   ├───────────→ Debug Case
   └───────────→ OpenMAIC Source

Stage ─────────→ Mission / Lab / Boss
Project ───────→ 多个 Knowledge / Mission / Lab
```

避免复制：

```text
Knowledge A → copy → Mission A
Knowledge A → copy → Mission B
Knowledge A → copy → Project
```

技术知识尽量维护一份，其他层通过链接、任务和情境复用。

## 4. Source of Truth

- 技术事实：`01-Knowledge-Base/`
- 学习顺序：`02-Learning-Path/`
- 任务体验：`04-Missions/`
- 综合验收：`05-Projects/`
- 故障证据：`06-Debugging-Cases/`
- 项目发展状态：`ROADMAP.md` + `docs/DEVELOPMENT-PLAN.md`
- V2.1 收口状态：`09-Progress/V2.1-Migration-Status.md`

## 5. 平台边界

GitHub 是内容源、版本管理、实验代码仓库和维护中心，但不一定是最终最佳学习 UI。

OpenMAIC 是互动课堂载体，可承担 Quiz、Slides、AI 多角色课堂和 PBL。未来静态站点或 Web 应用可以成为更友好的学习入口，但 V2.x 优先保证内容模型正确。

## 6. 设计约束

- 不重复维护知识；
- 不强迫学习者遍历所有文档；
- 互动设计不锁定单一平台；
- 每个 Stage 最终要落到真实工程或 Boss；
- 错误和故障是主要学习资产；
- 第一次出现的技术名词必须满足 `docs/BEGINNER-READABILITY.md`。

## 7. V2.1 当前状态

结构迁移已经完成：Legacy 顶层目录已从 `refactor/v2.1-learning-system` 退休，旧版本完整保存在 `backup/pre-v2.1-restructure`。

V2.1 现在不再进行目录搬迁，剩余工作是：

```text
1. 检查 Stage 00～08 导航
2. 检查 Mission / Lab / Boss 互链
3. 扫描死链和陈旧路径
4. 统一命名与新手可读性
5. 完成 PR 最终一致性检查
6. 合并 main
```

历史迁移映射见 `docs/MIGRATION-V2.1.md`。