# Race Interleaving Visualizer

## Beginner Start

- 第一次操作：依次点击 A Read、B Read、A Write、B Write；
- 预期观察：两个任务都执行了，但共享 counter 出现 Lost Update；
- 观察不到：点击 Reset 后严格按顺序操作，不要直接跳到最后一步；
- Mission Integration：这是 Stage 05 Race Condition 的最小交错模型。

## Purpose

用于观察两个 Task 对共享变量执行 Read / Modify / Write 时，不同执行交错怎样导致 Lost Update。

## Interaction

依次点击 A Read、B Read、A Write、B Write，查看共享 counter、局部值和实时日志；使用 Reset 重新开始，这个交互用于观察 Lost Update。

- 运行：浏览器直接打开 `index.html`。
- Stage：`02-Learning-Path/Stage-05-RTOS-Engineer/`
- Mission：`04-Missions/Stage-05-RTOS/01-Race-Condition/Mission.md`
- Knowledge：`01-Knowledge-Base/RTOS/04-Race-Condition.md`
- Debug Case：`06-Debugging-Cases/RTOS-Race-Lost-Update/CASE.md`

学习重点是理解 `counter++` 并不是不可分割的一步，以及共享状态为什么需要明确同步策略。
