/*
    크레인은 그냥 전체 탐색하면서 해당하는 letter를 제거
    지게차는 BFS 탐색을 이용해서 접근 가능한 위치에 있는
    letter를 제거하는 방식을 사용했다.

    지게차 탐색을 편리하게 하기 위해 전체를 0으로 감싸주었고
    이를 이용해서 가능한 위치의 탐색을 할 수 있게 했다.
*/

#include <iostream>
#include <queue>
#include <string>
#include <vector>

using namespace std;

int useCrane(char letter, vector<string> &padded) {
    int removeCount = 0;

    for (int i = 1; i < padded.size() - 1; i++) {
        for (int j = 1; j < padded[i].size() - 1; j++) {
            if (padded[i][j] == letter) {
                padded[i][j] = '0';
                removeCount++;
            }
        }
    }

    return removeCount;
}

int useForklift(char letter, vector<string> &padded) {
    int removeCount = 0;
    int rows = padded.size();
    int cols = padded[0].size();

    vector<vector<bool>> visited(rows, vector<bool>(cols, false));
    queue<pair<int, int>> q;

    q.push({0, 0});
    visited[0][0] = true;

    int dr[4] = {-1, 1, 0, 0};
    int dc[4] = {0, 0, -1, 1};

    while (!q.empty()) {
        auto [r, c] = q.front();
        q.pop();

        for (int d = 0; d < 4; d++) {
            int nr = r + dr[d];
            int nc = c + dc[d];

            if (nr < 0 || nr >= rows || nc < 0 || nc >= cols)
                continue;
            if (visited[nr][nc])
                continue;

            visited[nr][nc] = true;

            if (padded[nr][nc] == '0') {
                q.push({nr, nc});
            }

            if (padded[nr][nc] == letter) {
                padded[nr][nc] = '0';
                removeCount++;
            }
        }
    }

    return removeCount;
}

int solution(vector<string> storage, vector<string> requests) {
    int answer = storage[0].size() * storage.size();

    // 0으로 주위를 감싸줌
    int m = storage[0].size();
    string border(m + 2, '0');

    vector<string> padded;
    padded.push_back(border);

    for (const string &row : storage) {
        padded.push_back("0" + row + "0");
    }

    padded.push_back(border);

    // 제거 시작
    for (int i = 0; i < requests.size(); i++) {
        if (requests[i].length() == 2) {
            answer -= useCrane(requests[i][0], padded);
        } else {
            answer -= useForklift(requests[i][0], padded);
        }
    }

    return answer;
}