import java.util.*;

class Solution {
    
    static int N, M;
    static int rx, ry, nx, ny;
    static char[][] map;

    static boolean flag;
    static int[] dx = {0, 0, 1, -1}; 
    static int[] dy = {1, -1, 0, 0}; // 동 서 남 북
    
    public int[] solution(String[] park, String[] routes) {
        int[] answer = {};
                
        N = park.length;
        M = park[0].length();
        
        map = new char[N][M];
        
        for (int i = 0; i < N; i++) {
            map[i] = park[i].toCharArray();
            
            // 시작위치 
            if (park[i].contains("S")) {
                rx = i;
                ry = park[i].indexOf("S");
            }
        }
        
        for (int i = 0; i < routes.length; i++) {
            StringTokenizer st = new StringTokenizer(routes[i]);
            
            String op = st.nextToken(); // 방향
            int n = Integer.parseInt(st.nextToken()); // 방향 가중치
                   
            // move(방향, 방향가중치);
            switch (op) {
                case "E":
                    move(0, n);
                    break;
                case "W":
                    move(1, n);
                    break;
                case "S":
                    move(2, n);
                    break;
                case "N":
                    move(3, n);
                    break;
            }
        }
        
        answer = new int[] {rx, ry};
        return answer;
    }
    
    static void move (int dir, int n) {
        flag = true; // 초기화
        
        // 가중치만큼 for문 돌림
        for (int i = 1; i <= n; i++) {
            // 처음 이동 시, rx ry는 시작위치 좌표
            // 이후 방향과 가중치에 맞는 이동위치 좌표
            nx = rx + dx[dir] * i;
            ny = ry + dy[dir] * i;  
            
            // 범위를 벗어나거나 장애물을 만났을 때
            if (!rangeCheck(N, M, nx, ny) || map[nx][ny] == 'X') {
                flag = false;
                break;
            } 
        }
        
        if (flag) {
            rx = nx;
            ry = ny;
        }
    }
    
    static boolean rangeCheck (int N, int M, int x, int y) {
        if (x < 0 || x >= N || y < 0 || y >= M) return false;
        return true;
    }
}

