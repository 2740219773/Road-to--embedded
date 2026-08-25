#include "broken_firmware.h"

#include <assert.h>
#include <stdio.h>

int main(void) {
    BossFixture fixture;
    fixture_init(&fixture);

    assert(fixture_measure_uart_baud(&fixture) == 57600u);

    fixture_run_interrupt_cycles(&fixture, 4u);
    assert(fixture.isr_entries == 4u);
    assert(fixture.main_loop_ticks == 0u);

    fixture_pointer_memory_write(&fixture, FIXTURE_MEMORY_SIZE + 1u);
    assert(fixture.system_state == 0x7Fu);
    assert(fixture.memory_overwrite_count == 1u);

    fixture_dma_transfer(&fixture, 8u);
    assert(fixture.dma_moved == FIXTURE_DMA_CAPACITY);
    assert(fixture.dma_overflow_writes == 4u);

    assert(fixture_process_stack_path(&fixture));

    fixture_init(&fixture);
    fixture_apply_minimal_fixes(&fixture);
    assert(fixture_measure_uart_baud(&fixture) == 115200u);
    fixture_run_interrupt_cycles(&fixture, 4u);
    assert(fixture.main_loop_ticks == 3u);

    fixture_pointer_memory_write(&fixture, FIXTURE_MEMORY_SIZE + 1u);
    assert(fixture.system_state == 1u);
    assert(fixture.memory_overwrite_count == 0u);

    fixture_dma_transfer(&fixture, 8u);
    assert(fixture.dma_moved == FIXTURE_DMA_CAPACITY);
    assert(fixture.dma_overflow_writes == 0u);
    assert(!fixture_process_stack_path(&fixture));

    puts("Stage 04 host fixture regression: PASS");
    return 0;
}

