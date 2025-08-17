/*
    문제를 여러번 보았는데 해결 방법이 떠오르지
    않아서 풀지 못했다.

    확인해보니 내가 부족한 DP쪽 문제였다.
    삼각형을 채우는 경우를 파악하고
    각각에 대해 경우의 수를 더해주면서 계산해야한다.

    경우의 수가 달라지는 것은 아래 삼각형? 을 다음 열에
    사다리꼴로 만들건지 아닌지에 따라 갈리는데
    이에 따라 경우의 수를 차곡차곡 계산해서 쌓아야한다.

    앞으로 이런 문제를 만나면 일단 그림으로 그려야겠다.
*/

#include <string>
#include <vector>

using namespace std;

int solution(int n, vector<int> tops) {
    const int MOD = 10007;
    long long a = 1; // 완전히 채운 경우의 수
    long long b = 1; // 침범 당했을 때 경우의 수

    for (int t : tops) {
        long long na, nb;
        if (t == 0) {
            // 윗덧삼각형 없음
            na = (2 * a + b) % MOD; // 이전에 완전히 채움
            nb = (a + b) % MOD;     // 침범 당함
        } else {
            // 윗덧삼각형 있음
            na = (3 * a + b) % MOD; // 이전에 완전히 채움
            nb = (2 * a + b) % MOD; // 침범 당함
        }
        a = na;
        b = nb;
    }
    return static_cast<int>(a % MOD);
}