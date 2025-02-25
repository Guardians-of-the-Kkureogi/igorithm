/*
테스트케이스 65층
1. 5층 올라감 -> 70층 (+5)
2. 10층 3번올라감 -> 100층 (+3)
3. 100층 1번 내려감 -> 도착 (+1)
--> 9번
*/
class Solution {
    public int solution(int storey) {
        int answer = 0;
        
        while (storey > 0) {
            int digit = storey % 10;
            storey /= 10;
                                               
            // 나머지가 5인 경우 앞자리가 5이상이면 올려줌
            if (digit == 5) {
                if (storey % 10 >= 5) {
                    answer += (10 - digit);
                    storey++;
                } else {
                    answer += digit;
                }
            } else if (digit > 5) { // 나머지가 5를 넘으면 올려줌
                answer += (10 - digit);
                storey++;
            } else {
                answer += digit;
            }   
        }
        
        return answer;
        
    }
}