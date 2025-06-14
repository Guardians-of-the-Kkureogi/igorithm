/*
    문제를 봤을 때 두 가지 방법을 생각했다.
    하나는 sources에서 destination까지 최단 거리를 구하는데
    이미 지나간 지점들에는 해당 지점에서 destination까지의 거리를
    저장해두고, 해당 값을 활용해서 중복을 줄이는 방법이다.
    -> 이 방법은 시간 초과됨

    다른 하나는 destination에서 sources까지 최단 거리를 구하는 방법이다.
    -> 이 방법이 성공

    각 방법들에 대해 GPT한테 시간 복잡도를 계산해달라고 했는데
    첫 번째 방법은 O(n + m) * O(s) = O((n + m) * s)로 시간 초과가 났고
    두 번째 방법은 O(n + m) + O(s) = O(n + m + s)로 시간 초과가 나지 않았다.

    라고 정리해주었다~ 고마워 GPT!
*/

#include <queue>
#include <string>
#include <vector>

using namespace std;

vector<int> solution(int n, vector<vector<int>> roads, vector<int> sources,
                     int destination) {
    // 1. 인접 리스트 만들기
    vector<vector<int>> adj(n + 1);
    for (auto &r : roads) {
        int u = r[0], v = r[1];
        adj[u].push_back(v);
        adj[v].push_back(u);
    }

    // 2. BFS로 destination에서 모든 노드까지 최단거리 계산
    vector<int> dist(n + 1, -1);
    queue<int> q;
    dist[destination] = 0;
    q.push(destination);

    while (!q.empty()) {
        int cur = q.front();
        q.pop();
        for (int next : adj[cur]) {
            if (dist[next] == -1) { // 아직 방문하지 않은 곳
                dist[next] = dist[cur] + 1;
                q.push(next);
            }
        }
    }

    // 3. sources 순서대로 결과 채우기 (못 가는 곳은 -1 그대로)
    vector<int> answer;
    for (int s : sources) {
        answer.push_back(dist[s]);
    }
    return answer;
}