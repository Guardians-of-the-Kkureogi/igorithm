class Solution {
    
    static int maxJoin = 0;
    static int maxPrice = 0;
    static int[] discounts = {10, 20, 30, 40}; 
    
    public int[] solution(int[][] users, int[] emoticons) {

        combination(new int[emoticons.length], users, emoticons, 0);
        
        return new int[] {maxJoin, maxPrice};
    }
    
    // 할인 비율 조합 만들기
    public void combination (int[] discountSet, int[][] users, int[] emoticons, int depth) {
        if (depth == emoticons.length) {
            simulation(users, emoticons, discountSet);
            return;
        }
        
         for (int discount : discounts) {
             discountSet[depth] = discount;
             combination(discountSet, users, emoticons, depth + 1);
        }
    }
    
    public void simulation (int[][] users, int[] emoticons, int[] discountSet) {
        int join = 0; // 가입자 수
        int price = 0; // 구매 비용
        
        for (int[] user : users) {
            int rate = user[0]; // 비율
            int limit = user[1]; // 가격
            int total = 0;
            
            for (int i = 0; i < emoticons.length; i++) {
                if (discountSet[i] >= rate) {
                    int temp = emoticons[i] * (100 - discountSet[i]) / 100;
                    total += temp;
                }
            }
            
            // 이모티콘 구매비용이 total보다 크면 이모티콘 플러스 서비스에 가입
            if (total >= limit) {
                join++;
            } else { // 그대로 구매
                price += total;
            }
        }
        
        // 가입자 수가 많은 경우 선택
        // 만약 가입자 수가 같다면 판매액이 클것
        if (join > maxJoin || (join == maxJoin && price > maxPrice)) {
            maxJoin = join;
            maxPrice = price;
        }
    }
}