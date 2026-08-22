# Debugging Case — Lost Update in RTOS

## Related

- [Stage 05 — RTOS Engineer](../../02-Learning-Path/Stage-05-RTOS-Engineer/README.md)
- [Mission — Race Condition](../../04-Missions/Stage-05-RTOS/01-Race-Condition/Mission.md)
- [Knowledge — Race Condition](../../01-Knowledge-Base/RTOS/04-Race-Condition.md)
- [Lab — Race Interleaving Visualizer](../../03-Interactive-Labs/Race-Interleaving-Visualizer/)

## Symptom

两个 Task 分别对共享 `counter` 增加 1000 次，最终值低于 2000，并且每次运行结果不同。

## Evidence Pack

- 两个 Task 都正常运行；
- 没有 crash；
- `counter` 声明为 `volatile uint32_t`；
- 在单 Task 模式下结果稳定为 1000；
- 开启两个 Task 后偶发丢失更新。

## Your Task

解释为什么 `volatile` 没有解决问题，并给出至少两种可验证的修复方案。

## Diagnosis

两个 Task 对非原子的 read-modify-write 操作发生交错，导致后写入的一方覆盖前一方更新。

## Verification

分别用 Critical Section / Mutex / Atomic（若平台和场景合适）或单一 owner + Queue 设计验证，并比较实时性和耦合度。

## Lesson

并发错误不一定 crash，它更常表现为“偶尔不对”。