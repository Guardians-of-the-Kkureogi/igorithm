function solution(s) {
  const stack = [...s];
  const n = stack.length;
  let answer = 0;

  // 올바른 괄호 문자열 여부 체크
  const check = (arr) => {
    const x = [];
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] === "(" || arr[i] === "{" || arr[i] === "[") {
        x.push(arr[i]);
      } else {
        const last = x.pop();
        if (
          (arr[i] === ")" && last !== "(") ||
          (arr[i] === "}" && last !== "{") ||
          (arr[i] === "]" && last !== "[")
        ) {
          return false;
        }
      }
    }
    return x.length === 0;
  };

  for (let i = 0; i < n; i++) {
    if (check([...stack])) answer++; // 올바른 괄호면 +1
    stack.push(stack.shift()); // 왼쪽 회전
  }

  return answer;
}
