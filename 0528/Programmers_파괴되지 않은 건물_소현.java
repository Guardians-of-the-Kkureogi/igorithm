// 그냥 for문 열심히 돌렸는데 누적합이라구요,,,?
// 누적합 까먹음 이슈로 다시 공부했어요. 근데 다시 풀래요,,감이 잘 안 잡혀요.

class Solution {
    
    public int solution(int[][] board, int[][] skill) {
        int answer = 0;
        int N = board.length;
        int M = board[0].length;
        
        int[][] damage = new int[N + 1][M + 1];
        int[][] sum = new int[N + 1][M + 1];
        
        // 1. 내구도 계산하기
        for (int[] s : skill) {
            int r1 = s[1];
            int c1 = s[2];
            int r2 = s[3];
            int c2 = s[4];
            int power = s[5];
            
            if (s[0] == 1) { 
                power *= -1;
            }
            
            damage[r1][c1] += power;
            damage[r1][c2 + 1] -= power;
            damage[r2 + 1][c1] -= power;
            damage[r2 + 1][c2 + 1] += power;
            
        }
        
        // 2. 누적합 계산
        // 가로
        for (int i = 0; i < N + 1; i++) {
            for (int j = 1; j < M + 1; j++) {
                damage[i][j] += damage[i][j - 1];
            }
        }
        // 세로
        for (int i = 0; i < M + 1; i++) {
            for (int j = 1; j < N + 1; j++) {
                damage[j][i] += damage[j - 1][i];
            }
        }
        
        // 3. 파괴되지 않은 건물 개수
        for (int i = 0; i < N; i++) {
            for (int j = 0; j < M; j++) {
                if (board[i][j] + damage[i][j] > 0) {
                    answer++;
                }
            }
        }
    
    
        return answer;
    }
}