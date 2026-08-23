# MCU Bring-up — 第一次让一块开发板真正跑起来

## 先用一句人话理解

Bring-up 可以理解成“第一次把一块硬件从上电状态带到可控、可调试、能运行自己程序的状态”。

对于初学者，第一次真正接触 MCU 时，最重要的不是马上点灯，而是先确认这条链路真的成立：

```text
PC
↓
IDE / Build Tool
↓
Compiler / Linker
↓
Firmware
↓
Debug Probe
↓
MCU Flash
↓
CPU Reset / Run
↓
Breakpoint / Register / Pin
```

如果这条链路没有打通，后面的 GPIO、UART、Timer 都没有稳定基础。

## MCU 是什么

MCU（Microcontroller Unit，微控制器）是一颗把 CPU、Memory 和很多 Peripheral（外设模块）集成在一起的芯片。

可以先把它理解成一台非常小的专用电脑：

```text
MCU
├─ CPU
├─ Flash
├─ RAM
├─ GPIO
├─ Timer
├─ UART
├─ ADC
└─ ...
```

CPU 负责执行程序；Flash 保存固件；RAM 保存运行中的数据；GPIO/Timer/UART 等模块负责和真实世界交互。

## Development Board 是什么

MCU 芯片本身只是一个芯片。为了让人更容易供电、下载、调试和接线，厂商或第三方会把 MCU、晶振、电源、USB、LED、按键、调试接口等做成一块 Development Board（开发板）。

所以“开发板”和“MCU”不是完全同一个东西：

```text
Development Board
= MCU + Power + Clock + Connectors + LEDs/Buttons + Debug Circuit + Other Components
```

## Debug Probe 是什么

Debug Probe（调试器/调试探针）是 PC 和 MCU 调试接口之间的桥梁，例如 ST-LINK、J-Link、CMSIS-DAP。

它常负责：

- 下载 Firmware；
- Reset MCU；
- Run / Halt；
- 设置 Breakpoint；
- 读取 Register / Memory；
- 单步执行。

很多开发板已经自带调试器，因此你可能只插一根 USB 线就能完成这些操作。

## Firmware 是什么

Firmware（固件）是最终写入 MCU Flash、由 MCU 执行的程序。

Stage 01 中你已经学过：

```text
C Source
→ Compiler
→ Object Files
→ Linker
→ Executable
```

到了 MCU，这条链继续变成：

```text
ELF / HEX / BIN
→ Program / Flash
→ MCU Flash Memory
→ CPU executes instructions
```

## Flash 和 RAM 先怎么理解

- Flash：断电后程序通常还能保留，主要保存代码和只读数据；
- RAM：运行时使用，断电后内容通常消失。

第一次 Bring-up 不要求深入 Linker Script，只需要能回答：程序最终写到了哪里，CPU 复位后从哪里开始执行。

## Build / Flash / Run 不是同一件事

这是新手非常容易混淆的地方。

```text
Build
= 在 PC 上把源码变成 Firmware

Flash / Program
= 把 Firmware 写入 MCU

Run
= 让 MCU CPU 执行已经写入的 Firmware
```

因此：

> Build 成功 ≠ 已经写进开发板。

> Flash 成功 ≠ 程序逻辑一定正确。

> 程序在 Run ≠ 目标 GPIO 一定配置正确。

后面的 Debugging 都依赖这种分层。

## Breakpoint 是什么

Breakpoint（断点）可以理解成告诉 Debugger：

> CPU 执行到这里时先停下来，让我看看现场。

停下后，你可以观察：

- 当前代码位置；
- Variable；
- CPU Register；
- Memory；
- Peripheral Register。

它是证明“程序有没有真的走到这里”的重要证据工具。

## 第一次 Bring-up 的成功标准

不要把“LED 亮了”当作唯一成功标准。

更基础的成功链应该是：

```text
1. PC 能识别 Debug Probe
2. 工程能 Build
3. Firmware 能 Flash
4. MCU 能 Reset
5. CPU 能 Run
6. Breakpoint 能命中
7. Variable / Register 能观察
```

做到这里，才算真正拥有一个可调试的 MCU 环境。

## 关于开发板型号

本项目不希望把学习路线绑死在唯一型号上。

推荐选一块资料丰富、板载调试器方便、GPIO/LED/按键容易观察的 STM32 开发板作为参考平台，但 Mission 会尽量写成“能力导向”：

```text
你需要知道目标 LED 在哪个 Pin
而不是死记某块板一定是 PA5
```

不同开发板只要能完成相同证据链，就可以替代。

下一步进入 Stage 02 Mission 00 — First Contact，亲手证明 Build → Flash → Run → Breakpoint 这条链成立。