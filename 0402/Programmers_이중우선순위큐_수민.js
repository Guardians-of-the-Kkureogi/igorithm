/**
 * 이렇게 푸는거 맞나? 자바스크립트는 그냥 정렬sort 돌리면 해결되긴함...
 */

function solution(operations) {
  const queue = [];
  operations.forEach((op) => {
    const [type, a] = op.split(" ");
    const num = Number(a);

    if (type === "I") {
      queue.push(num);
    } else if (type === "D") {
      queue.sort((a, b) => a - b);
      if (num > 0) {
        // 최댓값을 삭제
        queue.pop();
      } else {
        // 최솟값을 삭제
        queue.shift();
      }
    }
  });

  if (queue.length === 0) return [0, 0];
  queue.sort((a, b) => a - b);
  return [queue[queue.length - 1], queue[0]];
}
