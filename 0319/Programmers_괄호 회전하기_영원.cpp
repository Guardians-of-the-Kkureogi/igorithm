/*
    괄호 문제는 뭐다?
    스택이다~
*/

#include <stack>
#include <string>
#include <vector>

using namespace std;

bool checkCorrect(string s) {
    stack<int> stack;
    for (int i = 0; i < s.length(); i++) {
        if (s[i] == ']' || s[i] == ')' || s[i] == '}') {
            if (stack.size() == 0) {
                return false;
            } else {
                char pop = stack.top();
                stack.pop();
                if ((s[i] == ']') && (pop == '['))
                    continue;
                if ((s[i] == ')') && (pop == '('))
                    continue;
                if ((s[i] == '}') && (pop == '{'))
                    continue;

                return false;
            }
        } else {
            stack.push(s[i]);
        }
    }

    if (stack.size() == 0) {
        return true;
    }
    return false;
}

int solution(string s) {
    int answer = 0;
    for (int i = 0; i < s.length() - 1; i++) {
        if (checkCorrect(s)) {
            answer += 1;
        }

        s = s.substr(1) + s[0];
    }
    return answer;
}