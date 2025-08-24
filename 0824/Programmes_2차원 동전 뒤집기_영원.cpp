#include <algorithm>
#include <climits>
#include <string>
#include <vector>

using namespace std;

static int try_case(const vector<vector<int>> &D, int r0) {
    int n = (int)D.size();
    int m = (int)D[0].size();

    vector<int> R(n, 0), C(m, 0);
    R[0] = r0;

    // R[0] XOR C[j] = D[0][j]  ->  C[j] = R[0] XOR D[0][j]
    for (int j = 0; j < m; ++j)
        C[j] = R[0] ^ D[0][j];

    // R[i] XOR C[0] = D[i][0]  ->  R[i] = D[i][0] XOR C[0]
    for (int i = 1; i < n; ++i)
        R[i] = D[i][0] ^ C[0];

    // 일관성 검사
    for (int i = 0; i < n; ++i) {
        for (int j = 0; j < m; ++j) {
            if ((R[i] ^ C[j]) != D[i][j])
                return INT_MAX; // 불가능
        }
    }

    // 뒤집기 횟수 = 뒤집는 행 수 + 뒤집는 열 수
    int flips = 0;
    flips += count(R.begin(), R.end(), 1);
    flips += count(C.begin(), C.end(), 1);
    return flips;
}

int solution(vector<vector<int>> beginning, vector<vector<int>> target) {
    int n = (int)beginning.size();
    int m = (int)beginning[0].size();

    // D = beginning XOR target
    vector<vector<int>> D(n, vector<int>(m));
    for (int i = 0; i < n; ++i)
        for (int j = 0; j < m; ++j)
            D[i][j] = beginning[i][j] ^ target[i][j];

    // R[0] = 0, 1 두 경우 시도
    int ans0 = try_case(D, 0);
    int ans1 = try_case(D, 1);
    int best = min(ans0, ans1);

    return (best == INT_MAX) ? -1 : best;
}
