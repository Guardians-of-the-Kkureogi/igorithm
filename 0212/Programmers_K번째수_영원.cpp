/*
    간단하게 문제에서 요구하는 사항대로 코드를 작성하면
    문제없이 통과됨
*/

#include <algorithm>
#include <string>
#include <vector>

using namespace std;

int sortAndFind(vector<int> *array, int k) {
    sort(array->begin(), array->end());
    return (*array)[k];
}

vector<int> solution(vector<int> array, vector<vector<int>> commands) {
    vector<int> answer;
    for (int i = 0; i < commands.size(); i++) {
        int startIndex = commands[i][0] - 1;
        int endIndex = commands[i][1];

        vector<int> sliced(array.begin() + startIndex,
                           array.begin() + endIndex);
        answer.push_back(sortAndFind(&sliced, commands[i][2] - 1));
    }

    return answer;
}