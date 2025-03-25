// shift를 쓰지말고 index 사용하기!!

function solution(queue1, queue2) {
  var answer = -1;
  let count = 0;
  let max_count = queue1.length + queue2.length;
  let q1Idx = 0;
  let q2Idx = 0;
  let q1Sum = 0;
  let q2Sum = 0;

  //queue1 반복 합 구하기
  queue1.forEach((q) => {
    q1Sum += q;
  });
  //queue2 반복 합 구하기
  queue2.forEach((q) => {
    q2Sum += q;
  });
  //절반 값 비교
  let half = (q1Sum + q2Sum) / 2;

  if ((q1Sum === q2Sum) === half) return answer;

  for (let i = 0; i < max_count + 5; i++) {
    // 종료조건
    if (q1Sum == q2Sum) {
      answer = count;
      break;
    }
    count = count + 1;
    if (q1Sum > q2Sum) {
      let shift = queue1[q1Idx];
      q1Sum -= shift;
      q2Sum += shift;
      queue2.push(shift);
      q1Idx += 1;
    } else if (q2Sum > q1Sum) {
      let shift = queue2[q2Idx];
      q2Sum -= shift;
      q1Sum += shift;
      queue1.push(shift);
      q2Idx += 1;
    }
    // 마지막까지 못찾으면 종료
    if (count == max_count) answer = -1;
  }
  return answer;
}