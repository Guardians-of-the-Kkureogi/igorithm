/*
    문제는 보자마자 BFS를 생각하긴 했다.

    picks에 추가적으로 현재 위치와 피로도를 넣어주고
    그대로 큐에 넣어서 돌렸다.

    곡갱이별로 피로도를 계산해서 큐에 다시 넣어주면서 BFS의 기본틀을 구성했고,
    예제2번과 같은 모든 미네랄을 다 캐진 못했지만
    곡갱이를 다 소모한 경우에 대한 예외처리를 추가하였다.

    answer은 1300으로 설정했는데 돌로 diamond만 50개 캐면 1250이라서 그랬다.

    ++ 추가적으로 피로도가 작은 순서로 탐색하는 우선순위큐를 사용한 방식도
   해봤는데 왜인지 더 느리더라,,, 느린 이유가 뭔지 궁금한데 설명 좀 해주실분
*/

#include <algorithm>
#include <queue>
#include <string>
#include <vector>

using namespace std;

vector<string> pickName = {"diamond", "iron", "stone"};
vector<vector<int>> stamina = {{1, 1, 1}, {5, 1, 1}, {25, 5, 1}};

int solution(vector<int> picks, vector<string> minerals) {
    int answer = 1300;
    // picks
    // 0 : 다이아 곡갱이 남은 수
    // 1 : 철 곡갱이 남은 수
    // 2 : 돌 곡갱이 남은 수
    // 3 : minerals 위치
    // 4 : 피로도
    queue<vector<int>> q;
    picks.push_back(0);
    picks.push_back(0);
    q.push(picks);

    while (!q.empty()) {
        vector<int> current = q.front();
        q.pop();
        bool isPick = false;

        // 탐색 시작
        for (int i = 0; i < 3; i++) {
            vector<int> v = current;
            // 곡갱이 별로 광물 캐기
            if (v[i] > 0) {
                isPick = true;
                v[i]--;

                // 피로도 계산
                bool isDone = false;
                for (int j = 0; j < 5; j++) {
                    string currentMineral = minerals[v[3]];
                    for (int k = 0; k < 3; k++) {
                        if (currentMineral == pickName[k]) {
                            v[4] = v[4] + stamina[i][k];
                            break;
                        }
                    }

                    // 모든 미네랄을 다 캤다면 종료
                    if (v[3] + 1 >= minerals.size()) {
                        isDone = true;
                        answer = min(answer, v[4]);
                        break;
                    } else {
                        v[3]++;
                    }
                }

                // 남은 미네랄이 있으면 큐에 넣어줌
                if (!isDone) {
                    q.push(v);
                }
            }
        }

        // 남은 곡갱이가 없다면 값을 넣고 종료
        if (!isPick) {
            answer = min(answer, current[4]);
        }
    }

    return answer;
}