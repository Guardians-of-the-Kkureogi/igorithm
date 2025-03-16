function solution(s) {
  let answer = 0;

  // 괄호 쌍 매칭 객체
  const BRACKET_PAIRS = {
    "{": "}",
    "[": "]",
    "(": ")",
  };

  // 닫는 괄호 집합
  const CLOSING_BRACKETS = new Set(["}", "]", ")"]);

  let brackets = [...s];
  const length = s.length;

  for (let i = 0; i < length; i++) {
    const tempBrackets = [...brackets];
    const stack = [];
    const firstBracket = tempBrackets.shift();
    let isValid = true;

    // 첫 문자가 닫는 괄호면 무효
    if (CLOSING_BRACKETS.has(firstBracket)) {
      isValid = false;
    }

    stack.push(firstBracket);

    while (stack && tempBrackets.length > 0 && isValid) {
      const currentBracket = tempBrackets.shift();

      if (CLOSING_BRACKETS.has(currentBracket)) {
        if (BRACKET_PAIRS[stack[stack.length - 1]] !== currentBracket) {
          isValid = false;
        } else {
          stack.pop();
        }
      } else {
        stack.push(currentBracket);
      }
    }

    // 모든 괄호가 올바르게 매칭되었는지 확인
    if (isValid && stack.length === 0) {
      answer += 1;
    }

    // 문자열 회전
    brackets.push(brackets.shift());
  }

  return answer;
}
