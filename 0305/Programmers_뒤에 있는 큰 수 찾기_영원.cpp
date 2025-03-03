/*
    주어지는 값이 백만개 정도여서
    현재값부터 순차적으로 뒤에 있는 수를 탐색하는건
    시간 초과가 발생함

    그래서 뒤에서부터 값을 남겨두면서
    확인하면서 앞을 채워주는 방식을 사용해야한다.
    처음에는 max를 이용해서 했는데 현재 값보다 크기만 하면
    되서 max는 아니고 그냥 큰 값들을 다 남겨둘 수 있는
    Stack을 사용함

    총 3가지의 조건만 맞춰서 구현하면됨
    1. stack이 비었을 땐 답에 -1을 넣고 자신을 스택에 넣기
    2. stack의 top이 자신보다 크다면 해당 값을 답에 넣고
       자신을 stack에 넣기
    3. top이 자신보다 작다면 pop하기
*/

#include <stack>
#include <string>
#include <vector>

using namespace std;

vector<int> solution(vector<int> numbers) {
    vector<int> answer(numbers.size());
    stack<int> stack;

    for (int i = numbers.size() - 1; i >= 0; i--) {
        while (true) {
            if (stack.size() == 0) {
                answer[i] = -1;
                stack.push(numbers[i]);
                break;
            } else {
                if (numbers[i] < stack.top()) {
                    answer[i] = stack.top();
                    stack.push(numbers[i]);
                    break;
                } else {
                    stack.pop();
                }
            }
        }
    }
    return answer;
}