/*
    정적분은 어떤 함수의 그래프 아래 면적
    range 범위의 넓이를 구하면 되는 문제라고 볼 수 있다.

    range에 대한 부분이 이해가 안가서
    열심히 읽었는데
    0, 0 이면 전체 범위에 대한 정적분이고
    1, -1 이면 시작범위 + 1, 끝 범위 - 1 에 대한 정적분을 의미한다

    정적분을 구하려면 각각의 넓이를 누적합으로 가지고 있으면
    끝 범위 - 시작 범위를 하면 바로 값을 구할 수 있다

    사용하지않으면 시간 초과가 나는지는 모르겠다
*/

#include <string>
#include <vector>

using namespace std;

void setCollatz(int n, vector<double> &extent) {
    double pre = n;

    // 계산 편의를 위해 추가
    // 그래서 전체 크기는 extent 크기의 -1임
    extent.push_back(0);

    while (n > 1) {
        if (n % 2 == 0) {
            n /= 2;
        } else {
            n = n * 3 + 1;
        }

        // 사다리꼴 넓이는 (윗변 + 아랫변) x 높이 / 2
        // 윗변 아랫변이 각각의 y값이 되고 높이는 항상 1인 상태이므로
        // 아래와 같은 식이 나옴
        extent.push_back((pre + n) / 2);
        pre = n;
    }
}

vector<double> solution(int k, vector<vector<int>> ranges) {
    vector<double> extent;

    setCollatz(k, extent); // Collatz를 이용해서 넓이 구해주기

    // 정적분 계산의 편의를 위해 각 넓이의 누적합을 구해줌
    vector<double> prefixSum;
    prefixSum.push_back(0); // 계산 편의를 위해 추가

    for (int i = 1; i < extent.size(); i++) {
        prefixSum.push_back(extent[i] + prefixSum[i - 1]);
    }

    // 정적분 구하기
    vector<double> answer(ranges.size());
    for (int i = 0; i < ranges.size(); i++) {
        int s = ranges[i][0];                       // 시작범위
        int e = (extent.size() - 1) + ranges[i][1]; // 끝 범위

        if (e >= s) {
            answer[i] = prefixSum[e] - prefixSum[s];
        } else {
            answer[i] = -1.0;
        }
    }

    return answer;
}