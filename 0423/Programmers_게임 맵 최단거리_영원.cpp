/*
    효율성 1번이 자꾸 삑나서 조금 걸림
    생각없이 count를 봐야하니까
    우선순위큐를 써야지하고 썼는데

    BFS는 거리가 가까운 순서로 어짜피 돌기
    때문에 굳이 그럴 필요가 없다는 사실을
    깨달은 바보같은 나

    쉬운 문제처럼 보여서 너무 뇌를 비우고 푼 듯
*/

#include <queue>
#include <vector>

using namespace std;

int solution(vector<vector<int>> maps) {
    queue<pair<int, pair<int, int>>> q;
    vector<vector<bool>> visited(maps.size(),
                                 vector<bool>(maps[0].size(), false));

    int dr[] = {1, -1, 0, 0};
    int dc[] = {0, 0, 1, -1};
    q.push({1, {0, 0}});

    while (!q.empty()) {
        auto [count, coord] = q.front();
        if ((coord.first == maps.size() - 1) &&
            (coord.second == maps[0].size() - 1)) {
            return count;
        }
        q.pop();

        for (int d = 0; d < 4; d++) {
            int nr = coord.first + dr[d];
            int nc = coord.second + dc[d];

            if (nr < 0 || nc < 0 || nr > maps.size() - 1 ||
                nc > maps[0].size() - 1)
                continue;
            if (maps[nr][nc] == 0 || visited[nr][nc])
                continue;

            visited[nr][nc] = true;
            q.push({count + 1, {nr, nc}});
        }
    }

    return -1;
}