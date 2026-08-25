# Evidence Pack — DMA / Buffer

## Symptom

DMA Complete 正常，但 Buffer 后的状态被破坏。

## Static / Host Evidence

```text
capacity = 4 half-words
requested = 8 half-words
moved = 4
overflow records = 4
```

DMA Complete 只代表请求数量完成，不代表目标边界安全。
