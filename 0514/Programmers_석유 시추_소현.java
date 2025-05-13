// 그냥 석유량 카운트 시켜서 max값 찾았는데 효율성에서,,, ㅠ

import java.util.*;

class Point {
    int x, y;
    
    Point(int x, int y) {
        this.x = x;
        this.y = y;
    }
}

class Solution {
    
    static int N, M;

    static int[] oilDummy;
    static boolean[][] visited;
    
    static int[] dx = {-1, 1, 0, 0};
    static int[] dy = {0, 0, -1, 1};
    
    public int solution(int[][] land) {
        //  선언부
        int answer = 0;
        
        N = land.length;
        M = land[0].length;
        
        oilDummy = new int[M];
        visited = new boolean[N][M];
        
        for (int i = 0; i < N; i++) {
            for (int j = 0; j < M; j++) {
                if (land[i][j] == 1 && !visited[i][j]) {
                    bfs(land, i, j);
                }
            }
        }
        
        answer = oilDummy[0];
        for (int i = 1; i < M; i++) {
            answer = Math.max(answer, oilDummy[i]);
        }
        
        return answer;
    }
    
    public void bfs (int[][] land, int x, int y) {
        int cnt = 0;
        
        Queue<Point> queue = new LinkedList<>();
        Set<Integer> oil = new HashSet<>();
        
        queue.offer(new Point(x, y)); 
        oil.add(y); // 시추관 위치 추가
        visited[x][y] = true; // 방문
        
        cnt++; // 석유량 카운트
        
        while(!queue.isEmpty()) {
            Point p = queue.poll();
            
            for (int d = 0; d < 4; d++) {
                int nx = p.x + dx[d];
                int ny = p.y + dy[d];
                
                if (!rangeCheck(nx, ny) || land[nx][ny] == 0 || visited[nx][ny]) continue;
                
                visited[nx][ny] = true;
                queue.offer(new Point(nx, ny));
                oil.add(ny); // 시추관 위치 추가
                cnt++; // 석유량 카운트
            }
        }
        
        // 시추관 위치에 대한 석유량
        for (Integer o : oil) {
            oilDummy[o] += cnt;
        }
    }

    // 범위 체크
    public static boolean rangeCheck (int x, int y) {
        if (x < 0 || x >= N || y < 0 || y >= M) {
            return false;
        }
        return true;
    }
}