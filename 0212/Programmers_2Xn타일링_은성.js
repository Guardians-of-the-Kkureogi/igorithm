/**
 * 1. 재귀함수로 풀었다가 Maximum call stack size exceeded 에러 발생해서 다시 품.
 * 2. 점화식 f(n) = f(n-1) + f(n-2) -> 정답에만 %1000000007 해서 NaN 발생.
 * 3. 점화식에 %1000000007 처리했는데 효율성테스트에서 시간초과 발생..
 * 4. 최종 f2 점화식에만 %1000000007 처리 -> 효율성테스트 시간초과 발생..
 * 5. answer = f2 부분 제외 처리 -> 정답
 */

// 정답
function solution(n) {
    let f1 = 1
    let f2 = 2
    let temp = 0
    for (i = 3; i <= n; i++) {
        temp = f1
        f1 = f2 
        f2 = (temp + f2) % 1000000007
    }
    return f2
}

// 1번풀이
function sum(xSum, n, answer) { // x : 가로, xSum : 가로총합, n : 총 가로길이, answer : 정답카운트
    if (xSum == n) { // 타일 다 채웠으면 return
        answer.value += 1
        return
    }
    else if (xSum > n) { // 가로가 넘어가면 return
        return
    }
    else {
        sum(xSum + 1, n, answer)
        sum(xSum + 2, n, answer)
    }
}

function solution1(n) {
    var answer = { value: 0 }

    sum(1, n, answer)
    sum(2, n, answer)
    return answer.value;
}

// 2번풀이
function solution(n) {
    var answer = 0
    let f1 = 1
    let f2 = 2
    let temp = 0
    for (i = 3; i <= n; i++) {
        temp = f1
        f1 = f2 
        f2 = (temp + f2)
    }
    answer = f2 % 1000000007
    return answer
}

// 3번풀이
function solution(n) {
    var answer = 0
    let f1 = 1
    let f2 = 2
    let temp = 0
    for (i = 3; i <= n; i++) {
        temp = f1 % 1000000007
        f1 = f2 % 1000000007
        f2 = (temp + f2) % 1000000007
    }
    answer = f2
    return answer
}

// 4번풀이
function solution(n) {
    var answer = 0
    let f1 = 1
    let f2 = 2
    let temp = 0
    for (i = 3; i <= n; i++) {
        temp = f1
        f1 = f2
        f2 = (temp + f2) % 1000000007
    }
    answer = f2
    return answer
}

// 5번풀이 -> 정답

// 3번풀이
function solution(n) {
    let f1 = 1
    let f2 = 2
    let temp = 0
    for (i = 3; i <= n; i++) {
        temp = f1
        f1 = f2
        f2 = (temp + f2) % 1000000007
    }
    return f2
}