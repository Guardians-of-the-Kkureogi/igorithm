/**
 * 모든 사람이 심사를 받는데 걸리는 시간을 최소로 하고 싶음
 * n: 기다리는 사람수, times: 각 심사관이 한명을 심사하는데 걸리는 시간
 * 모든 사람이 심사를 받는데 걸리는 시간의 최솟값 반환
 *
 * 시간을 기준으로 이분 탐색
 * left = 최소시간 = 1
 * right = 걸릴수 있는 최대시간 = 가장 오래 걸리는 시간 * n
 * 처리 가능한 인원이 n명 이상이면 시간을 줄이고, 미만이면 시간을 늘린다.
 *
 * 이분탐색 로직은 이해했는데, 문제를 보고 이분탐색이라고 파악하는 것이 아직 어렵다.
 */

function solution(n, times) {
  times.sort((a, b) => a - b);

  let answer = 0;
  let left = 1;
  let right = times[times.length - 1] * n; // 최대시간

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    let count = 0;

    times.forEach((time) => {
      count += Math.floor(mid / time);
    });

    if (count < n) {
      left = mid + 1;
    } else {
      answer = mid;
      right = mid - 1;
    }
  }
  return answer;
}

console.log(solution(6, [7, 10])); // 28
