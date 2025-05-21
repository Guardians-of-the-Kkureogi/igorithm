import java.util.*;

class Solution {
    public int solution(int[][] routes) {
        int answer = 0;
        
        // 1. 진출 지점 기준으로 오름차순
        Arrays.sort(routes, (x, y) -> Integer.compare(x[1], y[1]));
        
        int camera = -1 * 30_000;  // 차량 진입 지점 최솟값으로 카메라 위치 지정
        for (int[] r : routes) {
            // 2. 카메라 위치가 진입 지점보다 작을 경우
            if (r[0] > camera) { 
                camera = r[1]; // 새로운 위치에 카메라 설치
                answer++; 
            }
        }
        
        return answer;
    }
}