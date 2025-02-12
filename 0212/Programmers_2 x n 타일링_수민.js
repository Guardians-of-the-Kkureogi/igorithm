// dp[n] = dp[n-1] + dp[n-2]

function solution(n) {
  const dp = [0, 1, 2];

  for (let i = 3; i < n + 1; i++) {
    dp.push((dp[i - 1] + dp[i - 2]) % 1000000007);
  }
  return dp[n];
}
