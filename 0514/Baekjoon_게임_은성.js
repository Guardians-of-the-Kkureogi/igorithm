/**
 * 이진탐색, 단순 공식 방법으로 생각했다가
 * 단순 공식으로 푸는 방법에 예제는 다 통과하길래 제출했는데 역시 실패..
 *
 * 금일 회식이라 Failed로 올리고 이진탐색으로 다시 풀어보겠습니다.. (날먹아님)
 */

const fs = require("fs");
const input = fs.readFileSync("예제.txt").toString().trim().split(" ");

const x = input[0];
const y = input[1];
const z = (y / x) * 100;

function calculator(x, y, z) {
  if (z >= 99) return -1;
  return Math.ceil((x * (z + 1) - 100 * y) / (99 - z));
}

console.log(calculator(x, y, z));
