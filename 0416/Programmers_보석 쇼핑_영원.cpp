/*
    문제에서 봤을 때 처음 난관은
    구간의 크기를 어떻게 설정할 것인가 입니다
    이 부분을 결국 해결하진 못했습니다

    배열의 크기는 10만개이기 때문에 N^2이면 시간초과이고
    그래서 N 정도의 탐색 시간을 가지는 투포인터를 이용해야합니다.
    투포인터를 각각 어떻게 움직여서 구간을 정할지가 중요한데
    right를 먼저 지정하고 그 다음에 left를 지정하여 줍니다

    코드는 먼저 전체 보석의 개수를 구해두고 시작하며
    현재 탐색 중인 투포인터 구간의 보석의 종류의 수가
    전체 보석의 개수가 될 때까지 right를 늘려줍니다

    그 후에 left는 보석 종류가 유지되는 선에서 늘려주고
    보석 종류가 줄어들면 다시 right을 늘려주면서

    구간을 업데이트해주는 식으로 반복합니다.
*/
#include <algorithm>
#include <iostream>
#include <map>
#include <string>
#include <vector>

using namespace std;

vector<int> solution(vector<string> gems) {
    vector<int> answer;
    int totalGemTypes = 0;
    map<string, int> gemTypeMap;

    for (int i = 0; i < gems.size(); i++) {
        if (gemTypeMap.find(gems[i]) == gemTypeMap.end()) {
            gemTypeMap.insert(pair<string, int>(gems[i], totalGemTypes));
            totalGemTypes++;
        }
    }

    int left = 0, right = 0, resultLeft = 0, resultRight = 0;
    int bestRangeLength = gems.size() + 1;
    int prevRight = 0;
    map<string, int> currentGemCount;

    while (true) {
        if (gems.size() - left < totalGemTypes || right >= gems.size() ||
            left > right)
            break;

        if (right != prevRight || right == 0) {
            if (currentGemCount.find(gems[right]) == currentGemCount.end()) {
                currentGemCount.insert(pair<string, int>(gems[right], 1));
            } else {
                currentGemCount[gems[right]]++;
            }
        }
        prevRight = right;

        if (currentGemCount.size() == totalGemTypes) {
            if (right - left < bestRangeLength) {
                resultLeft = left;
                resultRight = right;
                bestRangeLength = right - left;
            }
            if (currentGemCount[gems[left]] == 1) {
                currentGemCount.erase(gems[left]);
            } else {
                currentGemCount[gems[left]]--;
            }
            left++;
        } else {
            right++;
        }
    }

    answer.push_back(resultLeft + 1);
    answer.push_back(resultRight + 1);
    return answer;
}
