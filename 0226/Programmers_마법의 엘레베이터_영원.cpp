/*
    크게 보면 5를 올림으로 보는 경우와
    5를 내림으로 보는 경우 두 가지가 있다

    각각 횟수를 구한 다음에
    더 작은 것을 답에 넣어주면 된다.
*/

#include <cmath>
#include <string>
#include <vector>

using namespace std;

int solution(int storey) {
    // 자리수 나누기
    vector<int> digits(9);
    int div = pow(10, 8);
    int idx = 8;

    while (div > 0) {
        digits[idx] = storey / div;
        storey %= div;
        div /= 10;
        idx--;
    }

    // 5를 올리는 경우
    int up = 0;
    vector<int> upCopy(9);
    copy(digits.begin(), digits.end(), upCopy.begin());
    for (int i = 0; i < 9; i++) {
        if (upCopy[i] == 10) {
            upCopy[i] = 0;
            upCopy[i + 1] += 1;
        }

        if (upCopy[i] >= 5) {
            up += 10 - upCopy[i];
            upCopy[i + 1] += 1;
        } else {
            up += upCopy[i];
        }
    }

    // 5를 내리는 경우
    int down = 0;
    for (int i = 0; i < 9; i++) {
        if (digits[i] == 10) {
            digits[i] = 0;
            digits[i + 1] += 1;
        }

        if (digits[i] > 5) {
            down += 10 - digits[i];
            digits[i + 1] += 1;
        } else {
            down += digits[i];
        }
    }

    return min(up, down);
}