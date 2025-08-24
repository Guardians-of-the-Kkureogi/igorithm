/*
    저번주의 교훈으로 열심히 그림을 그리면서 풀었는데
    풀이의 가닥은 잡았는데 최종적으로 어떤식으로 구현해야하는지
    막혀서 제대로 풀지 못함.

    풀이 과정을 보고도 이해하는데 꽤 걸렸다.
    먼저 초기 상태에서 목표상태로 만드는 행렬을 만든다 (D)
    D를 가지고 뒤집기를 실행해본다.
    이 때 기준점이 필요한데 이건 행이나 열 중 하나를 쓰면된다.
    아래 풀이 방법은 행을 기준으로 행이 0(뒤집지 않았을 때)
    또는 1(뒤집었을 때) 두 경우를 시도했을 때다.

    행을 뒤집었다고 하면 그 뒤집은 행을 가지고
    나머지 열들을 뒤집을 지 말지 정할 수 있다.
    그 이후 나머지 행들도 D를 가지고 뒤집을지 말지 여부를 결정하고
    최종적으로 D와 일치하는지 확인 후에 뒤집은 횟수를 리턴한다.

    **추후에 내가 이 문제를 다시 봤을 때 이해하기 쉽게 이해한 내용을
    예를 들어 설명

    3x3 행렬을 예로 든다면 D가 아래와 같을 때
    D = 0 1 0
        1 0 1
        0 1 0

    R[0] = 0 (뒤집지 않음)이라 하면
    tryCase 함수에 진입했을 때 초기 상태는
    0 0 0
    0 0 0
    0 0 0 이다

    이 상태에서 열들을 뒤집을지 말지 D와 비교해서 결정하면
    C = 0 1 0 이 되고
    상태는
    0 1 0
    0 1 0
    0 1 0 이 된다.

    마지막으로 나머지 행들을 D와 비교해서 뒤집을지 말지 결정하면
    R = 0 1 0 이 되고
    상태는
    0 1 0
    1 0 1
    0 1 0 이 되어 D와 일치하게 되고

    C가 1인 열 1개, R이 1인 행 1개를 뒤집었으니
    뒤집기 횟수는 2가 된다.

    =================================

    R[0] = 1 (뒤집음)이라 하면
    tryCase 함수에 진입했을 때 초기 상태는
    1 1 1
    0 0 0
    0 0 0 이다

    이 상태에서 열들을 뒤집을지 말지 D와 비교해서 결정하면
    C = 1 0 1 이 되고
    상태는
    0 1 0
    1 0 1
    1 0 1 이 된다.
    마지막으로 나머지 행들을 D와 비교해서 뒤집을지 말지 결정하면

    R = 1 0 1 이 되고
    상태는
    0 1 0
    1 0 1
    0 1 0 이 되어 D와 일치하게 되고

    C가 1인 열 2개, R이 1인 행 2개를 뒤집었으니
    뒤집기 횟수는 4가 된다.

    두 경우 중 뒤집기 횟수가 더 적은 2가 답이 된다.
*/

#include <algorithm>
#include <climits>
#include <string>
#include <vector>

using namespace std;

int tryCase(const vector<vector<int>> &D, int r0) {
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
    int ans0 = tryCase(D, 0);
    int ans1 = tryCase(D, 1);
    int best = min(ans0, ans1);

    return (best == INT_MAX) ? -1 : best;
}
