/*
문제에서 필요한 값은 명예의 전당의 최하위 점수
높은 점수가 명예의 전당에 들어가있음

우선순위 큐를 내림차순으로 정렬한다음 k개까지 넣어주고
k개가 넘어가면 pop을 통해 가장 작은 값을 뺀다.

이러면 우선 순위 큐에는 명예의 전당에 해당 되는 점수들만 내림차순으로
정렬되어있게됨 이 상태에서 top에 있는 점수를 answer에 담아주면 해당 일차의
명예의 전당 최하위 점수를 넣을 수 있다!
*/

#include <queue>
#include <string>
#include <vector>

using namespace std;

vector<int> solution(int k, vector<int> score) {
    vector<int> answer;
    priority_queue<int, vector<int>, greater<int>> pq;

    for (int i = 0; i < score.size(); i++) {
        pq.push(score[i]);

        if (pq.size() > k) {
            pq.pop();
        }
        answer.push_back(pq.top());
    }

    return answer;
}