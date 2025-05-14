/**
 *  이분탐색문제 -> 게임을 더 진행할 경우 승률이 변하는지 체크
 *  승률이 99% 이상이면 -1
 *  mid 만큼 더 했을 때 승률이 오르면 mid를 answer 저장 후 mid-1를 최대(right)로 두고 다시 계산
 *  승률이 똑같으면 더 해야함 -> left = mid + 1
 */

function solution(input) {
  const [x, y] = input[0].split(" ").map((x) => +x);
  const z = Math.floor((y * 100) / x);

  if (z >= 99) {
    return -1;
  }

  let left = 1,
    right = 1000000000,
    answer = -1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    const nextZ = Math.floor(((y + mid) * 100) / (x + mid));

    if (nextZ > z) {
      answer = mid;
      right = mid - 1; //더 작은 값 구하기
    } else {
      left = mid + 1;
    }
  }
  return answer;
}

const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");
console.log(solution(input));

// const inputStr = `
// 10 8
// `;

// const input = inputStr.trim().split("\n");
// console.log(solution(input));
