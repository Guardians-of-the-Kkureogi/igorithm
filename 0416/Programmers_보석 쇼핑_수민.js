/**
 * 투포인터 문제
 * start,end 인덱스 포인터를 이용해 보석 구간 업데이트해주기
 * 1. 선택된 구간에 모든 보석의 종류가 없다면 end 수 증가
 * 2. 선택된 구간에 모든 보석의 종류가 존재하면 start 수 증가
 * 3. 선택된 구간의 길이가 가장 짧고 인덱스 수가 작은 순으로 반환
 */

function solution(gems) {
  const total = new Set(gems).size; // 보석 종류 수
  const map = new Map(); // 선택된 구간 보석 수 저장

  let start = 0,
    end = 0;
  let answer = [0, gems.length - 1];
  map.set(gems[0], 1);

  while (start <= end && gems.length > end) {
    // 모든 종류 보석 존재하면 answer 업데이트
    if (map.size === total) {
      // 길이가 최소인 값을 저장
      if (end - start < answer[1] - answer[0]) {
        answer = [start, end];
      }
      // start 늘리기
      const startGem = gems[start];
      map.set(startGem, map.get(startGem) - 1);
      if (map.get(startGem) === 0) {
        map.delete(startGem);
      }
      start += 1;
    } else {
      // end 늘리기
      end += 1;
      const endGem = gems[end];
      if (end < gems.length) {
        map.set(endGem, (map.get(endGem) || 0) + 1);
      }
    }
  }
  return [answer[0] + 1, answer[1] + 1];
}
