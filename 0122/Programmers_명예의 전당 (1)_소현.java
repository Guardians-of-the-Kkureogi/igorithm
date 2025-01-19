import java.util.*;

class Solution {
    public int[] solution(int k, int[] score) {
        int[] answer = new int[score.length];
        
        // 1. 우선순위 큐 사용
        Queue<Integer> queue = new PriorityQueue<>();
        
        for (int i = 0; i < score.length; i++) {
            // 2. queue에 점수를 넣어준다.
            queue.offer(score[i]);
            
            // 3. queue 크기가 k보다 크면 뺀다.
            if (queue.size() > k) {
                queue.poll();
            }
            
            // 4. 우선순위 큐를 사용한 이유. 
            // 1번과 같이 우선순위 큐를 선언하면 우선순위가 낮은 작은 숫자부터 peek 가능
            answer[i] = queue.peek();
        }
        
        return answer;
    }
}