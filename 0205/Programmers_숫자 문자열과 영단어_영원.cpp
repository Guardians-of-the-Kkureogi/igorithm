/*
    영어 단어를 발견하면 미리 설정해둔
    alphabet vector에서 검색해서 숫자로 변경

    영어 단어가 없다면 a를 리턴
    쌓아둔 string을 int로 변환 후 종료
*/

#include <string>
#include <vector>

using namespace std;

vector<string> alphabet = {"zero", "one", "two",   "three", "four",
                           "five", "six", "seven", "eight", "nine"};

char findNumber(string word) {
    for (int i = 0; i < alphabet.size(); i++) {
        if (alphabet[i] == word) {
            return i + '0';
        }
    }

    return 'a';
}

int solution(string s) {
    string result = "";

    // 문자열을 탐색하면서 숫자는 바로 출력, 알파벳은 찾기
    string foundAlphabet = "";
    for (int i = 0; i < s.length(); i++) {
        char current = s[i];
        if (current >= '0' && current <= '9') {
            result += current;
        } else {
            foundAlphabet += current;
        }

        if (foundAlphabet.length() > 0) {
            char num = findNumber(foundAlphabet);
            if (num != 'a') {
                result += num;
                foundAlphabet = "";
            }
        }
    }

    return stoi(result);
}