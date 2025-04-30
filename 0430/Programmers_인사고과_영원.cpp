/*
    시간초과에 주의하면서 풀어야하는 문제
    근무 태도와 동료 평가가 존재하는데
    둘을 다 체크하지말고
    하나를 기준으로 정렬해서 하나씩만 비교하여
    시간을 줄이는게 필요한 문제이다.
*/

#include <algorithm>
#include <string>
#include <vector>

using namespace std;

int solution(vector<vector<int>> scores) {
    vector<int> wonho = scores[0];

    // 근무 태도 내림차순, 동료 평가 오름 차순 또는 그 반대로 정렬하여
    // 인센티브 영역에 있는 사원 찾기
    sort(scores.begin(), scores.end(),
         [](const vector<int> &a, const vector<int> &b) {
             if (a[0] != b[0])
                 return a[0] > b[0];
             return a[1] < b[1];
         });

    vector<vector<int>> incen;
    vector<int> high = scores[0];
    incen.push_back(scores[0]);

    for (int i = 1; i < scores.size(); i++) {
        // 근무 태도가 같으면 동료 평가는 오름차순이기때문에 무조건 인센에 추가
        if (high[0] == scores[i][0]) {
            incen.push_back(scores[i]);
        }

        // 근무 태도가 작으면 동료 평가라도 커야 인센에 추가 가능
        if ((high[0] > scores[i][0]) && (high[1] <= scores[i][1])) {
            incen.push_back(scores[i]);
        }

        // 동료 평가 점수는 최대로 갱신
        if (high[1] < scores[i][1]) {
            high[1] = scores[i][1];
        }
    }

    // incen 돌면서 확인
    int answer = 1; // high가 이미 있기때문에 1부터 시작
    for (auto &p : incen) {
        // 원호 점수가 인센에 해당안되면 -1
        if ((p[0] > wonho[0]) && (p[1] > wonho[1])) {
            return -1;
        }

        // 원호보다 석차가 높은 사람은 더해주기
        if (p[0] + p[1] > wonho[0] + wonho[1]) {
            answer++;
        }
    }

    return answer;
}