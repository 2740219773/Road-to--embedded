# Debugging Case — HardFault After Pointer Write

## Symptom

系统启动正常，执行某个配置函数后立即进入 HardFault_Handler。

## Evidence Pack

```c
uint32_t *config = 0;
...
*config = 0x12345678;
```

Debugger：异常前最后一条相关 C 语句是对 `*config` 的写入。

Stacked PC 指向该写操作附近。

## Your Task

1. `config` 当前保存的地址是什么？
2. `*config = ...` 要求 CPU 做什么？
3. 为什么“进入 HardFault_Handler”不是根因描述？
4. 还应查看哪些 fault status / address evidence？

## Diagnosis

空指针被当作有效目标地址解引用并写入。具体 fault 分类取决于 Cortex-M 型号、地址映射和 fault 配置，但根因是程序试图通过无效指针访问不允许的地址。

## Lesson

从 Stacked PC 回到故障指令，再解释该指令访问的地址。不要把解决方案写成“HardFault 时重启”。