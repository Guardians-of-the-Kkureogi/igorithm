class Solution {
    public long solution(int[] sequence) {
        long answer = 0;
        int N = sequence.length;
        
        int[] dp1 = new int[N];
        int[] dp2 = new int[N];
        
        for (int i = 0; i < N; i++) {
            dp1[i] = sequence[i] * (i % 2 == 0 ? 1 : -1); // [1, -1, 1, -1..]
            dp2[i] = sequence[i] * (i % 2 == 0 ? -1 : 1); // [-1, 1, -1, 1..]
        }
        
        // 초기값 설정
        long sum1 = dp1[0];
        long ans1 = dp1[0];
        
        long sum2 = dp2[0];
        long ans2 = dp2[0];
        
        for (int i = 1; i < N; i++) {
            // 각 펄스별로 연속된 합이 최대가 되는 값을 찾음
            sum1 = Math.max(dp1[i] + sum1, dp1[i]);
            ans1 = Math.max(ans1, sum1);
            
            sum2 = Math.max(dp2[i] + sum2, dp2[i]);
            ans2 = Math.max(ans2, sum2);
        }
        
        answer = Math.max(ans1, ans2);
        
        return answer;
    
    }
}