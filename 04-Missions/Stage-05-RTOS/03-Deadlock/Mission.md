# Mission — Two Locks, No Progress

## Scene

Task A 与 Task B 都还存在，系统没有 crash，但两个关键功能永远不再推进。

```text
Task A: owns Mutex A → waits Mutex B
Task B: owns Mutex B → waits Mutex A
```

## Investigation

1. 记录两个 Task 当前 State。
2. 记录每个 Mutex 的 Owner。
3. 画 Wait-for Graph。
4. 找出 Circular Wait。

## Break It

让 A 按 A→B 顺序取锁，让 B 按 B→A 顺序取锁，复现 deadlock；然后统一成固定顺序 A→B，再验证是否消失。

## Boss

解释 Timeout 为什么可能帮助系统恢复，却不一定消除设计中的 circular wait 根因。

## Achievement

看到“系统没死机但业务停了”时，会检查 blocked task 和资源依赖，而不是只看 CPU 是否仍在运行。