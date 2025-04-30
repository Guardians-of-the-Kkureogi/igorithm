import java.util.*;

// 배열 정렬식 정리 해야겠습니다.

class Solution {
    public int solution(int[][] scores) {
        int answer = 0;
        
        int[] wanho = scores[0];
        int wScore = wanho[0] + wanho[1];
        
        Arrays.sort(scores, (x, y) -> {
            if (x[0] != y[0]) {
                return Integer.compare(y[0], x[0]); // 태도 점수 기준 내림차순
            } else {
                return Integer.compare(x[1], y[1]); // 동료 평가 점수 기준 오름차순
            }
        });
        
        int maxScore = 0;
        int rank = 1;
        for (int[] score : scores) {            
            if (wanho[0] < score[0] && wanho[1] < score[1]) { // 원호 인센티브 받지 못하는 경우....
                return -1;
            }
            
            // 태도 점수 기준으로 내림차순해서 동료 평가 점수로 비교
            if (maxScore <= score[1]) {
                maxScore = score[1];
                if (score[0] + score[1] > wScore) { // 원호 점수 합보다 클 경우
                    rank++; 
                }
            } 
        }
        
        return rank;
    }
}