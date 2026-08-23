# Contributing to Road to Embedded

本项目欢迎持续维护，但新增内容必须优先遵守教学系统的一致性，而不是简单增加文件数量。

## 新增内容前先判断类型

先问：这个内容属于哪一类？

- Knowledge：准确知识、定义、原理、查询手册；
- Learning Path：学习顺序和 Stage；
- Mission：以问题/任务为入口的课程；
- Interactive Lab：需要操作、动画或模拟；
- Debug Case：真实故障与排查；
- Project：多个知识点综合工程；
- OpenMAIC：课堂生成材料；
- Resource：外部书籍、项目、工具索引。

不要把所有内容默认写成 Markdown 教程。

## 媒介选择

优先选择最适合知识本身的媒介：

| 内容 | 优先形式 |
|---|---|
| 概念边界 / 参考信息 | Markdown |
| 内存 / 指针 | 可视化 / HTML |
| bit / 寄存器 | 交互模拟器 |
| UART / SPI / I2C | 时序可视化 + 真机实验 |
| PWM / ADC | 动态波形 |
| 中断 / DMA | Timeline / 数据流动画 |
| RTOS | Scheduler Timeline |
| FPGA FSM | 状态机动画 |
| 故障定位 | Debug Case / Mission |

## 一个 Mission 的最低要求

Mission 不应只是把传统文章换个标题。

至少应明确：

1. Hook：为什么学习者应该关心；
2. Goal：完成后能做什么；
3. Predict：至少一次操作前预测；
4. Action：至少一次实际操作；
5. Break It：至少一个典型错误；
6. Debug：通过证据定位；
7. Boss / Transfer：一个需要独立思考的小挑战；
8. Review：尽量短的核心复盘。

## Knowledge Base 写作规则

Knowledge Base 负责准确，不负责娱乐。

要求：

- 概念准确；
- 尽量短；
- 给出工程场景；
- 与 Mission 分离；
- 不为了“完整”复制教材式大段内容；
- 外部内容要遵守许可证并保留来源。

## Debug Case 规则

统一使用：

```text
Symptom
Context
Evidence
Hypotheses
Experiments
Root Cause
Fix
Verification
Prevention
```

重点记录“如何知道原因”，而不只是最后答案。

## 目录和命名

- 学习路径使用 `Stage-XX-*`；
- Mission 使用 `Mission-XXX-*`；
- Boss 使用 `Boss-*`；
- 交互组件使用能够说明功能的英文目录名；
- 文件名尽量稳定，避免频繁重命名导致链接失效。

## 修改流程

较大的结构调整建议：

1. 从 `main` 创建分支；
2. 更新架构或迁移说明；
3. 完成内容修改；
4. 检查内部链接；
5. 确认旧内容是否需要重定向/迁移说明；
6. Pull Request 合并到 `main`。

## 完成定义

“文件写完”不代表内容完成。

对于一个核心课程，至少应该达到：

- Knowledge 有来源；
- Learning Path 有入口；
- Mission 可执行；
- 有练习或实验；
- 有故障/反例；
- 有明确完成标准；
- 不依赖聊天记录才能理解下一步。