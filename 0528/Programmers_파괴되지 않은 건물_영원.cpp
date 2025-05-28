/*
    풀다보니 어디서 본 문제 같다 했더니
    풀었더긴 하더라,, 자바로,,

    누적합을 이용해서 푸는 문제
    누적합을 이용할 수 있다는 아이디어만 생각해내면
    쉽게 풀 수 있고 아니면 좀 어렵다
*/

#include <string>
#include <vector>

using namespace std;

int solution(vector<vector<int>> board, vector<vector<int>> skill) {
    int answer = 0;
    int r = board.size();
    int c = board[0].size();
    // 누적합 계산을 위해서 우측 한 칸과 아래 한 칸을 더 만듦
    vector<vector<int>> prefix(r + 1, vector<int>(c + 1, 0));

    // skill 적용 범위 누적합 처리
    for (int i = 0; i < skill.size(); ++i) {
        int type = skill[i][0];
        int degree = (type == 1 ? -skill[i][5] : skill[i][5]);
        int r1 = skill[i][1];
        int c1 = skill[i][2];
        int r2 = skill[i][3];
        int c2 = skill[i][4];

        prefix[r1][c1] += degree;
        prefix[r2 + 1][c1] -= degree;
        prefix[r1][c2 + 1] -= degree;
        prefix[r2 + 1][c2 + 1] += degree;
    }

    // 가로 방향 누적합
    for (int i = 0; i < r; ++i) {
        for (int j = 1; j < c; ++j) {
            prefix[i][j] += prefix[i][j - 1];
        }
    }
    // 세로 방향 누적합
    for (int j = 0; j < c; ++j) {
        for (int i = 1; i < r; ++i) {
            prefix[i][j] += prefix[i - 1][j];
        }
    }

    // 최종 상태 계산
    for (int i = 0; i < r; ++i) {
        for (int j = 0; j < c; ++j) {
            if (board[i][j] + prefix[i][j] > 0) {
                ++answer;
            }
        }
    }

    return answer;
}