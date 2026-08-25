# OpenMAIC Course Contract

OpenMAIC 是互动课堂的表现层，不是技术事实源。课程必须能够脱离 OpenMAIC 独立阅读、操作和复盘。

## Source of Truth

```text
Knowledge Base
→ 技术事实、定义、边界和术语

Mission
→ 学习顺序、问题、预测、故障和验收任务

Interactive Lab
→ 浏览器内可操作的观察和模拟

OpenMAIC
→ Slides / Quiz / HTML Simulation / PBL 的课堂编排
```

## Required source fields

每个 OpenMAIC prompt 或 manifest 条目必须明确：

- Source Knowledge；
- Source Mission；
- Learner Level；
- Learning Goals；
- AI Teacher / Rookie Engineer / Debug Mentor 的角色；
- Slides 的视觉目标；
- Quiz 的题型和验收重点；
- HTML Simulation 的复用路径；
- Failure Challenge；
- 结束复盘；
- 不能虚构真实硬件测量结果。

## Status values

```text
prompt-only
generated-pending-review
reviewed
```

只有人工确认以下内容后，才能从 generated-pending-review 变成 reviewed：

- 关键技术事实与 Knowledge Base 一致；
- Mission 的预测、故障和证据调试仍然存在；
- HTML Simulation 的参数和结果与仓库 Lab 一致；
- 课堂没有把模拟结果描述成真实硬件测量；
- 学习者完成后有明确复盘和迁移任务。

## Reproducibility

生成课堂时记录：

```text
Source commit:
Prompt path:
Knowledge paths:
Mission path:
Lab paths:
Generation date:
Model/provider:
Human reviewer:
Generated artifact paths:
```

没有生成文件或没有人工审核时，必须保留 prompt-only 状态。
