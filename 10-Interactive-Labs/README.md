# 10 — Interactive Labs

这里存放 Road to Embedded 的互动课程设计与可运行实验。

它不是知识文章目录，而是学习者真正“玩、做、试、弄坏、修好”的地方。

## 内容类型

```text
10-Interactive-Labs/
├─ Phase-0/          系统认知互动课
├─ Phase-1-C/        C 与底层基础互动课
├─ Phase-2-MCU/      MCU / STM32 互动课
├─ Debug-Challenges/ 故障挑战
└─ OpenMAIC/         OpenMAIC 课程生成材料
```

GitHub 空目录无法单独保存，因此各目录会随着第一份内容逐步创建。

## 每个互动实验建议包含

- `Mission.md`：任务和故事背景；
- `Knowledge.md`：对应知识底稿入口；
- `Quiz.md`：预测题和检查题；
- `Challenge.md`：故障挑战；
- `openmaic-prompt.md`：用于生成互动课堂的课程设计提示；
- `src/`：可运行代码或 HTML 模拟（需要时）。

## 第一批改造

Phase 1 优先改造：

1. 地址与指针：CPU 如何找到数据和硬件？
2. 位运算：只打开一个 LED，为什么其他灯灭了？
3. volatile：代码没改，寄存器为什么自己变了？
4. 结构体：`GPIOA->ODR` 到底是什么意思？
5. 编译与链接：代码明明写了，为什么 linker 说找不到？

目标不是让学习者阅读五篇文章，而是完成五个小型工程关卡。