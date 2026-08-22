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

项目本身的说明、架构、路线、开发计划与维护规范。

### 01-Knowledge-Base

知识真相源。

特点：

- 按技术主题组织；
- 不等同于学习顺序；
- 内容稳定；
- 可以被多个 Mission 重复引用；
- 适合搜索与复习。

### 02-Learning-Path

真正面向学习者的主线。

采用 Stage：

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

Stage 不负责复制知识，而是组织 Mission、Lab、Challenge 与 Boss。

### 03-Interactive-Labs

可以直接操作的交互组件。

例如：

- Memory Visualizer；
- Register Playground；
- PWM Visualizer；
- UART Frame Visualizer；
- SPI Timing Explorer；
- Interrupt Timeline；
- DMA Flow Simulator；
- RTOS Scheduler Simulator；
- FPGA FSM Visualizer。

一个 Lab 可以被多个 Mission 调用。

### 04-Missions

学习体验核心。

Mission 以问题或工程任务开场，而不是以知识定义开场。

### 05-Projects

阶段综合项目。

主要验证知识迁移和多模块整合能力。

### 06-Debugging-Cases

真实故障案例库。

既服务学习，也可以逐渐成为实际工作中的问题索引。

### 07-OpenMAIC

保存 OpenMAIC 课程源材料和生成提示。

OpenMAIC 是运行环境，不是唯一内容源。

### 08-Resources

外部书籍、课程、工具、开源项目、Datasheet 等索引。

### 09-Progress

学习进度、阶段验收和复盘模板。

## 3. 依赖关系

正确依赖方向：

```text
Mission ───────→ Knowledge Base
   │
   ├───────────→ Interactive Lab
   │
   ├───────────→ Debug Case
   │
   └───────────→ OpenMAIC Source

Stage ─────────→ Mission
Project ───────→ 多个 Knowledge / Mission / Lab
```

避免：

```text
Knowledge A → copy → Mission A
Knowledge A → copy → Mission B
Knowledge A → copy → Project
```

知识只维护一份，其他内容通过链接和教学设计复用。

## 4. Source of Truth

项目存在多个内容层，因此需要明确谁负责什么。

### 技术事实

以 Knowledge Base 为准。

### 学习顺序

以 Learning Path 为准。

### 任务体验

以 Missions 为准。

### 项目发展状态

以 `ROADMAP.md` 和 `docs/DEVELOPMENT-PLAN.md` 为准。

### 学习者个人进度

以 `09-Progress/` 为准。

## 5. 平台边界

GitHub 是：

- 内容源；
- 版本管理；
- 实验代码仓库；
- 项目维护中心。

GitHub 不一定是最终最佳学习 UI。

OpenMAIC 是：

- 互动课堂载体；
- AI 多角色教学载体；
- Quiz / Slides / PBL 运行环境。

未来静态站点或 Web 应用可能成为更友好的学习入口，但在 V2.x 阶段优先把内容模型做正确。

## 6. 设计约束

### Constraint A：不重复维护知识

一个技术知识点应尽量只有一个 Knowledge Source。

### Constraint B：不强迫学习者阅读全部文档

学习者主路线是 Stage / Mission，不是目录遍历。

### Constraint C：互动不依赖特定平台

核心任务、问题、正确答案边界和教学流程都必须可保存在仓库。

### Constraint D：每个阶段必须落地工程

Stage 结束使用 Boss Project 或真实 Debug Challenge 验收。

### Constraint E：错误也是课程内容

失败案例不是附录，而是主要学习资产。

## 7. V2.1 迁移策略

V2.1 不直接一次性删除旧目录。

采用：

```text
1. 建立新结构
2. 建立迁移映射
3. 复制/重组高价值内容
4. 更新内部链接
5. 验证学习路径
6. 删除或归档旧目录
```

旧 `01-Fundamentals` ～ `10-Interactive-Labs` 在迁移完成前仍作为原始内容参考。

详细映射见 `docs/MIGRATION-V2.1.md`。