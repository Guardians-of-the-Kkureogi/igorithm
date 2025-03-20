/**
 * 두 튜브 합 같게 만들기
 * sol : 투 포인터 + 원형큐 + 중단조건
 */

function solution(queue1, queue2) {
  let count = 0;

  let queue = [...queue1, ...queue2]; // 두 큐를 하나의 배열로 합침
  let left = 0,
    right = queue1.length; // 투 포인터 사용
  let sum1 = queue1.reduce((acc, cur) => acc + cur, 0);
  let sum2 = queue2.reduce((acc, cur) => acc + cur, 0);
  const total = sum1 + sum2;

  if (total % 2 !== 0) return -1; // 합이 홀수이면 절대 같아질 수 없음
  const target = total / 2;

  while (left < queue.length && right < queue.length * 2) {
    if (sum1 === target) return count;

    if (sum1 > target) {
      sum1 -= queue[left];
      left++;
    } else {
      sum1 += queue[right % queue.length]; // 원형 큐처럼 동작
      right++;
    }
    count++;
  }

  return -1;
}
