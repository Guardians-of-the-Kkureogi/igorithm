/**
 * 두 원 사이의 정수 좌표 쌍의 개수를 구하는 함수
 *
 * 풀이 전략:
 * 1. x축을 기준으로 r1, r2 범위를 탐색 (O(n))
 * 2. 각 x좌표에 대해 가능한 y좌표의 범위를 계산 (O(1))
 * 3. x, y축 대칭성을 이용해 전체 개수 계산
 *
 * 시간복잡도: O(r2)
 */

function solution(r1, r2) {
  let count = 0;

  for (let i = 1; i <= r2; i++) {
    const minY = Math.ceil(Math.sqrt(Math.max(0, r1 * r1 - i * i)));
    const maxY = Math.floor(Math.sqrt(r2 * r2 - i * i));
    count += maxY - minY + 1;
  }
  return count * 4;
}
