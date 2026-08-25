# Debugger Basics — 程序到底有没有跑到这里？

## Debugger 是什么

Debugger（调试器）是一套让你暂停、观察、单步执行程序的工具。在 MCU 开发里，它通常通过 Debug Probe（调试器硬件，例如板载 ST-LINK、J-Link 等）连接芯片。

它最大的价值不是“出错时看看变量”，而是帮你回答很多最基础的问题：

```text
程序有没有真的运行？
运行到哪里？
变量现在是什么值？
寄存器现在是什么状态？
哪一条指令之后现象开始不对？
```

## Breakpoint 是什么

Breakpoint（断点）可以先理解成“让 CPU 跑到某个位置时暂停”。

例如你在 `main()` 里某行设置断点，程序真正停在那里，就至少证明：

```text
代码已编译
→ 已烧录
→ MCU 已启动
→ CPU 已执行到这一行
```

这比“LED 没亮，所以程序应该没跑”可靠得多。

## Step Into / Step Over

- Step Over：执行当前这一行，如果里面调用函数，一般不进入函数内部；
- Step Into：如果当前行调用函数，则进入函数内部继续观察。

初学阶段不需要频繁单步所有代码。单步只是为了验证某段关键控制流。

## Watch / Variables

Debugger 通常可以观察局部变量、全局变量和表达式。

如果代码里写：

```c
counter++;
```

可以在前后暂停，观察 `counter` 是否真的变化。

这把 Stage 01 的“Memory / Variable”连接到了真实 MCU RAM。

## Register View

MCU 调试器通常还能直接查看 CPU 和 Peripheral Register（外设寄存器）。

例如 GPIO 配置后，可以观察：

```text
Clock Enable Register
GPIO Mode Register
GPIO Output Register
```

这样你就能区分：

```text
代码看起来配置了
≠
硬件寄存器真的已经是那个值
```

## Memory View

Memory View 可以直接查看某段地址里的数据。

Stage 01 里你已经学过：

```text
Variable
→ Memory
→ Address
```

现在 Debugger 让这个关系第一次变成可直接观察的工具。

## Call Stack 是什么

当程序调用很多层函数时，Call Stack 可以显示当前是从哪些函数一路调用到这里的。

Stage 02 只需要知道它能回答：

> “程序为什么会走到当前函数？”

后面 Stage 04 调试异常和 HardFault 时，会再次系统使用它。

## Debugger 的边界

Debugger 很强，但它只能告诉你软件和部分硬件状态。

例如 Output Register 已经是 1，并不能证明引脚上真实电压一定是高电平。

因此调试嵌入式系统经常需要把 Debugger 和真实测量工具配合：

```text
Debugger → 软件/寄存器证据
Multimeter → 静态电压证据
Oscilloscope → 随时间变化的电压/波形证据
Logic Analyzer → 数字时序/协议证据
```

## Stage 02 的最低要求

你不需要掌握高级 Debugger 功能，但至少要会：

1. 设置 Breakpoint；
2. Run / Pause；
3. Step Over / Step Into；
4. 查看变量；
5. 查看 Peripheral Register；
6. 知道什么时候应该离开 Debugger，去测真实 Pin Voltage。

下一步把这些能力用于 Mission 01 — First LED。
