# Stage 01 Debug Challenge — Five Clues, One Broken Program

## Scenario

你拿到一个 PC 上运行的“虚拟 GPIO 控制器”。它本来应该：

- 用一个 32-bit 虚拟寄存器表示 8 路 LED 输出；
- 用 `struct` 保存设备状态；
- 用一个外部事件变量模拟硬件/ISR 改变状态；
- 拆成多个 `.c/.h` 文件；
- 正常 Build 并打印当前寄存器和设备状态。

但现在工程同时存在多个问题。

这一次没有按知识点分关。你要像真正调试工程一样，先判断现象属于哪一层。

---

## Fault A — 开一个 bit，其他 bit 全没了

现象：

```text
Before: 0xA1
Set bit5
After : 0x20
```

你需要判断这是：

- Pointer 问题？
- Bit operation 问题？
- Struct layout 问题？
- Linker 问题？

写出证据和最小修复。

---

## Fault B — 外部事件已经发生，主循环状态却像没更新

现象：模拟 ISR/外部事件会修改一个共享 flag，但优化构建下主循环行为与预期不一致。

任务：

1. 找出“这个值可能被当前代码流之外改变”的事实；
2. 说明为什么 `volatile` 可能与这个问题有关；
3. 同时说明 `volatile` 为什么不能自动解决线程安全或原子性。

---

## Fault C — 发出去的结构体字节数和想象的不一样

现象：

```c
typedef struct {
    uint8_t channel;
    uint32_t value;
    uint8_t status;
} Sample;
```

程序把 `sizeof(Sample)` 个原始字节写入文件，结果协议分析工具显示长度与手工相加不一致。

任务：画出你当前平台上的成员地址与 Padding，并解释为什么“直接发送 struct 内存”不是稳健协议设计。

---

## Fault D — 头文件里明明声明了函数，还是 undefined reference

现象：

```text
undefined reference to `gpio_set`
```

`gpio.h` 中存在：

```c
void gpio_set(unsigned bit);
```

任务：证明 Declaration 不等于 Definition，并检查真正实现所在 `.c` 是否参与 Build。

---

## Fault E — 一个状态变量莫名其妙变了

现象：某次修改数组后，旁边的设备状态字段出现异常。

不要只搜索 `device.status =`。

先画：

```text
Array
Device struct
Addresses
```

检查是否存在越界写入或错误 Pointer。

---

## Investigation Rules

每个 Fault 都必须留下：

```text
Symptom:
Expected:
Layer:
Hypotheses:
Measurement / observation:
Evidence:
Root cause:
Minimal fix:
Regression check:
```

禁止通过“大改一遍直到能运行”作为通过方式。

---

## Knowledge Map

- Memory / Pointer：`01-Knowledge-Base/C/01-Data-Address-Memory.md`、`02-Pointers-and-Hardware.md`
- Bit / Register：`03-Bitwise-and-Registers.md`
- volatile：`04-volatile-const-static.md`
- Struct Layout：`05-Struct-Enum-Typedef.md`
- Compile / Link：`08-Compilation-and-Linking.md`

## Acceptance

通过标准不是“五道题答对”，而是面对混合现象时能先判断问题属于：

```text
Data / Memory
Bit / Register
External State
Layout
Build / Link
```

并知道下一步应该观察什么。

完成后进入 Stage 01 Boss：Virtual GPIO Controller。
