# Mission 00 — First Contact：先证明你真的控制住了这颗 MCU

## Beginner Guide

- 适合：完成 Stage 01 Exit Check、第一次接触真实开发板的学习者；
- 前置：确认板卡、IDE、Debug Probe 和工程来源；
- 预计：60 分钟；
- 本关产出：Build、Flash、Reset、Run、Breakpoint 证据记录；
- 上一关：Stage 01 Exit Check；当前关：First Contact；下一关：First LED。

## What to Submit

使用 [Learning Record Template](../../../docs/LEARNING-RECORD-TEMPLATE.md)，补充 Board、MCU、Probe、Build、Flash 和 Breakpoint 证据。

## If You Are Stuck

先看 [Stage 02 Hardware Setup](../../../02-Learning-Path/Stage-02-MCU-Rookie/HARDWARE-SETUP.md) 和 [Recovery Guide](../../../02-Learning-Path/Stage-02-MCU-Rookie/RECOVERY-GUIDE.md)，不要先换 LED 代码。

## Ready to Continue

能够分别证明 Build、Flash、CPU Run 和 Breakpoint 后，再进入 First LED。

## Mission Brief

你拿到一块开发板，安装好开发环境，新建了一个最小工程。

这时候很多教程会直接说：

> “写几行代码，把 LED 点亮。”

但在真正工程里，更重要的第一步是先证明：

```text
PC
→ Build
→ Firmware
→ Debug Probe
→ MCU Flash
→ CPU Run
→ Breakpoint
```

这条链真的成立。

如果连 CPU 有没有运行都无法证明，后面 LED 不亮时就会陷入猜测。

---

## 0. Before You Start

第一次看到这些词时先建立最小概念：

- MCU：包含 CPU、Memory 和很多外设模块的微控制器；
- Development Board：把 MCU、电源、调试接口、LED/按键等做成便于实验的板子；
- Firmware：最终写入 MCU Flash、由 CPU 执行的程序；
- Debug Probe：PC 和 MCU 调试接口之间的桥梁，例如 ST-LINK/J-Link；
- Build：在 PC 上把源码生成 Firmware；
- Flash / Program：把 Firmware 写入 MCU；
- Reset：让 MCU 从复位状态重新开始；
- Breakpoint：CPU 执行到指定位置时暂停，方便观察现场。

先读：[MCU Bring-up](../../../01-Knowledge-Base/MCU/00-MCU-Bring-Up.md)

---

## 1. Predict

先回答：

1. 工程 Build 成功，能不能证明程序已经写进开发板？
2. Flash 成功，能不能证明 `main()` 正在执行？
3. LED 不亮时，为什么 Breakpoint 比“再换一份点灯代码”更有价值？

---

## 2. Observe — 建立最小运行证据

写一个非常简单的程序状态变量，例如：

```c
volatile unsigned int boot_count = 0;

int main(void)
{
    boot_count++;

    while (1)
    {
    }
}
```

具体启动代码和工程模板由目标平台提供，本 Mission 不要求手写 Startup 文件。

完成：

```text
Build
→ Flash / Download
→ Reset
→ Run
```

然后在 `boot_count++` 或 `while (1)` 附近设置 Breakpoint。

### Evidence

记录：

```text
Build result:
Flash result:
Breakpoint hit: YES / NO
boot_count value:
Debugger connected: YES / NO
```

目标是第一次建立“我知道 CPU 走到了这里”的证据。

---

## 3. Explain — 区分四个动作

用自己的话解释：

```text
Build
Flash
Reset
Run
```

尤其回答：

> 为什么 Build Success 和 Program Running 是两件完全不同的事？

---

## 4. Break It — 故意破坏链路

只选你当前平台安全、可恢复的方式，故意制造至少两个故障。

例如：

### Fault A — 不重新 Flash

修改一个明显的变量初值，只 Build，不下载到板子。

观察板上运行的到底还是旧 Firmware，还是新 Firmware。

### Fault B — Breakpoint 放在不会执行的位置

让程序走另一条分支，再观察 Breakpoint 为什么永远不命中。

### Fault C — Debug Session 没有真正 Run

暂停 CPU 后观察变量不再变化。

目的不是“玩坏板子”，而是理解每一层的责任。

---

## 5. Debug — CPU 到底在哪儿？

假设现象是：

> Flash 显示成功，但 `main()` 里的 Breakpoint 一直不命中。

不要直接说“程序坏了”。

建立调查顺序：

```text
Debugger connected?
↓
CPU halted or running?
↓
Reset behavior?
↓
Program Counter 在哪里？
↓
是否进入 startup / fault / unexpected loop?
↓
main 是否真正被执行？
```

Program Counter（PC）是 CPU 当前正在执行哪条指令的地址。这里只需要知道它可以帮助回答：**CPU 现在到底在哪儿。**

---

## 6. Transfer — 接到 Stage 01

Stage 01 中你已经学过：

```text
C Source
→ Compiler
→ Object
→ Linker
→ Executable
```

现在把它继续往真实世界延伸：

```text
C Source
→ Build
→ Firmware
→ MCU Flash
→ CPU executes
→ Peripheral Register
→ Pin
→ Voltage
```

这就是从“软件模型”跨进真正 Embedded 的第一步。

---

## 7. Mission Report

提交一页记录：

```text
Board / MCU:
Debug probe:
Build tool / IDE:
Build evidence:
Flash evidence:
Breakpoint evidence:
Where CPU stopped:
Two failures I intentionally created:
What each failure proved:
```

不要只贴“下载成功”的截图，必须说明每条证据证明了哪一层。

---

## Achievement Unlocked

完成这一关后，你应该能明确区分：

```text
源码能编译
≠
程序已经烧录
≠
CPU 正在运行
≠
某个外设已经工作
```

下一关：**Mission 01 — First LED**。在那里第一次把 CPU 运行证据继续推进到 GPIO Register、Physical Pin 和真实电压。
