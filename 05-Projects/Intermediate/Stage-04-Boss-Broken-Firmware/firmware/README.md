# Stage 04 Host Fault Fixture

这是 Broken Firmware Boss 的 PC 侧可执行模型。它有意用确定性逻辑表达五类故障：

| Fault | Broken observation | Evidence |
|---|---|---|
| UART / Clock | 115200 配置产生 57600 实际 Baud | `fixture_measure_uart_baud` |
| Interrupt | Pending 条件未解除，ISR 重复进入 | `fixture_run_interrupt_cycles` |
| Pointer / Memory | 越界写把状态改成 `0x7F` | `fixture_pointer_memory_write` |
| DMA / Buffer | 4 项 Buffer 收到 8 项请求，产生 4 项越界记录 | `fixture_dma_transfer` |
| Stack | 420-byte 局部 Buffer 加调用链超过 512-byte 栈 | `fixture_process_stack_path` |

## 运行方式

```powershell
cc -std=c11 -Wall -Wextra -pedantic firmware/broken_firmware.c firmware/test_broken_firmware.c -o firmware/stage04-fixture
./firmware/stage04-fixture
```

预期输出：

```text
Stage 04 host fixture regression: PASS
```

Windows 下也可以使用 `gcc` 或 `clang` 执行同等命令。生成的可执行文件属于本地构建产物，不应提交到仓库。

## 边界

- 这是 Host Fault Fixture，不是 Cortex-M 固件；
- Fault Status、Stacked PC、真实 Pin 波形和 DMA Bus 行为必须在目标平台上另行验证；
- 代码中的“安全模型”用计数和显式边界记录替代未定义行为，目的是让学习者能够重复观察故障机制；
- 修复函数只展示最小配置变化，Boss 仍要求学习者先提交 Evidence Record 再调用它。

