import java.util.*;

// 문제 100번 읽었네,,

class Solution {
    
    static List<Integer> list = new ArrayList<>();
    
    public double[] solution(int k, int[][] ranges) {
        double[] answer = new double[ranges.length];
        
        while (k > 1) { // 2. 1보다 크면 반복
            list.add(k); 
            
            if (k % 2 == 0) { // 1-1. 짝수 : 2로 나누기
                k /= 2;
            } else { // 1-2. 홀수 : 3 곱하고 1 더하기
                k = k * 3 + 1;
            }
        }
        
        list.add(k); // 마지막 수 넣기
        
        for (int i = 0; i < ranges.length; i++) {
            // 시작 ~ 끝 범위 구하기
            int start = ranges[i][0]; // 시작점
            int end = list.size() - 1 + ranges[i][1]; // 전체 범위 -1 + 끝점
            
            // 시작 범위가 끝 범위보다 크면 -1
            if (start > end) {
                answer[i] = -1;
            } else { // 그 외 사다리꼴 넓이 구해서 누적 합 계산
                answer[i] = calcArea(start, end);    
            }
        }
    
        return answer;
    }
    
    public double calcArea (int start, int end) {
        double sum = 0;
        for (int i = start; i < end; i++) {
            int top = list.get(i);
            int bottom = list.get(i + 1);
            
            double area = (top + bottom) * 0.5;
            sum += area;
          
        }
        return sum;
    }
}