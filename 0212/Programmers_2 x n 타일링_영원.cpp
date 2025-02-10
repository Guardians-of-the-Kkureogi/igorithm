/*
    보통 이런 문제는 규칙이 있기 마련이라 생각함
    그래서 1부터 5까지 만들어봤는데
    n - 1과 n - 2의 합이 n이 되는 것을 발견
    그에 맞게 코드를 구성하였다.
*/

#include <string>
#include <vector>

using namespace std;

int solution(int n) {
    vector<int> dp;
    dp.push_back(0);
    dp.push_back(1);
    dp.push_back(2);

    for (int i = 3; i <= n; i++) {
        dp.push_back((dp[i - 1] + dp[i - 2]) % 1000000007);
    }
    return dp[n];
}