/*
    시간을 변환하는 문제를 오랜만에
    풀고싶어서 들고온 문제이다

    book_time이 1000개로 주어져서
    어렵게 생각안해도 될 것 같다고 판단하여
    생각나는대로 풀었다

    먼저 시작 시각을 기준으로 정렬해서
    for문을 통해 우선순위큐에 넣어준다

    우선순위큐는 종료 시각이 빠른 순서대로
    나오게 되어있는데
    그래서 큐에 넣을 때 종료 시각 + 청소시간보다
    시작 시간이 빠르면 큐에 넣고
    아니면 큐에서 빼준다

    이 과정 속에서 큐의 크기가 필요한 방의 크기가
    되기때문에 값을 갱신해주면 끝!
*/

#include <algorithm>
#include <iostream>
#include <queue>
#include <string>
#include <vector>

using namespace std;

int timeToMinutes(const string &time) {
    int hours = stoi(time.substr(0, 2));
    int minutes = stoi(time.substr(3, 2));
    return hours * 60 + minutes;
}

struct CompareEndTime {
    bool operator()(const pair<int, int> &a, const pair<int, int> &b) {
        return a.second > b.second;
    }
};

int solution(vector<vector<string>> book_time) {
    int answer = 0;
    vector<pair<int, int>> time_in_minutes;

    for (const auto &time_pair : book_time) {
        int start = timeToMinutes(time_pair[0]);
        int end = timeToMinutes(time_pair[1]);
        time_in_minutes.emplace_back(start, end);
    }
    sort(time_in_minutes.begin(), time_in_minutes.end());

    priority_queue<pair<int, int>, vector<pair<int, int>>, CompareEndTime> pq;
    for (const auto &t : time_in_minutes) {
        while (!pq.empty() && (t.first >= pq.top().second + 10)) {
            pq.pop();
        }
        pq.emplace(t.first, t.second);
        answer = max(answer, static_cast<int>(pq.size()));
    }

    return answer;
}