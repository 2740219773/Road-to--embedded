# Race Interleaving Visualizer

用于观察两个 Task 对共享变量执行 Read / Modify / Write 时，不同执行交错怎样导致 Lost Update。

- 运行：浏览器直接打开 `index.html`。
- Stage：`02-Learning-Path/Stage-05-RTOS-Engineer/`
- Mission：`04-Missions/Stage-05-RTOS/01-Race-Condition/Mission.md`
- Knowledge：`01-Knowledge-Base/RTOS/03-Race-Condition.md`
- Debug Case：`06-Debugging-Cases/RTOS-Race-Lost-Update/CASE.md`

学习重点是理解 `counter++` 并不是不可分割的一步，以及共享状态为什么需要明确同步策略。