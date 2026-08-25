#include "rtos_fixture.h"

#include <assert.h>
#include <stdio.h>

int main(void) {
    RtosFixture fixture;

    fixture_init(&fixture);
    fixture_run_scenarios(&fixture);

    assert(fixture_broken_evidence_present(&fixture));
    assert(fixture.race_final < fixture.race_expected);
    assert(fixture.high_wait_ms == 32u);
    assert(fixture.deadlock);
    assert(fixture.queue_send_failures > 0u);
    assert(fixture.task_wakeups == fixture.isr_burst);

    fixture_apply_minimal_fixes(&fixture);
    fixture_run_scenarios(&fixture);

    assert(fixture_fixed_evidence_present(&fixture));
    assert(fixture.race_final == fixture.race_expected);
    assert(fixture.high_wait_ms == 6u);
    assert(fixture.lock_order_valid);
    assert(fixture.queue_send_failures == 0u);
    assert(fixture.task_wakeups == fixture.isr_burst);

    puts("Stage 05 host fixture regression: PASS");
    return 0;
}
