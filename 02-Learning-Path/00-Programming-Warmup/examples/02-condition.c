#include <stdio.h>

static void report_temperature(int temperature)
{
    if (temperature > 50)
        puts("ALARM");
    else
        puts("OK");
}

int main(void)
{
    report_temperature(49);
    report_temperature(50);
    report_temperature(51);
    return 0;
}
