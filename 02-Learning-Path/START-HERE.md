# Start Here — 从零开始学习嵌入式

如果你第一次打开这个仓库，不要从 `01-Knowledge-Base/` 第一篇文件开始顺序阅读。这里是一条可以执行的学习路线：每次先做一个小任务，再回头查需要的知识。

## 先判断自己的起点

| 你的情况 | 第一步 | 之后进入 |
|---|---|---|
| 没有编程经验 | [零基础编程热身](00-Programming-Warmup/README.md) | Stage 00 |
| 会 C#、变量、循环和函数 | Stage 00 系统地图 | Stage 01 的 C# → C Bridge |
| 会基础 C | Stage 00 系统地图 | Stage 01 Memory Detective |
| 已经做过 MCU | 仍先完成 Stage 00～01 的 Exit Check | Stage 02 或对应补缺主题 |

不会 C 不是问题，但不要跳过变量、条件、循环、函数和数组这几个最小基础。它们是后面阅读 C 和调试代码的工具，不是嵌入式专属知识。

## 第一次学习怎么做

1. 先完成 [Windows / C 环境检查](../docs/BEGINNER-SETUP.md)，运行 `hello.c`。
2. 完全没有编程经验时，完成 [Programming Warmup](00-Programming-Warmup/README.md) 及其可运行样例。
3. 打开 [Stage 00 — System Explorer](Stage-00-System-Explorer/README.md)，只阅读“必读”路线。
4. 完成 [Stage 00 System Map Mission](../04-Missions/Stage-00-System-Explorer/00-System-Map/Mission.md)。
5. 完成 [Stage 00 Exit Check](Stage-00-System-Explorer/EXIT-CHECK.md)。
6. 进入 [Stage 01 — C & Memory](Stage-01-C-and-Memory/README.md)。
7. C# 学习者先做 [C# → C Bridge](../04-Missions/Stage-01-C-and-Memory/00-CSharp-to-C-Bridge/Mission.md)。

每次练习都使用 [Learning Record Template](../docs/LEARNING-RECORD-TEMPLATE.md)，至少留下预测、观察和下一步。

## 第一周建议顺序

| 学习次数 | 内容 | 结束时留下的产出 |
|---|---|---|
| 第 0 次 | [环境检查](../docs/BEGINNER-SETUP.md)与基础编程自测 | 能运行 `hello.c`，并解释输入、处理、输出 |
| 第 1 次 | Stage 00 系统地图 | 一张从代码到真实设备的系统图 |
| 第 2 次 | C# → C Bridge 或 C 基础热身 | 一张高层写法与 C 写法对照表 |
| 第 3 次 | Memory Detective | 一份地址、数据、生命周期预测记录 |
| 第 4 次 | Bit Hacker | 一份 bit mask 操作前后对照 |
| 第 5 次 | Volatile Mystery | 一份“谁可能修改了状态”的证据记录 |
| 第 6 次 | Struct Explorer / Linker Detective | 一份内存布局或编译链接调查记录 |
| 第 7 次 | Stage 01 Mixed Challenge 与 Exit Check | 一份完整 Debug Record 和阶段自评 |

每次学习不要求读完所有文章，但必须完成一次“预测 → 操作 → 观察 → 解释”。

## 每节课的固定动作

```text
看现象
→ 写下预测
→ 做最小操作
→ 记录观察结果
→ 故意制造一个错误
→ 用证据排除假设
→ 写出最小修复和回归检查
```

推荐使用纸、Markdown 或仓库外的个人笔记保存结果。不要只记最后答案，要记“为什么知道”。

## 环境边界

- Stage 00～01：浏览器和普通 PC 即可，不要求开发板。
- Stage 02：先完成 [Hardware Setup](Stage-02-MCU-Rookie/HARDWARE-SETUP.md)，再进入真实 MCU、编译、烧录、调试器和引脚验证。
- Stage 03：先阅读 [Instrument Basics](../01-Knowledge-Base/Debugging/00-Instrument-Basics.md)，再逐步使用串口、逻辑分析仪、示波器和总线证据。
- Stage 04～05：先使用浏览器和确定性 Host Fixture，再把方法迁移到真实平台。
- Stage 06～08：当前仍是 prototype，不作为新手当前必修路线。

## 遇到看不懂的词

先看当前 Mission 的 `Before You Start`，再查 [Glossary](../01-Knowledge-Base/Glossary.md)。如果一个页面连续出现很多未解释的缩写，先退回 Stage 入口，不要用搜索结果堆叠更多概念。

## 下一步

- [学习路线总览](README.md)
- [Stage 00 — System Explorer](Stage-00-System-Explorer/README.md)
- [路线机器清单](route-manifest.json)
