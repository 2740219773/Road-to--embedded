# Stage 01 Boss Project — Virtual GPIO Controller

## 目标

在没有真实 MCU 的情况下，用普通 C 程序模拟一组 GPIO 寄存器和设备状态，把 Stage 01 五关知识真正组合起来。

这不是“再做一道练习题”，而是第一次要求你自己组织一个小工程。

---

## System Model

```text
User Command / Simulated Event
            ↓
        Application
            ↓
   Virtual GPIO Driver
            ↓
32-bit Virtual Register
            ↓
 LED0 ... LED7 State

External Event / ISR Simulation
            ↓
      volatile Flag
            ↓
       Device State
```

## Minimum Requirements

### 1. Virtual Register

使用一个 32-bit 整数模拟 GPIO Output Register。

必须支持：

- Set bit N；
- Clear bit N；
- Toggle bit N；
- Read current value；
- 打印 8 路虚拟 LED 状态。

不能通过 8 个独立 `if` 变量逃避位运算。

### 2. Pointer Access

至少有一处通过 Pointer 访问虚拟寄存器，并能够解释：

```text
Pointer 保存什么？
Dereference 做什么？
最终改的是哪块 Memory？
```

### 3. Device Struct

使用 `struct` 保存至少：

```text
name / id
register pointer
mode/state
error/status
```

打印 `sizeof` 和关键成员地址，并记录一次布局观察。

### 4. External State

用一个函数或单独执行路径模拟“硬件/ISR 在主流程之外改变 flag”。

在设计说明中解释为什么这里使用 `volatile`，以及它没有保证什么。

### 5. Multi-file Project

至少拆分为：

```text
main.c
gpio.c
gpio.h
device.c
device.h
```

文件名允许不同，但职责必须分开。

能够解释 Header、Declaration、Definition 和 Linker 的关系。

---

## Required Failure Injection

必须主动制造并记录至少四个故障：

1. 用 `=` 代替 `|=`，导致其他 bit 被清掉；
2. 一个错误 Pointer 或数组越界导致状态异常；
3. 一个 `volatile` / 外部状态观察问题；
4. 一个 `undefined reference` 或 `multiple definition` 链接问题。

每个故障都必须按下面格式记录：

```text
Symptom
Expected
Hypothesis
Evidence
Root Cause
Minimal Fix
Regression
```

---

## Optional Challenge

增加一个简单 Command Interface：

```text
set 3
clear 1
toggle 7
status
```

让程序根据用户输入控制虚拟 GPIO。

如果已经会 C#，可以选做一个简单上位机通过 stdin/stdout 或 socket 控制这个 C 程序，但它不是 Stage 01 通过条件。

---

## Acceptance Criteria

项目通过需要同时满足：

- 功能能运行；
- 能画出 Register / Pointer / Struct 的 Memory 关系；
- 能解释 `volatile` 的使用原因和边界；
- 能解释多文件如何经过 Compile / Link 生成最终程序；
- 四个故障有证据链；
- 修复后完成回归；
- 不依赖“复制一份正确代码”作为主要完成方式。

## Final Demo

最终演示建议控制在 5 分钟内：

```text
1. 展示系统结构
2. 控制几个 LED bit
3. 展示 struct / pointer
4. 触发一次外部事件
5. 展示一个故障和定位过程
6. 解释它怎样映射到未来真实 MCU GPIO
```

## Transfer to Stage 02

真实 MCU 中：

```text
Virtual uint32_t register
→ Real Peripheral Register

Normal pointer
→ Fixed hardware address

Terminal output
→ Physical pin voltage / LED
```

Stage 02 要做的，就是把这里的虚拟模型替换成真实硬件。