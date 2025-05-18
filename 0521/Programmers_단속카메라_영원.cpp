/*
    이전에 백준에서 단속카메라와 관련된 문제를
    푼 적이 있었는데, 그 문제는 카메라의 간격을
    기준으로 이분 탐색하여서 하는 문제였다.

    그래서 처음에는 이분탐색과 간격을 이용하고
    현재 값이 맞는지 검증하는 방법을 생각했는데
    아니였음,,,,,

    결과적으로는 주어진 차량들을 진출지점을 기준으로
    오름차순 정렬을 하고 진입지점이 마지막에 설치한
    카메라의 위치보다 뒤라면 카메라를 추가하는 방식으로
    진행하는 간단한 문제이다.
*/

#include <algorithm>
#include <string>
#include <vector>

using namespace std;

int solution(vector<vector<int>> routes) {
    int answer = 0;

    sort(
        routes.begin(), routes.end(),
        [](const vector<int> &a, const vector<int> &b) { return a[1] < b[1]; });

    int lastCamera = -30001; // 마지막에 설치한 카메라의 위치
    for (int i = 0; i < routes.size(); i++) {
        if (routes[i][0] > lastCamera) { // 카메라에 안찍혔으니 카메라 추가
            lastCamera = routes[i][1];
            answer += 1;
        }
    }

    return answer;
}