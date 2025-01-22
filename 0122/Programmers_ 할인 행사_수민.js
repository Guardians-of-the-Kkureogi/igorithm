function solution(want, number, discount) {
  let answer = 0;
  discount.forEach((item, i) => {
    const a = want.indexOf(item);
    if (a > -1) {
      number[a]--;
    }
    if (i >= 10) {
      const b = want.indexOf(discount[i - 10]);
      if (b > -1) {
        number[b]++;
      }
    }
    if (i >= 9) {
      const result = number.every((item) => item === 0);

      if (result) answer++;
    }
  });
  return answer;
}
