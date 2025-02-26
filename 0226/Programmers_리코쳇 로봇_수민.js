const Dir = [
  [0, 1],
  [0, -1],
  [1, 0],
  [-1, 0],
];

function solution(board) {
  let answer = -1;
  const R = board.length;
  const C = board[0].length;
  const map = board.map((row) => [...row]);
  const visited = Array.from({ length: R }, () => Array(C).fill(false));
  let start;

  // 시작좌표 구하고, 방문표시하기
  map.forEach((row, i) => {
    row.forEach((item, j) => {
      if (item === "R") {
        start = [i, j];
        visited[start[0]][start[1]] = true;
      }
    });
  });

  // 한 방향으로 최대한 이동하기
  const move = (x, y, dx, dy) => {
    while (true) {
      const nx = x + dx;
      const ny = y + dy;

      if (nx < 0 || nx >= R || ny < 0 || ny >= C || map[nx][ny] === "D") {
        return [x, y];
      }

      x = nx;
      y = ny;
    }
  };

  // BFS 그래프 방식 현재 좌표와 count:이동수
  const queue = [[...start, 0]];

  while (queue.length) {
    const [x, y, count] = queue.shift();

    // 목표 도착하면 count반환
    if (map[x][y] === "G") {
      return count;
    }

    // 네 방향 이동
    Dir.forEach(([dx, dy]) => {
      // 다음 좌표
      const [nx, ny] = move(x, y, dx, dy);

      // 방문하지 않은 좌표라면 방문표시 + queue 추가
      if (!visited[nx][ny]) {
        visited[nx][ny] = true;
        queue.push([nx, ny, count + 1]);
      }
    });
  }

  return answer;
}
