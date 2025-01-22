function solution(k, score) {
  const stack = [];
  const answer = [];
  for (const sc of score) {
    stack.push(sc);
    stack.sort((a, b) => b - a);
    if (stack.length > k) {
      stack.length = k;
    }
    answer.push(stack[stack.length - 1]);
  }
  return answer;
}
