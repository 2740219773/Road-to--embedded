# Evidence Pack — Interrupt Storm

## Symptom

主循环几乎不运行，ISR entry counter 快速增加。

## Static / Host Evidence

```text
pending = asserted
ISR clear/ack = missing
host fixture: 4 cycles -> 4 ISR entries, 0 main-loop ticks
```

## Regression

补齐外设专属 clear/acknowledge 后，下一次进入 ISR 应解除 pending，主循环恢复运行。
