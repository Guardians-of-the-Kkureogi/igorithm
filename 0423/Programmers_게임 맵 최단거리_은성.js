/**
 * BFS 풀이
 */

function solution(maps) {
    var answer = -1;
    let directions = [
      [0, -1],
      [0, 1],
      [1, 0],
      [-1, 0],
    ];
    let row = maps.length;
    let col = maps[0].length;
  
    let visited = Array.from(Array(row), () => Array(col).fill(false));
    let queue = [];
  
    // 출발점
    visited[0][0] = true;
    queue.push([0, 0, 1]);
  
    while (queue.length > 0) {
      const now = queue.shift();
      const r = now[0];
      const c = now[1];
      const depth = now[2];
      if (r == row - 1 && c == col - 1) {
        answer = depth;
      }
  
      directions.forEach((direction, idx) => {
        const nr = r + direction[0];
        const nc = c + direction[1];
        if (
          nr > -1 &&
          nr < row &&
          nc > -1 &&
          nc < col &&
          maps[nr][nc] == 1 &&
          !visited[nr][nc]
        ) {
          visited[nr][nc] = true;
          queue.push([nr, nc, depth + 1]);
        }
      });
    }
    return answer;
  }