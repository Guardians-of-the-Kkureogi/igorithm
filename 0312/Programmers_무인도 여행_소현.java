// 시간초과 남,, 다시 풀어볼게요.

import java.util.*;

class Point {
    int x, y;
    
    Point (int x, int y) {
        this.x = x;
        this.y = y;
    }
    
}

class Solution {
    
    static int N, M;
    static char[][] map;
    static boolean[][] visited;
    static Queue<Point> queue = new LinkedList<>();
    
    static int[] dx = {-1, 1, 0, 0};
    static int[] dy = {0, 0, -1, 1};
    
    public int[] solution(String[] maps) {
        
        ArrayList<Integer> list = new ArrayList<>();
        
        N = maps.length;
        M = maps[0].length();
        
        map = new char[N][M];
        visited = new boolean[N][M];
        
        for (int i = 0; i < N; i++) {
            map[i] = maps[i].toCharArray();
        }
        
        for (int i = 0; i < N; i++) {
            for (int j = 0; j < M; j++) {
                // 바다가 아닐경우 + 방문하지 않았을 경우
                if (map[i][j] != 'X' && !visited[i][j]) {
                    list.add(bfs(i, j)); // 
                }
            }
        }
        
        if (list.isEmpty()) {
            list.add(-1);
        } else {
            Collections.sort(list);
        }
        
        int[] answer = new int[list.size()];
        
        for (int i = 0; i < list.size(); i++) {
            answer[i] = list.get(i);
        }
        
        return answer;
    }
    
    public static int bfs (int x, int y) {
        queue.offer(new Point(x, y));
        visited[x][y] = true;
        
        int days = 0;
        
        while(!queue.isEmpty()) {
            Point p = queue.poll();
            
            days += map[p.x][p.y]; // 무인도에 머물 수 있는 날 더하기
            
            for (int d = 0; d < 4; d++) {
                int nx = p.x + dx[d];
                int ny = p.y + dy[d];
                
                // 범위 체크
                if (!rangeCheck(nx, ny)) continue;
                
                // 이미 방문했거나 바다일 경우
                if (visited[nx][ny] && map[nx][ny] == 'X') continue;
                
                visited[nx][ny] = true;
                queue.offer(new Point(nx, ny));
               
            }
        }
        
        return days;
        
    }
    
    // 범위 체크
    public static boolean rangeCheck (int x, int y) {
        if (x < 0 || x >= N || y < 0 || y >= M) {
            return false;
        }
        
        return true;
    }
}