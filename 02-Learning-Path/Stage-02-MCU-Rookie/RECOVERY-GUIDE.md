# Stage 02 Recovery Guide — 新手故障恢复手册

先记录现象，再一次只检查一层。不要在没有证据时连续更换工程、Pin 和时钟配置。

| 现象 | 第一检查 | 继续证据 |
|---|---|---|
| 电脑识别不到板子 | USB 线是否支持数据、板卡是否上电 | 设备管理器、Probe 指示灯、IDE Probe 状态 |
| 找不到 Debug Probe | 驱动、USB 连接、板载 Probe 开关/跳线 | IDE 的 Probe 列表、连接测试 |
| 工程 Build 失败 | 芯片型号、工程配置、编译器 | 第一条真正的 error，而不是最后一条连带错误 |
| Flash 失败 | Probe 连接、供电、目标电压、芯片型号 | Flash Log、连接测试、复位后是否还能连接 |
| Flash 成功但 Breakpoint 不命中 | 是否真的 Reset / Run，是否使用新镜像 | Program Counter、启动代码、当前 Firmware 断点 |
| LED 不亮 | Breakpoint 是否命中 GPIO 初始化 | GPIO Clock、Pin Mode、Output Register、Pin Voltage、LED 极性 |
| Button 没反应 | 先看输入 Pin 是否变化 | Pull-up/down、Edge、Pending Flag、ISR 入口 |
| PWM 没波形 | 先确认 Timer Counter 是否运行 | Channel Enable、Alternate Function、正确 Pin、探头参考地 |
| 修改源码后行为没变 | 是否重新 Build 和 Flash | Build 时间、Flash Log、新断点或版本标记 |

## 固定调查链

```text
Build
→ Flash
→ Reset
→ Run
→ Breakpoint
→ Register
→ Pin
→ Voltage / Waveform
→ Board Circuit
```

故障在哪一层停止，就优先在那一层收集证据。

## 可恢复原则

- 不随意擦除整片 Flash；
- 不在未知电压下连接外部设备；
- 不用“下载成功”替代“CPU 已执行”的证据；
- 不把板卡 Pin、时钟和 LED 极性当作通用常量；
- 每次只改一个变量，并保留修改前后的记录。
