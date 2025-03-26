/**
 * 큐와 투 포인터 사용
 * 큐1+큐2 각각의 배열을 하나의 배열로 생각
 * 두개의 포인터를 통해 구간합을 조정
 */

// 합 구하는 함수
const sum = (arr) => arr.reduce((a, b) => a + b, 0);

function solution(queue1, queue2) {
  const totalSum = sum(queue1) + sum(queue2);
  const halfSum = totalSum / 2; // 절반 합

  if (totalSum % 2 !== 0) return -1; // 홀수면 -1

  // 두 큐 하나의 배열로 합치기
  const queue = [...queue1, ...queue2];

  let a = 0;
  let b = queue.length / 2;
  let answer = 0; // 움직인 횟수
  let currentSum = sum(queue1); // 큐1 의 합(기준이 될것)

  // 투 포인터 이동 로직
  while (a <= b) {
    if (currentSum === halfSum) return answer; // 합이 같아지면 answer 반환 (정답)

    // 현재 합이 작으면 b 증가
    if (currentSum < halfSum) {
      currentSum += queue[b];
      b++;
    } else {
      // 현재합이 작으면 a 감소
      currentSum -= queue[a];
      a++;
    }
    answer++;
  }

  return -1; // 불가능한 케이스
}
