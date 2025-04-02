/**
 * 누적합 문제...
 *
 * 1. 콜라츠 추측으로 k가 1이 될 때까지의 값을 배열에 저장한다.
 * 2. 각 단계(횟수)를 x, 배열값(graphY[i])을 y로 하는 그래프를 그려 누적합을 구한다.
 * 3. 주어진 ranges배열을 이용해 특정구간의 넓이를 반환한다.
 *
 */

function solution(k, ranges) {
  // 1. y값 구함(콜라츠 추측)
  const graphY = [k];

  while (k != 1) {
    if (k % 2 === 0) {
      k = k / 2;
    } else {
      k = k * 3 + 1;
    }
    graphY.push(k);
  }
  // 2. 각 구간의 넓이를 구해 누적합 배열을 생성함
  const arr = new Array(graphY.length).fill(0);
  console.log(arr);
  for (let i = 1; i < arr.length; i++) {
    // 구간합을 구해 이전까지의 누적합을 더함
    arr[i] =
      Math.abs(graphY[i - 1] - graphY[i]) / 2 + Math.min(graphY[i - 1], graphY[i]) + arr[i - 1];
  }

  // 3. 각 구간별 넓이 계산
  return ranges.map(([a, b]) => {
    const start = a;
    const end = arr.length - 1 + b;

    if (start > end) return -1; // 범위가 잘못된 경우

    return arr[end] - arr[start];
  });
}
