# Debugging Case — UART Garbled

## Symptom

MCU 预期发送 ASCII `U` (`0x55`)，PC 端持续收到乱码。

## Evidence Pack

- PC configured: 115200, 8N1
- MCU source configured: 115200, 8N1
- TX waveform measured bit time: about 17.36 µs
- TX voltage: 0–3.3 V

## Your Task

在看答案前回答：

1. 波形对应的真实 Baud Rate 大约是多少？
2. “源码写着 115200”与“真实波形不是 115200”说明下一层应该检查什么？
3. 这个证据是否支持优先怀疑电平标准？

## Diagnosis

17.36 µs/bit 对应约 57600 bit/s。PC 按 115200 采样必然错误。

既然 UART 配置值看似为 115200，而真实输出接近一半，应继续检查 UART Peripheral Clock、Clock Tree 和 Baud Rate Divider 的真实输入条件。

## Lesson

配置文件不是物理事实。示波器测到的 bit time 才是当前 TX 引脚真正发生的事情。

关联 Mission：`04-Missions/Stage-03-Peripherals/01-UART-Garbled/Mission.md`。