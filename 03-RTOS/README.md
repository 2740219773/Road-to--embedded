# 03 — RTOS

这一部分在完成基础 MCU 外设后进入。

重点不是背 API，而是理解实时系统如何组织任务和共享资源。

主要主题：Task、Scheduler、Priority、Queue、Semaphore、Mutex、Event、Software Timer、中断与任务协作、资源竞争、死锁、栈与实时性。

主要实践平台暂定 FreeRTOS。

阶段目标：能够把一个裸机项目拆成合理的多任务结构，并解释任务之间的数据流、同步方式和异常风险。