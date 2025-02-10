import java.util.*;

class Solution {
    
    public int[] solution(int[] array, int[][] commands) {
        int[] answer = new int[commands.length];

        for (int i = 0; i < commands.length; i++) {
            ArrayList<Integer> list = new ArrayList<>(); // 매 순회 시, 초기화
            
            // commands 첫번째, 두번쨰 값을 기준으로 자르기
            for (int j = commands[i][0] - 1; j < commands[i][1]; j++) {
                list.add(array[j]);
            }
            
            Collections.sort(list); // 정렬
            answer[i] = list.get(commands[i][2] - 1); // k번째 위치 원소 
            
        }
        
        return answer;
    }
}