# Memory Visualizer

## Beginner Start

- 第一次操作：依次点击 `Read p`、`Dereference *p`、`*p = 20`；
- 预期观察：高亮区域从指针地址移动到目标对象，最后 `value` 变成 20；
- 观察不到：先确认直接打开了 `index.html`，再点击 Reset 后重试；
- Mission Integration：对应 Memory Detective 的 Predict / Observe / Break It。

用于把变量、地址、指针和解引用变成可观察过程。

- 运行：浏览器直接打开 `index.html`。
- Stage：`02-Learning-Path/Stage-01-C-and-Memory/`
- Mission：`04-Missions/Stage-01-C-and-Memory/01-Memory-Detective/Mission.md`
- Knowledge：`01-Knowledge-Base/C/01-Data-Address-Memory.md`、`02-Pointers-and-Hardware.md`

目标不是记地址数值，而是理解 `p` 保存地址、`*p` 访问该地址中的对象。

## Interactions

在页面中修改变量值、选择对象并执行取地址/解引用操作，观察地址、存储内容和指针关系的变化。
