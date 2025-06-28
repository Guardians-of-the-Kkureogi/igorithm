/*
    처음엔 onboard를 뒤에서부터 읽으면서
    온도를 세팅해주는 방법을 생각했는데
    온도를 어떤 기준으로 지정해주어야하는지
    모르겠어서 구현을 하질 못했다.

    결과적으로는 그리디하게 모든 경우를
    탐색하면서 푸는 dp 문제였다.
    주어진 onboard의 크기는 1,000이고
    온도의 범위는 51개 51만정도로 가능

    2차원 배열을 사용해서 전체를 파악하는데
    첫번째 인덱스는 onboard의 크기
    두번째 인덱스는 온도, 값은 소비전력이다.

    onboard를 각 온도별로 탐색하면서
    현재 onboard에서 가능한 온도라면
    그 상태에서 에어컨을 끄거나 켰을 때 온도와 소비전력을
    갱신하여준다.

    전체 순회 후에는 마지막 onboard의 모든 온도를 돌며
    가장 소비전력이 작은 값을 찾는다.

    ++ 온도에 오프셋을 주는 이유는
    배열에서 음수 인덱스를 사용하지 못하기 때문
*/

#include <string>
#include <vector>

using namespace std;

int solution(int temperature, int t1, int t2, int a, int b,
             vector<int> onboard) {
    const int INF = 1e9;
    const int N = onboard.size();
    // 온도 인덱스 오프셋: 예를 들어 -10도를 0번으로 놓고 +40도를 50번으로
    const int OFFSET = 10, MAXT = 50;

    vector<vector<int>> dp(N + 1, vector<int>(MAXT + 1, INF));
    dp[0][temperature + OFFSET] = 0;

    for (int i = 0; i < N; i++) {
        for (int t = 0; t <= MAXT; t++) {
            if (dp[i][t] == INF)
                continue;
            int curCost = dp[i][t];
            int realT = t - OFFSET;
            // 1) 승객 탑승 시 쾌적 온도 조건
            if (onboard[i] == 1 && (realT < t1 || realT > t2))
                continue;

            // A) 에어컨 끔
            int nt = realT;
            if (realT < temperature)
                nt = realT + 1;
            else if (realT > temperature)
                nt = realT - 1;
            dp[i + 1][nt + OFFSET] = min(dp[i + 1][nt + OFFSET], curCost);

            // B) 에어컨 켬 → 실내온도 변화 + 소비전력
            // 1. realT + 1
            dp[i + 1][realT + 1 + OFFSET] =
                min(dp[i + 1][realT + 1 + OFFSET], curCost + a);
            // 2. realT - 1
            dp[i + 1][realT - 1 + OFFSET] =
                min(dp[i + 1][realT - 1 + OFFSET], curCost + a);
            // 3. realT (유지)
            dp[i + 1][realT + OFFSET] =
                min(dp[i + 1][realT + OFFSET], curCost + b);
        }
    }
    // 마지막 N분까지 계산했으니, dp[N][*] 중 최소값이 답
    int answer = INF;
    for (int t = 0; t <= MAXT; t++) {
        answer = min(answer, dp[N][t]);
    }
    return answer;
}