# Debugger Watchpoint — 从“最后哪里坏了”追到“谁第一次写坏它”

Breakpoint 更适合回答：

```text
程序什么时候执行到这里？
```

Watchpoint（数据断点 / Data Watchpoint）更适合回答：

```text
谁访问或修改了这个内存地址？
```

它是 Stage 04 从 Control Flow（控制流）转向 Data Flow（数据流）调查的重要工具。

---

## 1. 为什么全局搜索赋值语句经常不够

假设：

```c
uint8_t system_state;
```

偶尔从合法值变成：

```text
0x7F
```

搜索：

```text
system_state =
```

可能什么也找不到，因为真正的写入者可能是：

```text
array overflow
wrong pointer
memcpy length error
DMA destination / count error
stack corruption
alias pointer
```

最终被改的是同一个地址，但源码不一定显式写出变量名。

因此调查对象应该从：

```text
variable name
```

升级到：

```text
memory address
```

---

## 2. Watchpoint 的基本模型

典型流程：

```text
Corrupted Object
↓
Find its address
↓
Set data watchpoint on write/access
↓
Continue execution
↓
CPU performs matching access
↓
Debugger halts near first write
↓
Inspect PC / Call Stack / source / old-new value
```

这样你抓到的是“写入时刻”，而不是几秒后某个函数才发现值异常。

---

## 3. Breakpoint vs Watchpoint

### Breakpoint

基于代码位置：

```text
when PC reaches address X → halt
```

适合：

- 某函数有没有执行；
- 某分支有没有进入；
- 某 ISR 有没有触发；
- 某初始化步骤是否完成。

### Watchpoint

基于数据地址：

```text
when CPU reads/writes address Y → halt
```

适合：

- 谁修改了状态变量；
- 哪一次写入越过了边界；
- 某寄存器/内存何时第一次变；
- 为什么值在未知时刻被破坏。

---

## 4. First Bad State

假设：

```text
10:00.000 buffer is correct
10:00.100 unknown write corrupts memory
10:03.000 function returns using corrupted state
10:03.001 HardFault
```

如果只看最终 HardFault，你看到的是：

```text
last visible failure
```

Watchpoint 的价值是尽量前移到：

```text
first bad write
```

Stage 04 的一个重要原则：

> 能抓第一次状态变坏，就不要满足于最后一次系统崩溃。

---

## 5. 一个越界写例子

```c
uint8_t data[8];
uint8_t system_state = 1;

for (int i = 0; i < 16; i++)
{
    data[i] = 0xAA;
}
```

真实布局取决于编译器和优化，不能假设 `system_state` 一定紧邻 `data`。

但如果调查确认某次越界确实覆盖了目标地址，Watchpoint/Memory View 可以帮助回答：

```text
哪一条写指令？
从哪个 pointer/address 写？
Call Stack 是什么？
循环 index 是多少？
```

这比最后看到 `system_state == 0xAA` 更接近根因。

---

## 6. Watchpoint 有边界

硬件 Watchpoint 不是万能的。

常见限制：

- 数量有限；
- 支持的访问大小/对齐依架构与 Debugger；
- 某些访问可能需要特定配置；
- 高优化代码下源码行和实际指令关系可能不直观；
- 某些调试器会明显改变实时行为；
- DMA 等非 CPU Bus Master 的写入未必触发 CPU Data Watchpoint。

因此：

```text
Watchpoint never hit
+ memory still changed
```

不是“证明没人写”，而是新的证据。

它应该推动你更新 Hypothesis Tree。

---

## 7. CPU 之外还有谁能写内存

Stage 03 已经学过 DMA。

因此 Memory Writer Map 不能只写函数名：

```text
Target RAM Address
├─ CPU normal stores
├─ memcpy / library
├─ ISR / callback
├─ DMA
├─ other bus master（平台相关）
└─ debugger / test mechanism（特殊场景）
```

如果 CPU Watchpoint 没命中，而 DMA Destination/Length 指向目标区域，就应该把调查转向 DMA Contract。

---

## 8. Memory View 与 Guard Evidence

Watchpoint 不是唯一方法。

还可以使用：

### Memory View

观察目标对象周围是否存在模式化覆盖：

```text
AA AA AA AA AA ...
```

可能提示 memcpy / buffer fill / DMA 等行为。

### Guard / Canary

在 Buffer 两侧放已知 Pattern：

```text
GUARD_A | buffer | GUARD_B
```

如果 Guard 改变，可以证明存在越界，但不一定直接告诉你写入者。

### Stack Pattern / High-water mark

帮助判断 Stack 是否接近或越过边界。

### MPU / Protection（平台支持时）

可以把部分非法访问更早转成可捕获异常。

Stage 04 先理解用途，不要求所有 MCU 都实现相同保护机制。

---

## 9. Call Stack 是关键现场

Watchpoint 命中后不要只看：

```text
当前源码行
```

还要记录：

```text
PC
Call Stack
pointer/address
old value
new value
loop/index/length
caller arguments
```

写坏内存的函数可能只是被错误参数调用，真正设计问题可能在上一层。

---

## 10. Watchpoint 也可能是 intrusive 的

Debugger Halt 会停止 CPU，但外部硬件/网络/其他设备可能继续变化，具体依平台而定。

因此 Watchpoint 命中后的现场并不永远等价于“真实无人观察时系统的持续行为”。

实时性很强的问题需要考虑：

- Halt 是否改变外设时序；
- Watchpoint 是否只用于定位写入者；
- 是否还需要 trace / event log / test pin 等非停止式证据。

---

## 11. 标准 Data Corruption Investigation

```text
1. 精确确认哪个对象/地址先变坏
2. 记录正常值和异常值
3. 画 Writer Map：谁可能写这里
4. CPU writer 可疑 → Watchpoint
5. DMA/non-CPU writer 可疑 → 检查 destination/count/request
6. 命中时保存 PC / Call Stack / arguments
7. 找到导致非法写的 contract/boundary error
8. 做最小修复
9. 用原触发条件回归
10. 验证 Guard / Memory 邻域保持稳定
```

---

## 12. Stage 04 的能力目标

从：

```text
“哪个函数看起来最可疑？”
```

升级到：

```text
“哪个地址最先变坏？
有哪些 writer 能触达它？
我怎样在第一次非法写入处抓住证据？”
```

这就是数据流调试。