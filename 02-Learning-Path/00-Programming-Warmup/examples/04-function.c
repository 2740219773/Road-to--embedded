#include <stdio.h>

static int maximum(int left, int right)
{
    return left > right ? left : right;
}

int main(void)
{
    printf("max(2, 5) = %d\n", maximum(2, 5));
    printf("max(7, 3) = %d\n", maximum(7, 3));
    printf("max(4, 4) = %d\n", maximum(4, 4));
    return 0;
}
