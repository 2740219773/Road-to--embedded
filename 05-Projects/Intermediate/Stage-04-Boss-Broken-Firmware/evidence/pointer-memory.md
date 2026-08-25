# Evidence Pack — Pointer / Memory

## Symptom

system_state 从 RUN 变成 0x7F，直接搜索没有找到赋值。

## Static / Host Evidence

```text
system_state: 0x20001020
neighboring boundary: 0x2000101F
host fixture: write 9 bytes into an 8-byte neighbor model
result: one explicit overwrite record
```

模型用显式边界计数替代真实未定义内存写。
