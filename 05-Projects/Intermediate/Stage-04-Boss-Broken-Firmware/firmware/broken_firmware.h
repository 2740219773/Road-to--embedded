#ifndef BROKEN_FIRMWARE_H
#define BROKEN_FIRMWARE_H

#include <stdbool.h>
#include <stddef.h>
#include <stdint.h>

#define FIXTURE_DMA_CAPACITY 4u
#define FIXTURE_MEMORY_SIZE 8u

typedef struct {
    uint32_t uart_configured_baud;
    uint32_t uart_clock_hz;
    uint32_t uart_divider;
    uint32_t uart_actual_baud;
    bool interrupt_pending;
    uint32_t isr_entries;
    uint32_t main_loop_ticks;
    uint8_t neighboring_memory[FIXTURE_MEMORY_SIZE];
    uint8_t system_state;
    size_t memory_overwrite_count;
    uint16_t dma_buffer[FIXTURE_DMA_CAPACITY];
    size_t dma_moved;
    size_t dma_overflow_writes;
    size_t stack_capacity_bytes;
    size_t stack_peak_bytes;
    bool fixed;
} BossFixture;

void fixture_init(BossFixture *fixture);
uint32_t fixture_measure_uart_baud(BossFixture *fixture);
void fixture_run_interrupt_cycles(BossFixture *fixture, size_t cycles);
void fixture_pointer_memory_write(BossFixture *fixture, size_t bytes);
void fixture_dma_transfer(BossFixture *fixture, size_t requested_halfwords);
bool fixture_process_stack_path(BossFixture *fixture);
void fixture_apply_minimal_fixes(BossFixture *fixture);

#endif

