function solution(n) {
  const MOD = 1000000007;
  const dp = [0, 1, 2]; // 초기값을 배열에 미리 설정

  // 점화식을 통한 dp 계산
  for (let i = 3; i <= n; i++) {
    dp[i] = (dp[i - 1] + dp[i - 2]) % MOD;
  }

  return dp[n];
}
