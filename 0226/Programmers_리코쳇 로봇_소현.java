import java.util.*;

class Point {
    int x, y, count;
    
    Point (int x, int y, int count) {
        this.x = x;
        this.y = y;
        this.count = count;
    }
}

class Solution {
    
    static int N, M;
    static char[][] map;
    
    static int[] dx = {-1, 1, 0, 0};
    static int[] dy = {0, 0, -1, 1};
    public int solution(String[] board) {
        int answer = 0;
        
        N = board.length;
        M = board[0].length();
        
        map = new char[N][M];
        
        int x = 0;
        int y = 0;
        
        for (int i = 0; i < N; i++) {
            for (int j = 0; j < M; j++) {
                map[i][j] = board[i].charAt(j);

                // 출발 지점
                if (map[i][j] == 'R') {
                    x = i;
                    y = j;
                }
            }
        }
        
        answer = bfs(x, y);
        return answer;
    }
    
    public int bfs (int x, int y) {
        Queue<Point> queue = new LinkedList<>();
        boolean[][] visited = new boolean[N][M];
        
        queue.offer(new Point(x, y, 0));
        visited[x][y] = true;
        
        while (!queue.isEmpty()) {
            Point p = queue.poll();
            
            if (map[p.x][p.y] == 'G') { // 도착
                return p.count;
            }
            
            for (int d = 0; d < 4; d++) {
                int nx = p.x + dx[d];
                int ny = p.y + dy[d];
                
                while (true) {
                    if (rangeCheck(nx, ny) && map[nx][ny] != 'D') { // 범위를 넘지 않거나 장애물이 아닐 경우 계속 이동
                        nx += dx[d];
                        ny += dy[d];
                    } else { // 범위를 넘었거나 장애물이 있을 경우
                        nx -= dx[d];
                        ny -= dy[d];
                        
                        break;
                    }
                }
                
                // 아직 방문하지 않은 곳이면 해당 위치 탐색
                if (!visited[nx][ny]) {
                    queue.offer(new Point(nx, ny, p.count + 1));
                    visited[nx][ny] = true;
                }
            }
        }
        
        return -1;
    }
    
    // 범위 체크
    public boolean rangeCheck (int x, int y) {
        if (x < 0 || x >= N || y < 0 || y >= M) {
            return false;
        }
        
        return true;
    }
}