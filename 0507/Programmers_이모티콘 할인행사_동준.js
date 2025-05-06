function solution(users, emoticons) {
  const discounts = [10, 20, 30, 40];
  let maxSubscribers = 0;
  let maxRevenue = 0;

  // 모든 이모티콘에 대해 가능한 할인율 조합을 생성
  function generateDiscountCombinations(emoticons, current = []) {
    if (current.length === emoticons.length) {
      let subscribers = 0;
      let revenue = 0;

      // 각 사용자에 대해 계산
      for (const [minDiscount, maxPrice] of users) {
        let total = 0;
        let isSubscriber = false;

        // 각 이모티콘에 대해 계산
        for (let i = 0; i < emoticons.length; i++) {
          if (current[i] >= minDiscount) {
            total += (emoticons[i] * (100 - current[i])) / 100;
          }
        }

        // 구매 금액이 기준을 넘으면 구독자로 전환
        if (total >= maxPrice) {
          subscribers++;
          isSubscriber = true;
        }

        // 구독자가 아닌 경우에만 매출에 포함
        if (!isSubscriber) {
          revenue += total;
        }
      }

      // 최대 구독자 수와 매출액 업데이트
      if (
        subscribers > maxSubscribers ||
        (subscribers === maxSubscribers && revenue > maxRevenue)
      ) {
        maxSubscribers = subscribers;
        maxRevenue = revenue;
      }
      return;
    }

    // 각 이모티콘에 대해 가능한 할인율 적용
    for (const discount of discounts) {
      generateDiscountCombinations(emoticons, [...current, discount]);
    }
  }

  generateDiscountCombinations(emoticons);
  return [maxSubscribers, maxRevenue];
}
