# Debugging Case — Lost Update in RTOS

## Related

- [Stage 05 — RTOS Engineer](../../02-Learning-Path/Stage-05-RTOS-Engineer/README.md)
- [Mission — Race Condition](../../04-Missions/Stage-05-RTOS/01-Race-Condition/Mission.md)
- [Knowledge — Race Condition](../../01-Knowledge-Base/RTOS/04-Race-Condition.md)
- [Lab — RTOS Concurrency Workbench](../../03-Interactive-Labs/RTOS-Concurrency-Workbench/)

## Symptom

两个 Task 分别对共享 `counter` 增加 1000 次，最终值低于 2000，并且每次运行结果不同。

## Context

系统包含两个相同优先级的计数 Task。`counter` 声明为 `volatile uint32_t`，没有 Mutex、Atomic 或单一 Owner 设计。

## Evidence

- 两个 Task 都正常运行；
- 没有 Crash；
- 单 Task 模式结果稳定为 1000；
- 双 Task 模式偶发丢失更新；
- 确定性交错 `A Read → B Read → A Write → B Write` 后最终值只增加 1。

## Hypotheses

- `counter++` 不是原子操作；
- Task 切换发生在 Read / Modify / Write 之间；
- `volatile` 被误认为同步机制；
- 初始化或整数溢出造成结果错误。

## Experiments

1. 使用单 Task 模式建立基线；
2. 展开两个 Task 的 Read / Modify / Write；
3. 固定交错顺序并记录局部值；
4. 分别比较 Mutex、Atomic、Critical Section 和 Owner + Queue；
5. 检查修复后结果、阻塞时间和所有权边界。

## Root Cause

两个 Task 对共享变量执行非原子的 Read-Modify-Write，后写入的一方覆盖了前一方的更新。`volatile` 只影响编译器访问语义，不能提供互斥或原子性。

## Fix

根据对象语义选择最小修复：计数器可使用合适的 Atomic；需要保护复合状态时使用 Mutex/Critical Section；复杂 UART 状态改为单一 Owner + Queue，避免所有 Task 直接改写。

## Verification

重复确定性交错和压力序列，确认最终值符合预期；记录修复后的同步方式、最大阻塞时间和是否仍存在共享写入路径。

## Prevention

代码评审明确共享对象 Owner；禁止把 `volatile` 当作同步方案；对共享状态保留交错测试和静态检查。

## Learning Links

- [Stage 05 Mixed Concurrency Challenge](../Stage-05-Mixed-Concurrency/CASE.md)
- [Stage 05 RTOS Refactor Boss](../../05-Projects/Intermediate/Stage-05-Boss-RTOS-Refactor/PROJECT.md)
