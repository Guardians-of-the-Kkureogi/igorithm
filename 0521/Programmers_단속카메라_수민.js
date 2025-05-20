/**
 * routes 첫번째 인덱스 오름차순으로 정렬
 * 겹치는 구간을 체크
 * 겹치는 구간이 없으면 카운트+1, 새로운 구간 설정
 *
 */

function solution(routes) {
  routes.sort((a, b) => a[0] - b[0]);
  let answer = 1,
    start = routes[0][0],
    end = routes[0][1];

  routes.forEach(([a, b]) => {
    if (start <= a && a <= end) {
      start = a;
      end = Math.min(end, b);
    } else {
      answer++;
      start = a;
      end = b;
    }
  });
  return answer;
}
