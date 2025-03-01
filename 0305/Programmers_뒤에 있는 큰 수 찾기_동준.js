/**
 * 프로그래머스 - 뒤에 있는 큰 수 찾기
 *
 * 1. 스택을 사용하여 인덱스를 저장
 * 2. 현재 숫자가 스택 top의 숫자보다 크면, 스택에서 pop하고 현재 숫자를 해당 인덱스의 답으로 저장
 * 3. 현재 인덱스를 스택에 push
 *
 * [시간 복잡도]
 * - O(n): 각 원소는 최대 한 번씩만 스택에 들어가고 나옴
 */
function solution(numbers) {
  const answer = Array(numbers.length).fill(-1);
  const stack = []; // 인덱스를 저장하는 스택

  for (let i = 0; i < numbers.length; i++) {
    // 스택이 비어있지 않고, 현재 숫자가 스택 top의 숫자보다 큰 동안
    while (stack.length > 0 && numbers[stack[stack.length - 1]] < numbers[i]) {
      answer[stack.pop()] = numbers[i];
    }
    stack.push(i);
  }

  return answer;
}
