// 스택 써야되나,,?

class Solution {
    public int[] solution(int[] prices) {
        int[] answer = new int[prices.length];
        
        for(int i = 0; i < prices.length; i++) {
            for(int j = i + 1; j < prices.length; j++) {
                answer[i]++;
                
                // 가격이 떨어졌을 경우 다음 값 비교
                if(prices[i] > prices[j]) break;
            }
        }
        return answer;
    }
}