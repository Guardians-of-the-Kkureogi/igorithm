function solution(storey) {
  let answer = 0;

  while (storey > 0) {
    const num = storey % 10; // 현재 자리 숫자

    if (num > 5) {
      // 5초과일때, 10을 만든다.
      storey += 10 - num;
      answer += 10 - num;
    } else if (num === 5) {
      // 5일때, 다음 자리 숫자를 확인해서 결정
      if (Math.floor(storey / 10) % 10 >= 5) {
        storey += 5;
      }
      answer += 5;
    } else {
      // 5이하일때, num만큼 내려간다.
      answer += num;
    }
    storey = Math.floor(storey / 10); // 다음 자리 이동
  }
  return answer;
}
