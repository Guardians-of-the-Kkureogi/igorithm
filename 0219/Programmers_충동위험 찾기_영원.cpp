/*
    로봇을 row를 기준으로 먼저 이동시키고
    이동할 때마다 횟수를 기준으로 충돌을 확인하는
    코드를 짯는데 틀림

    정답 보니까 다들 map으로 먼저 최단 거리 이동을
    하고 그 뒤에 충돌을 확인하더라

    쉽지않네 ^^,,
*/

#include <queue>
#include <string>
#include <vector>

using namespace std;

int solution(vector<vector<int>> points, vector<vector<int>> routes) {
    int answer = 0;

    vector<vector<vector<int>>> collision(
        101, vector<vector<int>>(101, vector<int>(10001, 0))); // 충돌 확인용
    queue<vector<int>> q;
    for (int i = 0; i < routes.size(); i++) {
        // Queue에 각 로봇의 현재 위치와 종료 위치를 넣어줌
        int start = routes[i][0] - 1;
        int end = routes[i][1] - 1;

        vector<int> next(5);
        next[0] = points[start][0];
        next[1] = points[start][1];
        next[2] = points[end][0];
        next[3] = points[end][1];
        next[4] = 0; // 움직인 횟수

        if (collision[next[0]][next[1]][0] == 1)
            answer += 1;
        collision[next[0]][next[1]][0] += 1;
        q.push(next);
    }

    // Queue를 돌면서 충돌 확인
    while (!q.empty()) {
        vector<int> current = q.front();
        q.pop();

        collision[current[0]][current[1]][current[4]] -= 1;
        current[4] += 1;

        // row 좌표 먼저 이동
        if (current[0] != current[2]) {
            if (current[0] > current[2]) {
                current[0] -= 1;
            } else {
                current[0] += 1;
            }
        } else if (current[1] != current[3]) {
            if (current[1] > current[3]) {
                current[1] -= 1;
            } else {
                current[1] += 1;
            }
        }

        // 충돌 확인
        if (collision[current[0]][current[1]][current[4]] == 1)
            answer += 1;
        collision[current[0]][current[1]][current[4]] += 1;

        // 도착 안했으면 Queue에 다시 넣기
        if ((current[0] != current[2]) || (current[1] != current[3])) {
            q.push(current);
        }
    }
    return answer;
}