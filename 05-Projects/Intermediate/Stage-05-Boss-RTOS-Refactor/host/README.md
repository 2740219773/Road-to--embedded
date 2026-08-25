# Stage 05 Host Fixture

这是一个平台无关的确定性 C11 状态模型，用于验证 RTOS Refactor Boss 的主要证据链：

- Race / Lost Update；
- Priority Inversion；
- Deadlock / Lock Ordering；
- Queue Backpressure；
- ISR → Task 与 Stack / Deadline。

它不创建真实线程，不依赖 FreeRTOS，不模拟真实内核调度器。每次运行使用固定的 Broken Scenario 和固定的最小修复，因此适合本地质量门和 CI。

## Build

MSVC：

```powershell
cl /std:c11 /W4 /WX host/rtos_fixture.c host/test_rtos_fixture.c /Fe:host/stage05-fixture.exe
host/stage05-fixture.exe
```

GCC/Clang：

```powershell
gcc -std=c11 -Wall -Wextra -Werror host/rtos_fixture.c host/test_rtos_fixture.c -o host/stage05-fixture
./host/stage05-fixture
```

预期输出：

```text
Stage 05 host fixture regression: PASS
```

真实 FreeRTOS、MCU ISR、Stack Watermark、Debugger、示波器和逻辑分析仪结果必须单独验证，不能用本 Fixture 的 PASS 代替。
