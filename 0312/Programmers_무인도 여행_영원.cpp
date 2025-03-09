/*
    재미있는 BFS 탐색 문제
    섬을 발견하면 해당 섬에서 생존 가능한
    날이 며칠인지 확인하고 방문 체크를 한다

    생존 가능한 날들은 오름차순으로 정렬해서
    답으로 제출한다.
*/

#include <algorithm>
#include <iostream>
#include <queue>
#include <string>
#include <vector>

using namespace std;

int dr[] = {-1, 1, 0, 0};
int dc[] = {0, 0, -1, 1};

int getIslandSize(int r, int c, vector<string> &maps,
                  vector<vector<bool>> &visited) {
    int size = stoi(string(1, maps[r][c]));
    queue<pair<int, int>> q;
    q.push(make_pair(r, c));
    visited[r][c] = true;

    while (!q.empty()) {
        int r = q.front().first;
        int c = q.front().second;
        q.pop();

        for (int d = 0; d < 4; d++) {
            int nr = r + dr[d];
            int nc = c + dc[d];

            if (nr >= maps.size() || nc >= maps[0].size() || nr < 0 | nc < 0)
                continue;
            if (maps[nr][nc] == 'X' || visited[nr][nc])
                continue;

            size += stoi(string(1, maps[nr][nc]));
            visited[nr][nc] = true;
            q.push(make_pair(nr, nc));
        }
    }

    return size;
}

vector<int> solution(vector<string> maps) {
    vector<int> answer;
    vector<vector<bool>> visited(maps.size(), vector<bool>(maps[0].size(), 0));

    for (int i = 0; i < maps.size(); i++) {
        for (int j = 0; j < maps[0].size(); j++) {
            if (maps[i][j] != 'X' && !visited[i][j]) {
                answer.push_back(getIslandSize(i, j, maps, visited));
            }
        }
    }

    if (answer.size() == 0) {
        answer.push_back(-1);
    } else {
        sort(answer.begin(), answer.end());
    }

    return answer;
}