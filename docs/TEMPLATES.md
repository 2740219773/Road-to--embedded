# Templates

## Mission Template

```text
# Mission XXX — Title

## Hook
一个真实现象、错误或目标。

## Mission Goal
完成后能做什么。

## Prior Knowledge
只列必要前置知识。

## Predict
操作前先预测结果。

## Explore
图、动画、交互或最小解释。

## Action
真实操作或代码实验。

## Break It
故意制造典型错误。

## Debug
按证据排查，不立即给答案。

## Boss Challenge
换一个场景独立完成。

## Knowledge Links
链接 Knowledge Base，不复制全文。

## Achievement / Exit Criteria
明确通过标准。
```

## Interactive Lab Template

```text
# Lab — Name

## Purpose
它帮助理解什么抽象概念。

## Inputs
学习者可以控制哪些参数。

## Visualization
必须观察到什么变化。

## Interactions
点击、拖动、输入、运行等操作。

## Learning Events
哪些操作触发哪些教学反馈。

## Failure Modes
哪些错误配置值得模拟。

## Mission Integration
哪些 Mission 会使用这个 Lab。

## Technical Notes
运行方式、依赖、浏览器兼容性。
```

## Debug Case Template

```text
# Debug Case — Title

## Symptom
用户实际看到的现象。

## Context
硬件、软件、连接、参数。

## Evidence
目前已知证据。

## Hypotheses
可能原因，但不要一开始标出正确答案。

## Experiments
每个假设如何验证。

## Root Cause
最终原因。

## Fix
修复方式。

## Verification
怎么证明真正修好了。

## Prevention
未来如何避免。
```

## Stage Template

```text
# Stage XX — Name

## Identity
这一阶段学习者扮演什么角色。

## Entry Requirements
进入前需要什么。

## Skills
这一阶段获得哪些真实能力。

## Missions
按体验顺序组织。

## Interactive Labs
本阶段使用哪些交互工具。

## Debug Challenges
需要解决哪些故障。

## Boss Project
阶段综合任务。

## Exit Criteria
什么情况下算通过。

## Next Stage
进入下一阶段需要什么。
```

## OpenMAIC Source Template

OpenMAIC 生成材料至少明确：

- Source Knowledge；
- Mission；
- 学习者水平；
- AI Teacher / Rookie / Debug Mentor 的角色；
- Slides 的视觉目标；
- Quiz 类型；
- HTML Simulation 需求；
- 故障挑战；
- 结束复盘。

OpenMAIC prompt 不应成为唯一课程源；关键教学逻辑必须在 Mission 和 Knowledge Base 中保留。