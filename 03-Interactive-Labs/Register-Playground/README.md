# Register Playground

用于把 bit、mask、二进制/十六进制和寄存器修改变成可直接操作的过程。

- 运行：浏览器直接打开 `index.html`，不依赖框架或构建工具。
- Stage：`02-Learning-Path/Stage-01-C-and-Memory/`
- Mission：`04-Missions/Stage-01-C-and-Memory/02-Bit-Hacker/Mission.md`
- Knowledge：`01-Knowledge-Base/C/03-Bitwise-and-Registers.md`

## 学习重点

通过 Set / Clear / Toggle / Overwrite 操作观察：

- bit 与 mask 的关系；
- 二进制、十六进制和实际数值之间的对应；
- `|=`、`&= ~`、`^=` 的效果；
- 整体赋值与 Read-Modify-Write 的差异。

核心目标不是背位运算表达式，而是看到一个寄存器值后能够预测“这一句执行以后哪些 bit 会改变、哪些会保留”。

## 当前状态

这是 V2.1 已实现、可直接运行的 Interactive Lab。后续增强（Predict 模式、寄存器字段分组、GPIO 映射等）属于后续版本规划，不影响当前学习闭环。