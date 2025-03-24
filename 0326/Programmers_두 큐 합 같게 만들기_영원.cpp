/*
    시간 초과에 유의해야한다
    미리 합을 가지고 있는 변수를 만들어두고
    합을 기반으로 큐에 있는 값을 비교하고
    이동하면서 값이 같아질 때 까지 찾는다

    length * 3 이면 모든 값을 다 비교해보기때문에
    더이상 탐색하는 것은 의미가 없어서 종료해주어야함
*/

#include <queue>
#include <string>
#include <vector>

using namespace std;

int solution(vector<int> queue1, vector<int> queue2) {
    queue<long long> q1, q2;
    int length = queue1.size();
    long long sum = 0, q1Sum = 0, q2Sum = 0;

    // 전체 합과 각각의 합을 계산해서 넣기
    for (int i = 0; i < length; ++i) {
        long long curQ1 = queue1[i];
        long long curQ2 = queue2[i];

        sum += curQ1 + curQ2;
        q1Sum += curQ1;
        q2Sum += curQ2;

        q1.push(curQ1);
        q2.push(curQ2);
    }

    // 절반으로 나눌 수 없다면 종료
    if (sum % 2 == 1)
        return -1;

    int cnt = 0;
    int maxOps = length * 3; // 최대 연산 횟수 제한

    // 각 합에 따라 값을 교환하면서 같게 만들기
    while (cnt < maxOps) {
        if (q1Sum > q2Sum) {
            long long moveNumber = q1.front();
            q1.pop();
            q1Sum -= moveNumber;
            q2.push(moveNumber);
            q2Sum += moveNumber;
            cnt++;
        } else if (q2Sum > q1Sum) {
            long long moveNumber = q2.front();
            q2.pop();
            q2Sum -= moveNumber;
            q1.push(moveNumber);
            q1Sum += moveNumber;
            cnt++;
        } else {
            return cnt;
        }
    }

    return -1;
}