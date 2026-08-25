# OpenMAIC Course Sources

这里保存面向 OpenMAIC 等互动课堂平台的课程源与 prompt。

OpenMAIC 是表现层之一，不是 Knowledge Source。技术事实来自 `01-Knowledge-Base/`，任务体验来自 `04-Missions/`，可运行模拟器来自 `03-Interactive-Labs/`。

## 当前已有资产

目前只保留已经实际制作的 Stage 01 样板：

```text
Stage-01-C-and-Memory/
└─ 01-Memory-Detective/
   └─ prompt.md
```

对应 Mission：

`04-Missions/Stage-01-C-and-Memory/01-Memory-Detective/Mission.md`

对应 Knowledge / Lab：

- `01-Knowledge-Base/C/01-Data-Address-Memory.md`
- `01-Knowledge-Base/C/02-Pointers-and-Hardware.md`
- `03-Interactive-Labs/Memory-Visualizer/`

## 规则

- 不要求每个 Mission 都制作 OpenMAIC 版本；
- 不在 prompt 中复制完整 Knowledge Base；
- OpenMAIC 路径跟随 Stage + Mission 命名；
- 更换课堂平台时，Knowledge / Mission / Lab 仍应独立可用。

当前状态仍为 prompt-only：已经保存课程源和依赖关系，但没有生成课堂产物，也没有进行人工课堂验收。

字段、状态和复现要求见 07-OpenMAIC/OPENMAIC-CONTRACT.md，机器可读的来源清单见 07-OpenMAIC/manifest.json。
