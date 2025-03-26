import java.util.*;

class Solution {

    public int solution(int[] queue1, int[] queue2) {
        int answer = 0;

        Queue<Integer> q1 = new LinkedList<>();
        Queue<Integer> q2 = new LinkedList<>();
        
        int limit = queue1.length * 3;
        
        long sum1 = Arrays.stream(queue1).sum(); // queue1 합
        long sum2 = Arrays.stream(queue2).sum(); // queue2 합
        long result = sum1 + sum2; // 총계
        
        // 합이 홀수면 같아질 수 없음
        if (result % 2 != 0) answer = -1; 
        
        // 덧셈에 활용하기 위해 q1, q2 값 넣기
        for (int i  = 0; i < queue1.length; i++) {
            q1.offer(queue1[i]);
            q2.offer(queue2[i]);
        }
        
        while (sum1 != sum2) {
            if (answer == limit) return -1;
            
            // queue1 합이 queue2 합보다 작은 경우
            if (sum1 < sum2) {
                // queue1 합계에 q2 값 더하고 반대로 queue2 합계는 빼줌
                sum1 += q2.peek(); 
                sum2 -= q2.peek(); 
                q1.offer(q2.poll());
                
            } else if (sum1 > sum2) { // queue1 합이 queue2 합보다 큰 경우
                // queue1 합계에 q2 값 빼고 반대로 queue2 합계는 더해줌
                sum1 -= q1.peek();
                sum2 += q1.peek();
                q2.offer(q1.poll());
                
            } else {
                break;
            }
            
            answer++;
        }
        
        return answer;
    }
}