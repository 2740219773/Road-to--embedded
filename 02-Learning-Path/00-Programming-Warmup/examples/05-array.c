#include <stdio.h>

int main(void)
{
    int samples[4] = { 10, 20, 30, 40 };

    for (int index = 0; index < 4; ++index)
        printf("samples[%d] = %d\n", index, samples[index]);

    puts("Valid indexes are 0, 1, 2 and 3; index 4 is outside the array.");
    return 0;
}
