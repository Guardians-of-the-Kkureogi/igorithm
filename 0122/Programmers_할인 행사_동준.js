function solution(want, number, discount) {
  let answer = 0;

  for (let i = 0; i <= discount.length - 10; i++) {
    let startIndex = i;
    let endIndex = i + 10;
    let possible = true;

    for (let j = 0; j < want.length; j++) {
      let count = discount
        .slice(startIndex, endIndex)
        .filter((item) => item === want[j]).length;

      if (count !== number[j]) {
        possible = false;
        break;
      }
    }

    if (possible) answer++;
  }

  return answer;
}
