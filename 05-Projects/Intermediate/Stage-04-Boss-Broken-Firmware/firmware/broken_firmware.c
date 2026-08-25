#include "broken_firmware.h"

#include <string.h>

void fixture_init(BossFixture *fixture) {
    memset(fixture, 0, sizeof(*fixture));
    fixture->uart_configured_baud = 115200u;
    fixture->uart_clock_hz = 48000000u;
    fixture->uart_divider = 2u;
    fixture->stack_capacity_bytes = 512u;
    fixture->system_state = 1u;
}

uint32_t fixture_measure_uart_baud(BossFixture *fixture) {
    fixture->uart_actual_baud =
        fixture->uart_configured_baud / fixture->uart_divider;
    return fixture->uart_actual_baud;
}

void fixture_run_interrupt_cycles(BossFixture *fixture, size_t cycles) {
    fixture->interrupt_pending = true;
    for (size_t i = 0; i < cycles; ++i) {
        if (!fixture->interrupt_pending) {
            ++fixture->main_loop_ticks;
            continue;
        }
        ++fixture->isr_entries;
        if (fixture->fixed) {
            fixture->interrupt_pending = false;
        }
    }
}

void fixture_pointer_memory_write(BossFixture *fixture, size_t bytes) {
    for (size_t i = 0; i < bytes; ++i) {
        if (i < FIXTURE_MEMORY_SIZE || fixture->fixed) {
            fixture->neighboring_memory[i % FIXTURE_MEMORY_SIZE] = 0xA5u;
        } else {
            fixture->system_state = 0x7Fu;
            ++fixture->memory_overwrite_count;
        }
    }
}

void fixture_dma_transfer(BossFixture *fixture, size_t requested_halfwords) {
    fixture->dma_moved = 0u;
    fixture->dma_overflow_writes = 0u;
    size_t effective_count = requested_halfwords;
    if (fixture->fixed && effective_count > FIXTURE_DMA_CAPACITY) {
        effective_count = FIXTURE_DMA_CAPACITY;
    }
    for (size_t i = 0; i < effective_count; ++i) {
        if (i < FIXTURE_DMA_CAPACITY) {
            fixture->dma_buffer[i] = (uint16_t)(0x100u + i);
            ++fixture->dma_moved;
        } else {
            ++fixture->dma_overflow_writes;
        }
    }
    if (!fixture->fixed && requested_halfwords > FIXTURE_DMA_CAPACITY) {
        fixture->dma_overflow_writes =
            requested_halfwords - FIXTURE_DMA_CAPACITY;
    }
}

bool fixture_process_stack_path(BossFixture *fixture) {
    const size_t local_buffer = 420u;
    const size_t formatting_and_call_chain = 160u;
    fixture->stack_peak_bytes = local_buffer + formatting_and_call_chain;
    return fixture->stack_peak_bytes > fixture->stack_capacity_bytes;
}

void fixture_apply_minimal_fixes(BossFixture *fixture) {
    fixture->fixed = true;
    fixture->uart_divider = 1u;
    fixture->stack_capacity_bytes = 1024u;
}

