# Debugging Case — HardFault After Pointer Write

## Symptom

系统启动正常，执行某个配置函数后立即进入 `HardFault_Handler`。

## Context

目标是 Cortex-M MCU，现场可以通过 Debugger 读取异常堆栈和 Fault Status。不同 Cortex-M 型号支持的具体 Fault 寄存器可能不同，下面的证据只代表调查样例。

## Evidence

```c
uint32_t *config = 0;
...
*config = 0x12345678;
```

Debugger：异常前最后一条相关 C 语句是对 `*config` 的写入。Stacked PC 指向该写操作附近。

## Hypotheses

- 配置指针为空或未初始化；
- Fault 由其他中断或时序问题引起，指针写入只是巧合；
- Debugger 停止位置与真正破坏现场的位置不一致。

## Experiments

1. 不 Reset，保存 Stacked PC、LR、xPSR；
2. 读取适用的 Fault Status Registers；
3. 检查 Fault Address 是否有效；
4. 将 PC 映射回反汇编和源码；
5. 对 `config` 设置 Watchpoint 或在写入前检查地址；
6. 修复后重新执行同一配置路径，并验证正常配置对象仍可写入。

## Root Cause

空指针被当作有效目标地址解引用并写入。具体 fault 分类取决于 Cortex-M 型号、地址映射和 fault 配置；HardFault 是异常入口，不是最终根因名称。

## Fix

在配置函数入口建立对象生命周期和指针有效性契约：

- 由调用者传入已初始化的配置对象；
- 在允许的边界内检查空指针；
- 不用“HardFault 时自动重启”替代错误处理；
- 保留必要的 fault record，再进入安全停机或受控恢复。

## Verification

- Stacked PC 不再落在非法写入；
- 有效配置对象仍能完成写入和后续初始化；
- 空指针路径得到明确错误或安全停机；
- 连续执行正常路径和错误路径，Fault Record 不被静默覆盖。

## Prevention

代码评审检查指针所有权和生命周期；对关键配置结构加入初始化标记、地址范围检查和测试用例；保留可追溯的异常现场记录。

## Lesson

从 Stacked PC 回到故障指令，再解释该指令访问的地址。不要把解决方案写成“HardFault 时重启”。

## Learning Links

- [Stage 04 — Debug Hunter](../../02-Learning-Path/Stage-04-Debug-Hunter/README.md)
- [Mission — Fault Scene](../../04-Missions/Stage-04-Debug-Hunter/01-Fault-Scene/Mission.md)
- [Cortex-M Fault Model](../../01-Knowledge-Base/Debugging/02-Cortex-M-Fault-Model.md)
- [Evidence-Driven Debugging](../../01-Knowledge-Base/Debugging/01-Evidence-Driven-Debugging.md)
- [Stage 04 Boss Project](../../05-Projects/Intermediate/Stage-04-Boss-Broken-Firmware/PROJECT.md)
