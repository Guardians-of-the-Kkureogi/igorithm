/*
    이 문제는 이틀정도 고민을 해서
    풀이 방법을 적었는데 틀려가지구
    이번에 GPT가 업그레이드 되었다고해서
    새로운 모델을 선생님 삼아서 부탁해보았습니다

    이로인해 얻은 풀이 과정은 다음과 같습니다

    비용이 적은 간선을 찾는 것은 크루스칼을 사용합니다
    크루스칼을 사용하기 위해서는 비용을 오름차순으로 정렬
    그리고 연결에는 유니온-파인드를 사용

    유니온-파인드는 경로 압축을 사용하여
    find 연산을 최적화하고
    rank를 사용하여 union 연산을 최적화합니다
    이 두가지를 사용하여
    MST를 만들기 위한 간선들을 선택합니다
    그리고 n-1개의 간선을 선택했을 때 종료합니다
*/

#include <algorithm>
#include <iostream>
#include <vector>

using namespace std;

// 유니온-파인드 구조체
struct UnionFind {
    vector<int> parent, rank;

    // 생성자로 벡터 생성 및 parent가 자기 자신을 바라보게 초기화
    UnionFind(int n) : parent(n), rank(n, 0) {
        for (int i = 0; i < n; i++)
            parent[i] = i;
    }

    // find: 대표 노드 찾기 (경로 압축 적용)
    int find(int x) {
        if (parent[x] == x)
            return x;
        return parent[x] = find(parent[x]);
    }

    // union: 두 집합 합치기 (rank 기준)
    bool unite(int x, int y) {
        x = find(x);
        y = find(y);
        if (x == y)
            return false; // 이미 같은 집합
        if (rank[x] < rank[y])
            swap(x, y);
        parent[y] = x;
        if (rank[x] == rank[y])
            rank[x]++;
        return true;
    }
};

int solution(int n, vector<vector<int>> costs) {
    // 1) 간선(costs)을 비용 기준으로 오름차순 정렬
    sort(
        costs.begin(), costs.end(),
        [](const vector<int> &a, const vector<int> &b) { return a[2] < b[2]; });

    UnionFind uf(n);
    int totalCost = 0;
    int edgesUsed = 0;

    // 2) 가장 작은 간선부터 차례로 추가
    for (auto &c : costs) {
        int u = c[0], v = c[1], w = c[2];
        // 두 섬이 아직 연결되어 있지 않다면 연결하고 비용 더하기
        if (uf.unite(u, v)) {
            totalCost += w;
            edgesUsed++;
            // MST 완성 조건: n-1개의 간선을 선택했으면 종료
            if (edgesUsed == n - 1)
                break;
        }
    }

    return totalCost;
}
