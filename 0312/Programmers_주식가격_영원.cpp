/*
    Level 2가 맞나..?
    문제에서 주어진대로 그냥 for문으로
    돌려도 크게 문제가 없는 size이다.
*/

#include <string>
#include <vector>

using namespace std;

vector<int> solution(vector<int> prices) {
    vector<int> answer(prices.size());

    for (int i = 0; i < prices.size(); i++) {
        int current = prices[i];
        int count = 0;
        for (int j = i + 1; j < prices.size(); j++) {
            if (current <= prices[j]) {
                count++;
            } else {
                count++;
                break;
            }
        }
        answer[i] = count;
    }

    return answer;
}