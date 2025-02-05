import java.util.*;

class Solution {
    public int solution(int k, int[] tangerine) {
        int answer = 0;
        
        Map<Integer, Integer> map = new HashMap<>();
        
        // 1. 크기에 따른 귤 개수 저장
        for (int t : tangerine) {
            if(!map.containsKey(t)) {
                map.put(t, 1);
            } else {
                map.put(t, map.get(t) + 1);
            }
        }
        
        // 2. 우선순위가 높은 귤 크기 먼저 탐색하기 위해 내림차순
        PriorityQueue<Integer> pq = new PriorityQueue<>(Comparator.reverseOrder());
        
        for (int key : map.keySet()) {
            pq.offer(map.get(key));
        }
        
        // 3. 귤 크기의 개수가 k개보다 작을 때까지 반복해서 종류를 최소화
        while(!pq.isEmpty() && k > 0) {
            k -= pq.poll();
            answer++;
        }
        
        return answer;
    }
}