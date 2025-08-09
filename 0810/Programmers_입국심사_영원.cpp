/*
    문제에서 사람 수와 시간이 10억으로 제시되어있어
    사람 수 만큼 확인할 수 없다는 것을 알 수 있음

    문제의 answer이 되는 시간을 기준으로
    이분 탐색을 하여 해당 시간에 n명이 가능한지를
    확인하면서 최소의 시간을 찾으면 되는 문제

    이분탐색을 사용한다는 아이디어만 떠올리면
    금방 풀 수 있다.
*/

#include <algorithm>
#include <string>
#include <vector>

using namespace std;

long long solution(int n, vector<int> times) {
    sort(times.begin(), times.end());

    // 최대 시간은 가장 긴 심사 시간 * 사람 수
    long long left = 1;
    long long right = (long long)times.back() * n;
    long long answer = right;

    while (left <= right) {
        long mid = (left + right) / 2;
        long long processed = 0;

        for (int t : times) {
            processed += mid / t;

            // 이미 n명을 처리할 수 있다면 더 이상 확인할 필요 없음
            if (processed >= n)
                break;
        }

        if (processed >= n) {
            answer = mid;
            right = mid - 1;
        } else {
            left = mid + 1;
        }
    }

    return answer;
}