/*
    Level2 문제들은 보통 시간을 크게 신경쓰지
    않아도 되는 문제들인 것 같다.

    할인률은 10, 20, 30, 40 로 고정되어 있다
    이모티콘의 수는 최대 7개로 고정되어 있다
    그래서 4^7 = 16384 로 모든 경우의 수를
    다 계산해도 1초 안에 끝나기 때문에 충분하다

    makeRate 함수에서 할인률의 모든 경우의 수를 구하고
    다 구했다면 goCalculate 함수에서 user들이 구매하는
    가격 또는 플러스 구입 여부를 확인하고

    플러스 구입 횟수가 많은 값을 answer에 넣고
    만약 구입 횟수가 같다면 판매 금액이 더 큰 값을 넣어주면 된다
*/

#include <string>
#include <vector>

using namespace std;

int rate[] = {10, 20, 30, 40};
vector<int> emoticonRate;
vector<int> answer = vector<int>(2, 0);

void goCalculate(vector<vector<int>> &users, vector<int> &emoticons) {
    int plusCount = 0;
    int sellPrice = 0;

    for (int i = 0; i < users.size(); i++) {
        int sum = 0;
        for (int j = 0; j < emoticons.size(); j++) {
            if (emoticonRate[j] >= users[i][0]) {
                sum += emoticons[j] - (emoticons[j] * emoticonRate[j] / 100);
            }
        }

        if (sum >= users[i][1]) {
            plusCount += 1;
        } else {
            sellPrice += sum;
        }
    }

    // final
    if (answer[0] < plusCount) {
        answer[0] = plusCount;
        answer[1] = sellPrice;
    } else if (answer[0] == plusCount) {
        if (answer[1] < sellPrice) {
            answer[1] = sellPrice;
        }
    }
}

void makeRate(int size, int current, vector<vector<int>> &users,
              vector<int> &emoticons) {
    if (size <= current) {
        goCalculate(users, emoticons);
        return;
    }

    for (int i = 0; i < 4; i++) {
        emoticonRate[current] = rate[i];
        makeRate(size, current + 1, users, emoticons);
    }
}

vector<int> solution(vector<vector<int>> users, vector<int> emoticons) {
    emoticonRate = vector<int>(emoticons.size());
    makeRate(emoticons.size(), 0, users, emoticons);
    return answer;
}