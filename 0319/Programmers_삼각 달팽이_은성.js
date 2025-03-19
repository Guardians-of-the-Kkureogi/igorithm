/**
 * 1차원배열 이용해서 내려가기 -> 오른쪽 -> 위로 반복진행
 * 내려갈 때 index + 현재 층
 * 오른쪽 index + 1
 * 올라갈 때 index - 현재 층
 * 값이 이미 있거나, 더이상 못 갈 때 return
 */

function solution(n) {
  var answer = [];
  let array_length = 0;
  for (let i = 1; i <= n; i++) {
    array_length += i;
  }
  answer = new Array(array_length).fill(0);

  let now = 1;
  let start = 0;
  let stair = 1;
  let status = "down";
  let downStatus = false;
  let rightStatus = false;
  let upStatus = false;
  while (true) {
    if (status == "down") {
      answer[start] = now;
      start += stair;
      now += 1;
      stair += 1;
      if (now > array_length - 1 || answer[start] != 0) {
        stair -= 1;
        start = start - now + 2;
        status = "right";
      }
    } else if (status == "rignt") {
      answer[start] = now;
      start += 1;
      now += 1;
      if (now > array_length - 1 || answer[start] != 0) {
        start -= stair - 1;
        status = "up";
      }
    } else if (status == "up") {
      answer[start] = now;
      now += 1;
      stair -= 1;
      start -= stair;
      if (now > array_length - 1 || answer[start] != 0) {
        start += stair;
        status = "down";
      }
    }
    if (downStatus && rightStatus && upStatus) {
      return;
    } else {
      downStatus = false;
      rightStatus = false;
      upStatus = false;
    }
  }
  return answer;
}