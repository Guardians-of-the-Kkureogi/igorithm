/**
 * price가 몇초동안 안떨어졌는지 카운트..?
 * 이중 for문으로 각 초마다 비교했음
 */

function solution(prices) {
  const answer = new Array(prices.length).fill(0);

  for (let i = 0; i < prices.length - 1; i++) {
    for (let j = i; j < prices.length - 1; j++) {
      if (prices[i] <= prices[j]) {
        answer[i] += 1;
      } else {
        break;
      }
    }
  }

  return answer;
}
