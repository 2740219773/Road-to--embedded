# DMA Transfer Simulator

用于比较 CPU Polling、频繁 Interrupt 和 DMA Block Transfer 的数据搬运方式。

- 运行：浏览器直接打开 `index.html`。
- Stage：`02-Learning-Path/Stage-03-Peripheral-Engineer/`
- Mission：`04-Missions/Stage-03-Peripherals/05-DMA-No-Transfer/Mission.md`
- Knowledge：`01-Knowledge-Base/MCU/04-DMA.md`
- Debug Case：`06-Debugging-Cases/DMA-Wrong-Length/CASE.md`

重点是理解 DMA 仍然需要 Request、方向、地址、长度和完成条件，并不是“自动魔法”。