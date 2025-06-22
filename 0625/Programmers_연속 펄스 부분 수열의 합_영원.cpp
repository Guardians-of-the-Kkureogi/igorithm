/*
    주어진 시퀀스에서 부분 수열에 펄스 수열을 곱했을 때
    얻을 수 있는 최대 합을 구하는 문제

    펄스 수열은 문제에서 보면 -1부터 시작되는 펄스 수열과
    +1 부터 시작되는 펄스 수열이 있는데
    주어진 시퀀스의 최대 길이는 50만 이기때문에
    두 개의 펄스 수열을 만들어서 계산해도 100만번 정도이다

    또 부분 수열의 최대 합을 구하는 문제는
    Kadane 알고리즘을 활용하면 된다
    Kadane 알고리즘은 O(n) 이기 때문에
    두 개의 펄스 수열을 계산해도 총 200만번 정도 소요되어
    가능하다고 판단하여 구현했다

    구현은 두 개의 펄스 수열을 만들고
    각각 Kadane 알고리즘으로 최대 합을 구하고
    둘 중 큰 값을 반환하는 방식으로 진행했다

    다풀고 GPT한테 평가를 부탁했는데
    O(n) * 4 말고 O(n)으로도 가능하다고 하더라 ㅎㅎ;;
*/
#include <algorithm>
#include <string>
#include <vector>

using namespace std;

long long kadane(vector<int> &sequence) {
    long long currentSum = 0;
    long long maxSum = -100000 * 500000LL;
    int start = 0, end = 0, tempStart = 0;

    for (int i = 0; i < sequence.size(); i++) {
        currentSum += sequence[i];

        if (currentSum > maxSum) {
            maxSum = currentSum;
            start = tempStart;
            end = i;
        }

        if (currentSum < 0) {
            currentSum = 0;
            tempStart = i + 1;
        }
    }

    return maxSum;
}

long long solution(vector<int> sequence) {
    vector<int> plusSequence;
    vector<int> minusSequence;

    for (int i = 0; i < sequence.size(); i++) {
        if (i % 2 == 0) {
            plusSequence.push_back(sequence[i]);
            minusSequence.push_back(sequence[i] * -1);
        } else {
            plusSequence.push_back(sequence[i] * -1);
            minusSequence.push_back(sequence[i]);
        }
    }

    return max(kadane(plusSequence), kadane(minusSequence));
}

// GPT가 알려준 O(n)으로 구현한 버전
long long solution(vector<int> sequence) {
    long long curPlus = 0, curMinus = 0, maxPlus = -100000 * 500000LL,
              maxMinus = -100000 * 500000LL;
    for (int i = 0; i < sequence.size(); ++i) {
        long long v = sequence[i];
        curPlus = max(0LL, curPlus) + ((i % 2 == 0) ? v : -v);
        curMinus = max(0LL, curMinus) + ((i % 2 == 0) ? -v : v);
        maxPlus = max(maxPlus, curPlus);
        maxMinus = max(maxMinus, curMinus);
    }
    return max(maxPlus, maxMinus);
}