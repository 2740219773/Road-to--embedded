# Mission — Choose the Instrument：这次该拿什么工具？

每个场景先选“信息量最高的第一件工具”，并说明原因。

## Scene A

UART PC 端乱码，但 TX 有输出。

候选：Debugger / Logic Analyzer / Oscilloscope / 万用表。

目标：确认真实 bit time 与电平。

## Scene B

I2C Decoder 显示大量错误帧，SDA 上升沿非常慢。

目标：判断上拉、电容和电气波形质量。

## Scene C

变量偶发被改成非法值，发生时刻未知。

目标：抓住 CPU 写入现场。

## Scene D

SPI 解码偶尔错误，只在高频率出现。

目标：既确认协议边沿，也确认真实信号质量。

## Rule

工具不是按“高级程度”选择，而是按当前假设需要什么证据选择。

## Boss

为四个场景分别写：假设 → 首选工具 → 测量对象 → 什么结果支持/反驳假设。