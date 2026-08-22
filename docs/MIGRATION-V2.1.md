# Migration Map — V2.1

## 迁移结果

V2.1 已完成从旧章节式目录到新内容模型的结构迁移。

旧版本完整保存在：

```text
backup/pre-v2.1-restructure
```

当前 `refactor/v2.1-learning-system` 已退休 Legacy 顶层目录，不再采用双轨维护。

## 旧结构 → 新结构

| 旧路径 | 新职责 | 新路径 |
|---|---|---|
| `00-Roadmap/` | 项目治理 + 学习路线 | 根目录治理文档 + `02-Learning-Path/` |
| `01-Fundamentals/00-System-Map/` | 系统知识底稿 | `01-Knowledge-Base/System/` |
| `01-Fundamentals/C/` | Embedded C 知识底稿 | `01-Knowledge-Base/C/` |
| `02-MCU/` | MCU 知识 | `01-Knowledge-Base/MCU/` |
| `03-RTOS/` | RTOS 知识 | `01-Knowledge-Base/RTOS/` |
| `04-Embedded-Linux/` | Linux 知识 | `01-Knowledge-Base/Embedded-Linux/` |
| `05-FPGA/` | FPGA 知识 | `01-Knowledge-Base/FPGA/` |
| `06-Protocols/` | 协议知识 | `01-Knowledge-Base/Protocols/` |
| `07-Projects/` | 综合工程 | `05-Projects/` |
| `08-Debugging/` | 调试方法与案例 | `01-Knowledge-Base/Debugging/` + `06-Debugging-Cases/` |
| `09-Resources/` | 外部资源 | `08-Resources/` |
| `10-Interactive-Labs/` | Mission / Lab / OpenMAIC 混合内容 | 拆分到 `03-Interactive-Labs/`、`04-Missions/`、`07-OpenMAIC/` |

## Mission 命名规范

迁移过程中一度同时存在 `Mission-001-*`、`Phase-1-C/*` 和 `Stage-*/*` 三种方式。V2.1 收口后统一为：

```text
04-Missions/
  Stage-01-C-and-Memory/
    01-Memory-Detective/
    02-Bit-Hacker/
  Stage-02-MCU/
  Stage-03-Peripherals/
  Stage-04-Debug-Hunter/
  Stage-05-RTOS/
  Stage-06-Embedded-Linux/
  Stage-07-FPGA/
```

OpenMAIC 课程源按相同 Stage 逻辑组织。

## Memory Detective 拆分结果

旧目录曾把 Mission 与 OpenMAIC prompt 混在一起。现在职责拆分为：

```text
04-Missions/Stage-01-C-and-Memory/01-Memory-Detective/Mission.md
03-Interactive-Labs/Memory-Visualizer/
07-OpenMAIC/Stage-01-C-and-Memory/01-Memory-Detective/prompt.md
```

技术事实则来自：

```text
01-Knowledge-Base/C/
```

## 清理已完成

- Legacy 顶层技术目录已退休；
- 旧 Roadmap / Progress 文件已退休；
- 旧 Memory Detective 混合目录已退休；
- GitHub Projects 资源索引已迁到 `08-Resources/`；
- Stage 00 已改为直接引用正式 System Knowledge Base；
- Stage 01 Mission 与 OpenMAIC 命名已统一；
- Stage 02 / 03 已补正式导航入口。

## 迁移后仍需验证的内容

V2.1 的“搬家”已经完成，但合并 `main` 前还必须执行：

1. Stage 00～08 导航逐页检查；
2. Mission → Knowledge / Lab / Debug Case / Boss 的互链检查；
3. README / docs 的陈旧路径扫描；
4. Beginner Readability Checklist；
5. PR 最终一致性检查。

因此本文件现在是迁移历史记录，不再作为“待迁移计划”。