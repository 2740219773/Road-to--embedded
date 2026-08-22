# Mission — Lost Update：计数器为什么少了？

## Scene

两个 Task 各自执行 1000 次：

```c
counter++;
```

你预期最后是 2000，但实际结果偶尔只有 1937、1984 或其他值。

## Investigation

先不要加 Mutex。使用 Race Interleaving Visualizer 手动执行：

```text
A Read
B Read
A Write
B Write
```

解释为什么两个 Task 都“成功执行了 +1”，最终共享 counter 却只增加 1。

## Hypotheses

- `counter++` 不是原子操作；
- Task 切换发生在 Read / Modify / Write 之间；
- `volatile` 只能影响编译器对访问的处理，不能让复合操作自动原子化。

## Fix Candidates

根据场景比较：Critical Section、Mutex、Atomic Operation、单一 Owner + Queue。

## Boss

不要只写“加锁”。说明哪种方案最适合当前 counter，以及如果这个共享对象换成一个 UART Driver，设计是否还一样。

## Achievement

能够从执行交错解释 Race Condition，而不是把问题归结为“RTOS 不稳定”。