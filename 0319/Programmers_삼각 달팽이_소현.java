class Solution {
    public int[] solution(int n) {
        // n = 4일 경우 1~10까지 숫자가 채워진다.
        int m = n * (n + 1) / 2; 
        
        int[] answer = new int[m];
        int[][] map = new int[n][n];
        
        int number = 1; // 숫자
        int x = -1; // x좌표
        int y = 0; // y좌표
         
        for (int i = 0; i < n; i++) {
            for (int j = i; j < n; j++) {
                if (i % 3 == 0) { // 세로
                    x++; // x좌표 증가
                } else if (i % 3 == 1) { // 가로
                    y++; // y좌표 증가
                } else if (i % 3 == 2) { // 대각선
                    x--; // x좌표 감소
                    y--; // y좌표 감소
                }
                map[x][y] = number++;
            }
        }
        
        
        int index = 0;
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < n; j++) {
                if (map[i][j] == 0) break; 
                
                answer[index++] = map[i][j];
            }
        }
        
        return answer;
    }
}