/*
1. 영어 객체 만들기
2. s에서 영단어 일치하는 값 있는지 확인
3. 시작 자릿수 높은 것 부터 숫자로 변경
*/

function solution(s) {
    var answer = 0;
    var match = { 'zero': 0, 'one': 1, 'two': 2, 'three': 3, 'four': 4, 'five': 5, 'six': 6, 'seven': 7, 'eight': 8, 'nine': 9 }
    for (key in match) {
        const isKeys = s.match(new RegExp(`${key}`, 'g'))
        if (isKeys != null)
            isKeys.forEach(isKey => {
                s = s.replace(isKey, match[isKey])
            })
    }
    answer = Number(s)
    return answer;
}