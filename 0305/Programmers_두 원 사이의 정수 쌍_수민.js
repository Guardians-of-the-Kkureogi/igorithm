/**
 * 원의 방정식 x^2+y^2=r^2
 * r1 <= sqrt(x^2+y^2) <= r2 을 만족하는 x,y 찾기
 * r1^2<=x^2+y^2<=r2^2
 * 1사분면에 존재하는 좌표개수 x 4 = answer
 * 수학 어렵다...
 */

function solution(r1, r2) {
  let answer = 0;

  // x좌표를 의미미
  for (let x = 1; x <= r2; x++) {
    let y2 = Math.floor(Math.sqrt(r2 * r2 - x * x)); // 큰원의 y 최대값 (소수점이하버림)
    let y1 = Math.ceil(Math.sqrt(r1 * r1 - x * x)); // 작은원의 y 최소값(소수점이하올림)

    if (x > r1) {
      y1 = 0; // x좌표가 r1보다 크면 0
    }
    answer += y2 - y1 + 1;
  }
  return answer * 4;
}
