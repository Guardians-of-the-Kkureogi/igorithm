function solution(users, emoticons) {
  var answer = [];
  const discounts = [10, 20, 30, 40];
  let totalSubscribers = 0;
  let totalPrice = 0;
  const allDiscount = [];

  // 전체 할인 조합 생성
  const makeCombos = (idx, combo) => {
    if (idx === emoticons.length) {
      allDiscount.push([...combo]);
      return;
    }

    for (let discount of discounts) {
      combo.push(discount);
      makeCombos(idx + 1, combo);
      combo.pop();
    }
  };

  makeCombos(0, []);

  // 각 할인 조합에 대해 계산
  for (let discounts of allDiscount) {
    let subscribers = 0;
    let totalFee = 0;

    // 사용자 별 조회
    for (let [minDiscount, minFee] of users) {
      let nowPrice = 0;

      // 이모티콘 할인가격 조회
      for (let i = 0; i < emoticons.length; i++) {
        const discount = discounts[i];

        if (discount >= minDiscount) {
          const discountPrice = emoticons[i] * (1 - discount / 100);
          nowPrice += discountPrice;
        }
      }

      // 최소비용 넘으면 구독
      if (nowPrice >= minFee) {
        subscribers++;
      } else {
        totalFee += nowPrice;
      }
    }

    if (
      subscribers > totalSubscribers ||
      (subscribers == totalSubscribers && totalFee > totalPrice)
    ) {
      totalSubscribers = subscribers;
      totalPrice = totalFee;
    }
  }

  return [totalSubscribers, totalPrice];
}

solution(
  [
    [40, 10000],
    [25, 10000],
  ],
  [7000, 9000]
);
