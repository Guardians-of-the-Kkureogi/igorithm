/**
 * 문제풀이 : array.slice()로 원본 문자열 유지, 자르기
 * array.sort()로 오름차순 정렬
 */

function solution(array, commands) {
    var answer = [];
    commands.forEach((command) => {
        let i = command[0]
        let j = command[1]
        let k = command[2]

        const newArr = array.slice(i - 1, j).sort((a, b) => a - b)
        answer.push(newArr[k - 1])
    })
    return answer;
}