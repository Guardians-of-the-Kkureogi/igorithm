/**
 *  백준으로 node.js 방식으로 푸는거 쉽지 않네...
 * 문제 난이도는 괜찮았는데 node.js 로 제출하는 코드를 몰라서 구글링했습니다 ㅠ 그래서 실패로 등록함
 */

const filePath = process.platform === "linux" ? "/dev/stdin" : "../test.txt";
const input = require("fs").readFileSync(filePath).toString().trim().split("\n");

function solution(input) {
  const N = +input[0];
  const arr = input[1].split(" ").map(Number);
  const operators = input[2].split(" ").map(Number);
  let max = -Infinity;
  let min = Infinity;

  const calculate = [
    (a, b) => a + b,
    (a, b) => a - b,
    (a, b) => a * b,
    (a, b) => {
      if (a < 0) return -Math.floor(Math.abs(a) / b);
      else return Math.floor(a / b);
    },
  ];

  const dfs = (count, result) => {
    if (count === N - 1) {
      max = Math.max(max, result);
      min = Math.min(min, result);
      return;
    }

    for (let i = 0; i < 4; i++) {
      if (operators[i] > 0) {
        operators[i]--;
        const next = calculate[i](result, arr[count + 1]);
        dfs(count + 1, next);
        operators[i]++;
      }
    }
  };

  dfs(0, arr[0]);
  return `${max}\n${min}`;
}

console.log(solution(input));