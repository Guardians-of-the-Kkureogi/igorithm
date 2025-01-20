import java.util.*;

/* 
- 원하는 제품 수량이 10개로 고정되어 있으므로 10일 연속 원하는 제품이 존재하는 지 체크하면 됨.
- 할인품목에 원하는 제품이 존재할 경우 value 값을 하나씩 뺀 후 map이 빈 상태인지를 체크하여 구현 
*/ 

class Solution {
    public int solution(String[] want, int[] number, String[] discount) {
        int answer = 0;
        HashMap<String, Integer> map = new HashMap<>();
        HashMap<String, Integer> copyMap = new HashMap<>();
        
        // 1. map에 원하는 제품과 수량을 넣는다.
        for (int i = 0; i < want.length; i++) {
            map.put(want[i], number[i]);   
        }
        
        for (int i = 0; i <= discount.length - 10; i++) {
            copyMap = new HashMap(map);
            
            for (int j = i; j < i + 10; j++) {
                String item = discount[j];
                // 2. 할인 제품에 원하는 제품이 존재할 경우
                if (copyMap.containsKey(item)) {
                    
                    // 3. value 값을 뺌
                    copyMap.put(item, copyMap.get(item) - 1);
                    
                    // 4. value == 0 일 경우 map에서 지워버림.
                    if (copyMap.get(item) == 0) {
                        copyMap.remove(item);
                    } 
                }
            }
            
            // 5. map이 비어있는 경우 count
            if (copyMap.isEmpty()) {
                answer++;
            }
         }
        
        return answer;
    }
}