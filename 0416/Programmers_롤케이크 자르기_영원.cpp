/*
    간단하게 생각해서 풀었는데 시간초과는
    나지않음

    철수가 모두 먹는 상태로 세팅한 다음
    하나씩 탐색하면서 토핑이 같은 상태가
    있다면 answer에 추가하는 식으로 진행
*/

#include <map>
#include <set>
#include <string>
#include <vector>

using namespace std;

int solution(vector<int> topping) {
    int answer = 0;

    map<int, int> toppingCnt; // 철수
    map<int, int> brotherCnt; // 동생

    for (int topping : topping) {
        toppingCnt[topping] += 1; // 철수가 모두 먹는 상태로 세팅
    }

    int toppingSize = topping.size();
    for (int i = 0; i < toppingSize; i++) {
        // 찾은 경우 find != end
        if (toppingCnt.find(topping[i]) != toppingCnt.end()) {
            toppingCnt[topping[i]] -= 1;
            brotherCnt[topping[i]] += 1;

            if (toppingCnt[topping[i]] == 0) {
                toppingCnt.erase(topping[i]);
            }
        }

        if (toppingCnt.size() == brotherCnt.size()) {
            answer += 1;
        }
    }

    return answer;
}