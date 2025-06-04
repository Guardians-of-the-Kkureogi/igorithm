// n, m : 격자의 크기
// x, y : 현재 위치
// r, c : 탈출 위치
// k : 이동 횟수

// 같은 격자를 두 번 이상 방문해도 되니까 dfs가 맞는 거 같음
// 근데 평생 탈출을 못할듯ㅎㅎ!

class Solution {
    
    static int n, m;
    static int x, y;
    static int r, c;
    static int k;
    
    // 사전순
    static int[] dx = {-1, 0, 0, 1};
    static int[] dy = {0, -1, 1, 0};
    static String[] dir = {"d", "l", "r", "u"}; 
    
    static String answer = "";
    
    public String solution(int n, int m, int x, int y, int r, int c, int k) {

        dfs("", x, y, r, c, n, m, k);
        
        return answer;
    }
    
    public void dfs (String str, int cx, int cy, int r, int c, int n, int m, int k) {
        
        // 이동을 다 했고
        // 현재 위치가 탈출위치일 때 
        if (str.length() == k && (cx == r && cy == c)) { 
            return;
        }
        
        for (int d = 0; d < 4;  d++) {
            int nx = cx + dx[d];
            int ny = cy + dy[d];
            
            // 범위체크
            if (!rangeCheck(nx, ny, n, m)) continue;
            
            str += d; // 이동한 방향 인덱스 추가
            dfs(str, nx, ny, r, c, n, m, k);
            
        }
    }
    
    public static boolean rangeCheck (int cx, int cy, int n, int m) {
        if (cx < 0 || cx >= n || cy < 0 || cy >= m) {
            return false;
        }
        return true;
    }
}