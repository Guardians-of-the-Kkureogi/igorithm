/*
    보다보니 백준에서 풀었던 문제라서
    쉽게 풀줄 알았는데
    TC가 조금 추가되서 틀리더라

    질문하기쪽에 열어보니 중복된 값이 남아있을 수
    있어서 max에서 제거한 값을
    min에서도 제거해주는 로직이 추가로 들어가야한다고
    (https://school.programmers.co.kr/questions/79533)
    하는데 눈이 감길거같아서 여기까지....
*/

#include <queue>
#include <sstream>
#include <string>
#include <vector>

using namespace std;

vector<int> solution(vector<string> operations) {
    int size = 0;

    priority_queue<int> maxHeap;
    priority_queue<int, vector<int>, greater<int>> minHeap;

    for (const string &op : operations) {
        stringstream ss(op);
        char command;
        int number;
        ss >> command >> number;

        if (size == 0) {
            while (!maxHeap.empty())
                maxHeap.pop();
            while (!minHeap.empty())
                minHeap.pop();
        }

        if (command == 'I') {
            maxHeap.push(number);
            minHeap.push(number);
            size += 1;
        } else {
            // 빈 큐에 데이터를 삭제하라는 연산이 주어질 경우, 해당 연산은
            // 무시합니다
            if ((number == 1) && (size != 0)) {
                maxHeap.pop();
                size -= 1;
            } else if ((number == -1) && (size != 0)) {
                minHeap.pop();
                size -= 1;
            }
        }
    }

    vector<int> answer;
    if (size == 0) {
        answer.push_back(0);
        answer.push_back(0);
    } else {
        answer.push_back(maxHeap.top());
        answer.push_back(minHeap.top());
    }

    return answer;
}