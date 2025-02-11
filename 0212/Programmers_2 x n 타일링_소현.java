class Solution {
    public int solution(int n) {
        int answer = 0;
        
        int[] dp = new int[n + 1];
        
        dp[1] = 1; // 가로 1일 때 -> 1개
        dp[2] = 2; // 가로 2일 때 -> 2개
        
        /*
            가로 3일 때 -> 3개
            가로 4일 때 -> 5개
        */
        for (int i = 3; i <= n; i++) {
            dp[i] = (dp[i - 1] + dp[i - 2]) % 1000000007;
        }
        
        answer = dp[n];
        
        return answer;
    }
}