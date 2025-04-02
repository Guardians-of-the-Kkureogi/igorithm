function solution(k, ranges) {
  // 우박수열 정적분 구하기
  let arr = [k];
  var answer = [];
  while (k !== 1) {
    k = k % 2 === 1 ? k * 3 + 1 : k / 2;
    arr.push(k);
  }
  ranges.forEach(range => {
    let x1 = range[0];
    let x2 = arr.length - 1 + range[1];
    let integral = 0;

    if (x1 > x2) {
      answer.push(-1);
      return;
    }

    for (let i = x1; i < x2; i++) {
      //윗변 + 아랫변 / 2
      integral += (arr[i] + arr[i + 1]) / 2;
    }
    answer.push(integral);
  });
  return answer;
}