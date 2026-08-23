# Current Progress

## Project Version

V2.3 — Stage 02 MCU Rookie

## Completed Baselines

- [x] V2.1 — Architecture Refactor merged to `main`;
- [x] V2.2 — Stage 01 Interactive Pilot merged to `main`;
- [x] Stage 01 now has Mission 01～05, Debug Challenge, Boss Project and Exit Check.

## Current Work — V2.3

目标：第一次把 Stage 01 的虚拟模型接到真实 MCU。

```text
Virtual Register
→ Real Peripheral Register
→ GPIO Hardware
→ Physical Pin
→ Voltage
→ LED / Button / Instrument
```

### P0 — Real Hardware Entry

- [ ] 建立开发板 / MCU / Debug Probe / Firmware 的最小系统认知；
- [ ] 建立 Build → Flash → Reset → Run → Breakpoint 的完整链路；
- [ ] 明确推荐参考平台与“可替代开发板”原则；
- [ ] 完成 Stage 02 Mission 00 — Bring-up / First Contact；

### P1 — GPIO / Clock / Debugger

- [x] 已有 GPIO beginner knowledge 原型；
- [x] 已有 Clock Tree beginner knowledge 原型；
- [x] 已有 Mission — First LED 原型；
- [ ] 将 First LED 按 V2.2 教学节奏重构；
- [ ] 增加真实电压测量和 Schematic 证据要求；
- [ ] 建立 Debugger 基础知识页；

### P2 — Interrupt / Timer / PWM

- [x] 已有 Interrupt beginner knowledge 原型；
- [x] 已有 Timer/PWM beginner knowledge 原型；
- [x] 已有 PWM Visualizer；
- [ ] 建立 Button / Interrupt Mission；
- [ ] 建立 Timer Mission；
- [ ] 建立 PWM 真机测量 Mission；

### Integration

- [x] 已有 Stage 02 Boss — GPIO Control Node 原型；
- [ ] 让 Boss 与新的 Mission 顺序一致；
- [ ] 增加 Stage 02 Debug Challenge；
- [ ] 增加 Stage 02 Exit Check；
- [ ] 完整走查从 Stage 01 Exit → 开发板 Bring-up → Boss 的新人路径。

## Current Rule

V2.3 优先建立“真实硬件第一闭环”。UART / ADC / SPI / I2C / DMA 等已有样板暂不扩展，等 GPIO / Clock / Interrupt / Timer / Debugger 路线稳定后再进入 Stage 03。
