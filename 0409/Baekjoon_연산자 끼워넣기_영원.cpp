/*
    오랜만에 백준하니까 출력 형식도 못맞추는
    바보가 되어버린 ㄴ ㅏ

    max와 min은 문제의 기준인 10억으로 맞춰주고
    여유가 있기 때문에 백트래킹을 사용해서
    모든 경우의 수를 탐색해주고
    결과값을 max와 min에 저장해주면 된다.
*/

#include <iostream>
#include <vector>

using namespace std;

int maxValue = -1000000000;
int minValue = 1000000000;

void backtracking(int index, int current, vector<int> &numbers,
                  vector<int> &operations) {
    if (index == numbers.size()) {
        if (current > maxValue)
            maxValue = current;
        if (current < minValue)
            minValue = current;
        return;
    }

    // 각 분기를 독립적으로 처리하기 위해 for문을 사용
    for (int i = 0; i < 4; i++) {
        if (operations[i] == 0)
            continue;

        operations[i]--;    // 사용한 연산자는 감소
        int next = current; // 현재 값을 보존한 후, 분기마다 계산할 새로운 변수

        if (i == 0)
            next += numbers[index];
        else if (i == 1)
            next -= numbers[index];
        else if (i == 2)
            next *= numbers[index];
        else if (i == 3)
            next /= numbers[index];

        backtracking(index + 1, next, numbers, operations);
        operations[i]++; // 백트래킹: 연산자 수 복원
    }
}

int main() {
    int count = 0;
    cin >> count;
    vector<int> numbers(count);
    vector<int> operations(4);

    for (int i = 0; i < count; i++) {
        cin >> numbers[i];
    }

    for (int i = 0; i < 4; i++) {
        cin >> operations[i];
    }

    backtracking(1, numbers[0], numbers, operations);
    cout << maxValue << "\n" << minValue << endl;

    return 0;
}