import java.util.*;

class Solution {
    public int[] solution(String[] operations) {
        int[] answer = {0, 0};
        
        PriorityQueue<Integer> pq = new PriorityQueue<>();
        PriorityQueue<Integer> pqReverse = new PriorityQueue<>(Collections.reverseOrder());
        
        StringTokenizer st;
        
        for (int i = 0; i < operations.length; i++) {            
            st = new StringTokenizer(operations[i]);
            
            char op = st.nextToken().charAt(0); // operation
            int num = Integer.parseInt(st.nextToken()); // number
            
            switch (op) {
                case 'I' : 
                    // 숫자 삽입
                    pq.add(num);
                    pqReverse.add(num);
                    
                    break;
                case 'D' :
                    if (pq.isEmpty()) break;
                    
                    if (num == 1) {
                        // 최댓값 삭제
                        int max = pqReverse.poll();
                        pq.remove(max);
                    } else if (num == -1) {
                        // 최솟값 삭제
                        int min = pq.poll();
                        pqReverse.remove(min);
                    }
                    break;
            }
        }
        
        if (!pq.isEmpty()) {
            answer[0] = pqReverse.poll();
            answer[1] = pq.poll();
        }
        
        return answer;
    }
}