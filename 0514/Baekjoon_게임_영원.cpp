/*
    승률을 구해서 해당 승률보다 1 높을 때가 언제
    인지 구하는 문제

    간단하게 X, Y를 1씩 늘려가면서 승률이 1 높아지는
    순간을 찾을 수도 있지만 X와 Y의 범위가 10^9라서

    최대값을 이용하여 이분탐색을 해야한다고 느꼈다.
*/

#include <iostream>

using namespace std;

int main() {
    long long X, Y;
    cin >> X >> Y;

    int rate0 = (int)(Y * 100 / X);
    // 이미 99% 이상이면 올릴 수 없음
    if (rate0 >= 99) {
        cout << -1 << endl;
        return 0;
    }

    long long low = 1, high = 1000000000, ans = -1;
    while (low <= high) {
        long long mid = (low + high) / 2;
        long long nx = X + mid;
        long long ny = Y + mid;
        int rate = (int)(ny * 100 / nx);

        if (rate > rate0) {
            ans = mid;      // rate0 보다 커지는 순간
            high = mid - 1; // 더 작은 k가 있는지 탐색
        } else {
            low = mid + 1;
        }
    }

    cout << ans << endl; // 최소 k (없으면 -1)
    return 0;
}
