// 시복 O(n)
function solution(prices) {
  const n = prices.length;
  const result = Array(n).fill(0);
  const stack = [0]; // 가격이 떨어지지 않은 시점들의 인덱스

  // 각 시점별로 이전 가격들과 비교
  for (let i = 1; i < n; i++) {
    // 현재 가격이 이전 가격보다 작은 경우를 처리
    while (stack.length > 0 && prices[stack[stack.length - 1]] > prices[i]) {
      const prevIndex = stack.pop();
      result[prevIndex] = i - prevIndex;
    }
    stack.push(i);
  }

  // 끝까지 가격이 떨어지지 않은 경우 처리
  return result.map((duration, index) =>
    duration === 0 ? n - 1 - index : duration
  );
}
