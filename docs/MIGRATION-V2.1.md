# Migration Map — V2.1

## 迁移原则

V2.1 采用“先建新结构、再迁移、最后清理旧目录”的方式。

旧目录在确认新路径可用之前不会直接删除。

## 旧结构 → 新结构

| 旧路径 | 新职责 | 新路径 |
|---|---|---|
| `00-Roadmap/` | 项目路线/学习路线 | `00-Project/` + `02-Learning-Path/` |
| `01-Fundamentals/00-System-Map/` | 系统知识底稿 | `01-Knowledge-Base/System-Map/` |
| `01-Fundamentals/C/` | Embedded C 知识底稿 | `01-Knowledge-Base/C/` |
| `02-MCU/` | MCU 知识底稿 | `01-Knowledge-Base/MCU/` |
| `03-RTOS/` | RTOS 知识底稿 | `01-Knowledge-Base/RTOS/` |
| `04-Embedded-Linux/` | Linux 知识底稿 | `01-Knowledge-Base/Embedded-Linux/` |
| `05-FPGA/` | FPGA 知识底稿 | `01-Knowledge-Base/FPGA/` |
| `06-Protocols/` | 协议知识底稿 | `01-Knowledge-Base/Protocols/` |
| `07-Projects/` | 综合工程 | `05-Projects/` |
| `08-Debugging/` | 调试方法/案例 | `06-Debugging-Cases/` |
| `09-Resources/` | 外部资源 | `08-Resources/` |
| `10-Interactive-Labs/` | Mission + Lab + OpenMAIC 混合 | 拆分到 `03/04/07` |

## 已有第一关拆分

旧：

```text
10-Interactive-Labs/Phase-1-C/01-Memory-Detective/
├─ Mission.md
└─ openmaic-prompt.md
```

新：

```text
04-Missions/Mission-001-Memory-Detective/Mission.md
07-OpenMAIC/Mission-001-Memory-Detective/prompt.md
```

未来交互实现：

```text
03-Interactive-Labs/Memory-Visualizer/
```

这样 Mission、平台生成材料和真正可运行的互动组件不再混在一起。

## Roadmap 拆分

旧的 `Learning-Roadmap.md` 同时包含知识阶段和学习顺序。

V2.1 后拆分为：

```text
02-Learning-Path/README.md          总 Stage 地图
02-Learning-Path/Stage-00-*/        具体学习体验
02-Learning-Path/Stage-01-*/
...

01-Knowledge-Base/                  具体技术知识
```

## 清理条件

一个旧目录只有满足以下条件才允许删除：

1. 内容已经迁移或确认废弃；
2. README 和 Stage 不再引用旧路径；
3. OpenMAIC / Mission 链接已经更新；
4. GitHub 搜索确认没有关键引用；
5. backup branch 中仍保留完整旧版本。

## V2.1 迁移批次

### Batch 1

- 项目治理文档；
- 新顶层目录；
- Stage 00 / 01；
- Phase 0 / 1 Knowledge Base；
- Memory Detective。

### Batch 2

- Projects；
- Debugging；
- Resources；
- Progress。

### Batch 3

- 更新 README；
- 全仓链接检查；
- 旧目录清理；
- PR Review / Merge。