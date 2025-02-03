/*
    원소의 총 개수가 1000만개이다
    길이 자체는 10만이라 조금 여유가 있긴한데

    map으로 넣을 때마다 정렬하는 방법을 생각하다가
    귤의 사이즈 크기만큼의 배열을 생성한 다음
    내림차순으로 정렬해서 담아주는 방식이 정렬 1회에 정리가
    가능해보여서 선택하였다.
*/

#include <algorithm>
#include <string>
#include <vector>

using namespace std;

int solution(int k, vector<int> tangerine) {
    int answer = 0;
    vector<int> v(10000001);

    for (int i : tangerine) {
        v[i] += 1;
    }

    sort(v.begin(), v.end(), greater<int>());

    for (int i = 0; i < v.size(); i++) {
        if (v[i] < k) {         // k보다 현재 사이즈의 귤의 개수가 적다면
            answer += 1;        // 종류 추가
            k -= v[i];          // 현재 사이즈 귤의 개수만큼 K에서 빼주기
        } else if (v[i] >= k) { // k개에 도달했다면
            answer += 1;        // 종류 추가하고 종료
            break;
        }
    }

    return answer;
}