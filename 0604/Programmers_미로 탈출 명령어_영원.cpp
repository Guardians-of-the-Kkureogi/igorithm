/*
    이 문제는 조금 직관적이여서 골랐다.
    실제 풀이도 주어진 조건대로 DFS를 통해 이동을 하면된다.
    다만 탐색하는 과정에서 현재 위치에서 목적지까지 도착이
    가능한지를 체크하면서 더 탐색할지 여기서 멈출지를 결정해
    주는 것이 중요하다.
*/

#include <cmath>
#include <string>

using namespace std;

string solution(int n, int m, int x, int y, int r, int c, int k) {
    // 시작점(x,y)과 도착점(r,c) 사이의 맨해튼 거리 계산
    int dist = abs(r - x) + abs(c - y);

    // 불가능 판정: 거리 > k 이거나, (k - dist)가 홀수면 불가능
    if (dist > k || (k - dist) % 2 == 1) {
        return "impossible";
    }

    string answer = "";
    int cx = x, cy = y; // 현재 위치
    int rem = k;        // 남은 이동 횟수

    // 사전 순으로 탐색할 방향 배열: 'd' < 'l' < 'r' < 'u'
    int dx[4] = {1, 0, 0, -1};
    int dy[4] = {0, -1, 1, 0};
    char dirs[4] = {'d', 'l', 'r', 'u'};

    // 남은 이동(rem) 이 0이 될 때까지 한 칸씩 그리디하게 이동
    while (rem > 0) {
        bool moved = false;
        for (int i = 0; i < 4; i++) {
            int nx = cx + dx[i];
            int ny = cy + dy[i];
            if (nx < 1 || nx > n || ny < 1 || ny > m)
                continue;

            // 새 위치에서 도착점까지 맨해튼 거리 계산
            int ndist = abs(r - nx) + abs(c - ny);
            if (ndist <= rem - 1 && ((rem - 1 - ndist) % 2 == 0)) {
                answer.push_back(dirs[i]);
                cx = nx;
                cy = ny;
                rem--;
                moved = true;
                break;
            }
        }

        if (!moved) {
            return "impossible";
        }
    }

    return answer;
}
