function solution(storey) {
  const digits = String(storey).split("").map(Number);
  return getMinButtonCount(digits);
}

function getMinButtonCount(digits) {
  let count = 0;
  let carry = 0;

  // 일의 자리부터 순회
  for (let i = digits.length - 1; i >= 0; i--) {
    const currentDigit = digits[i] + carry;

    if (currentDigit === 0) {
      carry = 0;
      continue;
    }

    // 다음 자릿수 확인 (가장 큰 자릿수인 경우 0으로 처리)
    const nextDigit = i > 0 ? digits[i - 1] : 0;

    // 현재 숫자가 5인 경우 다음 자릿수를 보고 올릴지 내릴지 결정
    if (currentDigit === 5) {
      if (nextDigit >= 5) {
        count += 5;
        carry = 1;
      } else {
        count += 5;
        carry = 0;
      }
      continue;
    }

    // 5보다 큰 경우 올림
    if (currentDigit > 5) {
      count += 10 - currentDigit;
      carry = 1;
      continue;
    }

    // 5보다 작은 경우 내림
    count += currentDigit;
    carry = 0;
  }

  // 마지막 자리에서 올림이 발생한 경우
  return count + carry;
}
