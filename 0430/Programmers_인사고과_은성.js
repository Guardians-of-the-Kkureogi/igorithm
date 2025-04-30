/**
 * 1. 첫번째 숫자 오름차순 정렬
 * 2. scores 전체 반복하면서 인센티브 조건에 맞는 데이터 incentives 배열에 추가
 * 3. 완호 점수 있는지 비교, 없으면 -1 return
 * 4. 완호 점수 있으면 전체 반복 돌면서 완호 등수 체크
 *
 * 첫번째, 시간초괴 발생 -> 2중 반복문으로 N^2 시간복잡도
 * 정렬 + 반복문 사용해서 NlogN으로 시간복잡도 변경
 */

function solution(scores) {
    var answer = 1;
    let incentives = [];
    let wanhoScore = scores[0];
    let wanhoSum = wanhoScore[0] + wanhoScore[1];
  
    // 정렬 기준 : 근태점수 내림차순 + 동료평가 오름차순 
    scores.sort((a, b) => {
      return b[0] - a[0] || a[1] - b[1];
    });
  
    // 첫번째 동료 인센티브 배열 push
    let firstMax = scores[0][0];
    let secondMax = scores[0][1];
    incentives.push(scores[0]);
  
    // scores 반복문 돌면서 첫번째 동료 근태점수와 같거나, 동료평가 max값보다 크면 인센티브 배열 push
    for (let i = 1; i < scores.length; i++) {
      if (firstMax == scores[i][0] || secondMax <= scores[i][1]) {
        incentives.push(scores[i]);
      }
      if (scores[i][1] >= secondMax) {
        secondMax = scores[i][1];
      }
    }
  
    // 완호가 인센티브에 속해있는지 확인
    let wanhoIdx = incentives.indexOf(wanhoScore);
    if (wanhoIdx === -1) return -1;
  
    // 완호보다 큰 점수에 대해 반복문 돌면서 완호 순위 확인
    incentives.splice(wanhoIdx, 1);
  
    for (let i = 0; i < incentives.length; i++) {
      if (incentives[i][0] + incentives[i][1] > wanhoSum) {
        answer += 1;
      }
    }
    return answer;
  }
  
  // 실패한 방식
  // for (let i = 0; i < scores.length; i++) {
  //   // 마지막 노드는 항상 추가
  //   if (i == scores.length - 1) incentives.push(scores[i]);
  //   for (let j = i + 1; j < scores.length; j++) {
  //     if (scores[j][0] > scores[i][0] && scores[j][1] > scores[i][1]) {
  //       break;
  //     }
  //     if (j == scores.length - 1) {
  //       incentives.push(scores[i]);
  //     }
  //   }
  // }