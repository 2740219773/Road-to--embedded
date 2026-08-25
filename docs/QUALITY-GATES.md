# Content Quality Gates

Road to Embedded treats course files as a maintainable learning system, not only as text files. Every change should pass the structural checks before it is merged.

## Local command

From the repository root:

```powershell
node tools/validate-content.mjs
```

The checker uses only Node.js built-in modules. It does not call an LLM, require an API key, or access real hardware.

## Blocking checks

The command exits with a non-zero status when it finds:

- a broken local Markdown link;
- a missing core directory or entry file;
- an OpenMAIC manifest path that does not exist;
- an HTML Lab missing `doctype`, `lang`, viewport metadata, or the shared Lab foundation stylesheet;
- current-state documents that still describe V2.3 Phase B as waiting to merge.
- `02-Learning-Path/route-manifest.json` 的入口、阶段顺序、Mission、Lab、Boss 和 Exit 路径无效；
- Root README 和 Learning Path README 未链接 `START-HERE.md`；
- 正式 Stage 的 Mission 缺少预测、操作/观察、故障、证据调试或迁移/复盘字段；
- 正式 Stage 的 Lab README 缺少目的、交互或 Mission 关联。

V2.5 Stage 05 的正式字段、Workbench、Mixed Challenge、Exit Check、Host Fixture 和 Evidence Pack 由 [V2.5 Quality Gate](V2.5-QUALITY-GATE.md) 作为阻断检查维护。

V2.7 的新手路线契约、Mission/Lab 字段、C Basics Check、板卡路线和 Warmup C CI 由 [V2.7 Beginner Framework Quality Gate](V2.7-BEGINNER-QUALITY-GATE.md) 维护。

新手路线的拓扑和阶段状态由 [route-manifest.json](../02-Learning-Path/route-manifest.json) 维护。Stage 06～08 的 prototype 警告可以保留，但不能被写成正式完成。

## Advisory checks

The checker also reports Mission, Debug Case, and Lab documents that do not expose the expected learning concepts with recognizable headings or wording. Existing content may use equivalent Chinese headings, so these findings are advisory until a maintainer confirms the meaning.

## Version rule

`README.md`, `ROADMAP.md`, `docs/DEVELOPMENT-PLAN.md`, and `09-Progress/Current.md` are current-state documents. Historical audits must be explicitly labeled as historical snapshots and must not be used as the current release status.
