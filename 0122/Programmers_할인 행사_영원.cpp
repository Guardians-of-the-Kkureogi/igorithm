/*
    구매해야할 물품의 수는 회원 자격인 10일에 맞게끔 10개까지만 주어진다.

    오늘 회원가입을 했을 때 구매해야할 물품을 모두 할인가에 살 수 있는지를
    확인하는 문제 복잡하게 접근하진 않고 구매해야할 물품을
    map에 <이름, 물품수> 로 담아두고, 해당 날짜마다 가능한지 일일이 확인했다.

    일일이 확인한 이유는 discount 길이가 10만이고
    10일을 기준으로 확인해야해서 시간 복잡도가 100만 정도이기때문에 단순하게
    바로 풀이하였다.
*/

#include <string>
#include <unordered_map>
#include <vector>

using namespace std;

int solution(vector<string> want, vector<int> number, vector<string> discount) {
    int answer = 0;

    // init
    unordered_map<string, int> buyMap;
    int buyCount = 0;
    for (int i = 0; i < want.size(); i++) {
        buyMap[want[i]] = number[i];
        buyCount += number[i];
    }

    // check
    for (int i = 0; i <= discount.size() - buyCount; i++) {
        unordered_map<string, int> discountMap;
        for (int j = 0; j < buyCount; j++) {
            if (discountMap.find(discount[i + j]) != discountMap.end()) {
                discountMap[discount[i + j]] = discountMap[discount[i + j]] + 1;
            } else {
                discountMap[discount[i + j]] = 1;
            }
        }

        // compare
        bool isCan = false;
        for (const auto &buyItem : buyMap) {
            if (discountMap.find(buyItem.first) != discountMap.end() &&
                discountMap[buyItem.first] == buyItem.second) {
                isCan = true;
            } else {
                isCan = false;
                break;
            }
        }

        if (isCan) {
            answer += 1;
        }
    }

    return answer;
}