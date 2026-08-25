# Stage 02 Exit Check — 你真的能控制真实 MCU 了吗？

Stage 02 的目标不是“会点灯”，而是确认你已经能从代码一路追到真实引脚和测量结果。

如果下面的问题只能靠背答案，而不能自己解释或测量，建议回到对应 Mission。

---

## Part A — Bring-up

1. Build、Flash、Reset、Run 分别是什么？
2. 为什么“烧录成功”不能证明 CPU 正在按预期运行？
3. 如何用 Breakpoint 证明当前 Firmware 已经执行到某个位置？
4. Flash 和 RAM 在最基础层面分别扮演什么角色？

---

## Part B — GPIO / Physical World

解释下面这条链：

```text
C Code
→ Register
→ GPIO Hardware
→ Pin
→ Voltage
→ LED
```

然后回答：

- Output Register = 1 时，为什么 Pin 仍可能不是 High？
- Pin 电压正确时，为什么 LED 仍可能不亮？
- 为什么需要看 Schematic？
- 万用表和示波器分别更适合观察什么？

---

## Part C — Interrupt

画出：

```text
Button
→ Pin Voltage
→ GPIO Input
→ Edge
→ Interrupt Request
→ CPU
→ ISR
→ Main State
```

能够解释：Polling、Interrupt、ISR、Priority、Bounce，以及为什么 ISR 通常应该短。

---

## Part D — Timer / PWM

给出一个 Timer 配置后，能够从 Clock、Prescaler、Counter、Period 计算预期事件周期。

然后解释：

```text
Timer running
≠ Timer interrupt working
```

以及：

```text
PWM configured
≠ Physical PWM waveform verified
```

必须知道怎样用示波器测 Frequency、Period、High Time 和 Duty Cycle。

---

## Part E — Debug Classification

### Case 1

新代码已经 Build，但板子行为完全和上一版一样。

第一步优先验证什么？

### Case 2

GPIO Output Register 正常变化，但 Pin 始终 0 V。

问题最可能已经从哪一层移动到哪一层？

### Case 3

按钮按一次产生多个事件。

应该先想到哪些物理/软件原因？

### Case 4

Timer ISR 正常进入，但实际周期是目标值的两倍。

优先检查哪些时钟与分频参数？

### Case 5

PWM Counter 和 Compare 正常，但引脚没有波形。

下一步检查什么？

---

## Passing Standard

建议至少满足：

- 完成 Mission 00～04；
- 完成 Stage 02 Mixed Debug Challenge；
- 完成 GPIO Control Node Boss；
- 至少独立完成一次 Debugger + 万用表/示波器联合定位；
- 至少记录 5 条 Evidence-driven Debug 记录；
- 能从 Schematic 找到 LED/Button 与 MCU Pin 的连接关系；
- 能用计算 + 仪器证明一个 Timer/PWM 时序。

## Ready for Stage 03

当你看到一个新外设问题时，脑子里已经会自动出现：

```text
Clock
→ Peripheral
→ Register
→ Pin / Bus
→ Electrical Signal
→ External Device
```

就可以进入 Stage 03 — Peripheral Engineer。

Stage 03 不会推翻 Stage 02，而是在这条真实硬件证据链上继续增加 UART、I²C、SPI、ADC、DMA、CAN、Modbus 等外设。
