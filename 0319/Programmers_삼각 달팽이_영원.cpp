/*
    전체 크기는 (n * (n + 1)) / 2
    삼격형모양으로 다 왼쪽으로 정렬한 모양으로
    생각해서 그 모양에 맞게 움직여주면서 값을 넣어준다
    그렇게 모든 값을 채우면 해당 값들을 순서대로 정답에 넣는다

    사실 이거 예전에 풀어봐서 알았지
    다시하라면 못하겠다.
*/

#include <string>
#include <vector>

using namespace std;

vector<int> solution(int n) {
    vector<int> answer;
    vector<vector<int>> matrix(n, vector<int>(n));

    int r = -1;
    int c = 0;
    int num = 1;

    for (int i = 0; i < n; i++) {
        for (int j = i; j < n; j++) {
            if (i % 3 == 0) {
                r += 1;
            } else if (i % 3 == 1) {
                c += 1;
            } else if (i % 3 == 2) {
                r -= 1;
                c -= 1;
            }
            matrix[r][c] = num++;
        }
    }

    for (int i = 0; i < n; i++) {
        for (int j = 0; j < n; j++) {
            if (matrix[i][j] == 0)
                break;
            answer.push_back(matrix[i][j]);
        }
    }

    return answer;
}