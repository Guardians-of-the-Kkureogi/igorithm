function solution(s) {
  var count = 0;
  let arr = s.split("");
  let n = arr.length;
  
  const open = ['[', '(', '{'];
  const close = [']', ')', '}'];

  for (let i = 0; i < n; i++) {
      let stack = [];
      let isValid = true;

      for (let char of arr) {
          // 열린 괄호이면 스택에 추가
          if (open.includes(char)) { 
              stack.push(char);
          } else {
              let index = close.indexOf(char);
              // 닫는 괄호가 올바른지 검사
              if (stack.length === 0 || stack.pop() !== open[index]) { 
                  isValid = false;
                  break;
              }
          }
      }

      if (isValid && stack.length === 0) count++;

      // 괄호 왼쪽으로 회전
      arr.push(arr.shift());
  }

  return count;
}