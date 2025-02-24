function solution(storey) {
  var answer = 0;
  while (storey != 0) {
    let secondNum = 0;
    let lastNum = 0;
    let stringStorey = storey.toString();
    if (stringStorey.length >= 2) {
      secondNum = Number(stringStorey.slice(-2).slice(0, 1)); // 십의자리
    }
    lastNum = Number(stringStorey.slice(-1)); // 1의자리
    if (lastNum > 5 || (lastNum >= 5 && secondNum >= 5)) {
      // 1의자리가 5보다 크거나, 1의자리와 10의자리가 5보다 크거나 같은 것
      answer = answer + (10 - lastNum);
      storey /= 10;
      storey = Math.floor(storey);
      storey += 1; // 올림
    } else {
      answer += lastNum;
      storey /= 10;
      storey = Math.floor(storey);
    }
  }
  return answer;
}