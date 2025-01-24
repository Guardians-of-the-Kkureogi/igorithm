/*
    Cpp가 익숙하지 않아서 시행착오가 많긴한데
    포인터 vector를 쓸땐 (*park)[0][0]으로 읽어야함을 배웠음

    시작위치인 S를 찾아서 currentPosition에 담아주고
    route의 방향과 칸수만큼 움직이면서 장애물이 있다면 skip
    없으면 해당 위치로 currentPosition을 바꿔주면서 진행하였다.

    요즘 Refactoring을 하는터라 함수가 길어지면 신경쓰여서 나눠둠
    findpostion도 너무 길어서 줄이고 싶지만.... 귀차니즘이 이겼다
*/

#include <string>
#include <vector>

using namespace std;

int dr[4] = {-1, 1, 0, 0};
int dc[4] = {0, 0, -1, 1};

vector<string> *park;
pair<int, int> currentPosition;

void findPosition() {
    for (int i = 0; i < (*park).size(); i++) {
        for (int j = 0; j < (*park)[i].size(); j++) {
            if ((*park)[i][j] == 'S') {
                currentPosition = make_pair(i, j);
            }
        }
    }
}

void move(string route) {
    int nr = currentPosition.first;
    int nc = currentPosition.second;
    int op;
    switch (route[0]) {
    case 'N':
        op = 0;
        break;
    case 'S':
        op = 1;
        break;
    case 'W':
        op = 2;
        break;
    default:
        op = 3;
        break;
    }

    for (int i = 0; i < route[2] - '0'; i++) {
        nr += dr[op];
        nc += dc[op];

        if ((*park).size() <= nr || (*park)[0].size() <= nc)
            return;

        if ((*park)[nr][nc] == 'X')
            return;
    }

    currentPosition = make_pair(nr, nc);
    return;
}

vector<int> solution(vector<string> park, vector<string> routes) {
    ::park = &park;
    findPosition();

    for (int i = 0; i < routes.size(); i++) {
        move(routes[i]);
    }

    vector<int> answer = {currentPosition.first, currentPosition.second};
    return answer;
}
