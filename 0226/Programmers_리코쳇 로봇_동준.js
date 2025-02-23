function solution(board) {
  // 보드의 크기
  const n = board.length;
  const m = board[0].length;

  // 시작점과 도착점 찾기
  let sx = 0,
    sy = 0,
    ex = 0,
    ey = 0;
  board.forEach((row, i) => {
    [...row].forEach((col, j) => {
      if (col === "R") {
        sx = i;
        sy = j;
      } else if (col === "G") {
        // "G" 조건 수정
        ex = i;
        ey = j;
      }
    });
  });

  // 방문 배열 초기화
  const visit = Array.from({ length: n }, () => Array(m).fill(false));

  // BFS를 위한 큐
  let que = [[sx, sy, 0]]; // [x, y, count]
  visit[sx][sy] = true;

  // 4방향 이동 (우, 하, 좌, 상)
  const direction = [
    [0, 1],
    [1, 0],
    [0, -1],
    [-1, 0],
  ];

  while (que.length > 0) {
    const [x, y, count] = que.shift();

    // 목표 지점 도달 확인
    if (x === ex && y === ey) {
      return count;
    }

    // 4방향으로 이동
    for (const [dx, dy] of direction) {
      let nx = x;
      let ny = y;

      // 해당 방향으로 미끄러지기
      while (
        nx + dx >= 0 &&
        nx + dx < n &&
        ny + dy >= 0 &&
        ny + dy < m &&
        board[nx + dx][ny + dy] !== "D"
      ) {
        nx += dx;
        ny += dy;
      }

      // 방문하지 않은 위치라면 큐에 추가
      if (!visit[nx][ny]) {
        visit[nx][ny] = true;
        que.push([nx, ny, count + 1]);
      }
    }
  }

  return -1; // 도달할 수 없는 경우
}
