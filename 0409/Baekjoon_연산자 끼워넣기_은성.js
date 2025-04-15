/**
 * 백준 js로 풀기 어렵네,,
 * 무지성 풀다가 실패, dfs 풀다가 실패..
 */

const fs = require("fs");

const input = fs
  .readFileSync("../../input.txt")
  .toString()
  .trim()
  .split("\n")
  .map((el) => el.split(" "));

const count = input[0][0];
const numbersArr = input[1];
let max = -Infinity;
let min = Infinity;
const operatorArr = [];
let visited = Array(input[1].length - 1).fill(0);

// dfs로 풀기

// 연산자 넣기
input[2].map((opCount, idx) => {
  const op = idx === 0 ? "+" : idx === 1 ? "-" : idx === 2 ? "*" : "/";
  for (let i = 0; i < opCount; i++) {
    operatorArr.push(op);
  }
});

const calculator = (now, op, next) => {
  switch (op) {
    case "+":
      return now + next;
    case "-":
      return now - next;
    case "*":
      return now * next;
    case "/":
      return now < 0
        ? Math.floor(Math.abs(now) / next) * -1
        : Math.floor(now / next);
  }
};

const nowNum = Number(numbersArr.shift());

const dfs = (nowNum, count) => {
  if (count == operatorArr.length) {
    max = max < nowNum ? nowNum : max;
    min = min > nowNum ? nowNum : min;
    return;
  }
  for (let i = 0; i < operatorArr.length; i++) {
    if (visited[i] != -1) {
      const nowOp = operatorArr[i];
      const nextNum = Number(numbersArr.shift());
      result = calculator(nowNum, nowOp, nextNum);
      visited[i] = -1;
      dfs(result, count + 1, i);
      numbersArr.unshift(nextNum);
      visited[i] = 0;
    }
  }
};

dfs(nowNum, 0, 0);

console.log(max, min);
