import java.util.*;

class Solution {
    public int solution(String[][] book_time) {
        int answer = 0;
        
        // 대실 시작 시간 기준으로 오름차순
        Arrays.sort(book_time, Comparator.comparing(time -> time[0]));
        
        // 퇴실 시간 기준으로 오름차순
        PriorityQueue<int[]> queue = new PriorityQueue<>(Comparator.comparingInt(time -> time[1]));
        
        for (String[] time : book_time) {
            String[] start = time[0].split(":");
            String[] end = time[1].split(":");
            
            int startTime =  Integer.parseInt(start[0]) * 60 + Integer.parseInt(start[1]);
            int endTime = Integer.parseInt(end[0]) * 60 + Integer.parseInt(end[1]) + 10; // 퇴실시간 + 청소시간 포함
            
            if (queue.isEmpty()) {
                queue.offer(new int[]{startTime, endTime}); // 대실 시작 시간, 퇴실 시간
            } else {
                int[] checkIn = queue.peek(); 
                
                // 현재 대실 시작 시간이 종료 시간 보다 크거나 같을 경우
                if (startTime >= checkIn[1]) {
                    // 체크아웃 시키자
                    queue.remove();
                }
                
                queue.offer(new int[]{startTime, endTime});
            }
        }
        
        return queue.size();
    }
}