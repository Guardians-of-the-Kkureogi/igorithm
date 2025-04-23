/**
 * 시작 -> 도착 가장 짧은 거리 구하기 = BFS 알고리즘
 * 처음 방문하는 좌표면 queue에 넣기
 * 큐에 좌표값이 존재하면 꺼내서 이동할 수 있는 좌표에 +1 후 저장하고 queue에 추가하기
 * 도착 좌표값이 1보다 크면 출력하고 아니면 -1 출력
 */
const dir = [
  [0, 1],
  [0, -1],
  [1, 0],
  [-1, 0],
];

function solution(maps) {
  const n = maps.length;
  const m = maps[0].length;
  const queue = [[0, 0]];

  while (queue.length) {
    const [x, y] = queue.shift();

    dir.map(([dx, dy]) => {
      const nx = dx + x;
      const ny = dy + y;

      if (0 <= nx && nx < n && 0 <= ny && ny < m && maps[nx][ny] === 1) {
        maps[nx][ny] = maps[x][y] + 1;
        queue.push([nx, ny]);
      }
    });
  }

  return maps[n - 1][m - 1] > 1 ? maps[n - 1][m - 1] : -1;
}

console.log(
  solution([
    [1, 0, 1, 1, 1],
    [1, 0, 1, 0, 1],
    [1, 0, 1, 1, 1],
    [1, 1, 1, 0, 1],
    [0, 0, 0, 0, 1],
  ])
);
