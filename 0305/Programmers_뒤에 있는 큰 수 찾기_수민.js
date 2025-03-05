/**
 * 스택을 활용하여 O(n)으로 풀기...
 * 스택에 값을 저장하는것이 아니라 위치를 저장하여 비교
 * 뒤에서 더 큰수가 발견될때만 업데이트하기
 *
 */

function solution(numbers) {
  const answer = new Array(numbers.length).fill(-1); // 정답 배열
  const stack = []; // numbers의 인덱스를 저장

  // numbers 순회, number: 비교하려는 배열의 값, index: 배열 인덱스값
  numbers.forEach((number, index) => {
    // 스택에 값이 있고 + numbers[스택의 최상단 인덱스]와 현재 값을 비교하여 현재 값이 크면 answer[스택 최상단 인덱스]에 현재 값 저장, 스택 pop
    while (stack.length && numbers[stack[stack.length - 1]] < number) {
      answer[stack.pop()] = number;
    }
    // 현재 인덱스 push
    stack.push(index);
  });

  return answer;
}
