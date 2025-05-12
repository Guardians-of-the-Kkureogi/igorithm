/**
 * 1. land의 n x m 를 순회하며 방문하지 않은 석유 덩어리 찾기
 * 2. BFS를 통해 하나의 덩어리 크기를 구하기
 *  2-1. 탐색 중인 석유 덩어리가 걸쳐 있는 y 위치르 visited 배열에 저장하기
 *  2-2. BFS while문이 종료되면 amount 덩어리 크기를 방문한 y 인덱스에 더하기
 * 3. arr 배열중 가장 큰 값 반환하기
 */

const Dir = [
  [0, 1],
  [0, -1],
  [1, 0],
  [-1, 0],
];

function solution(land) {
  const n = land.length;
  const m = land[0].length;
  const arr = new Array(m).fill(0);

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      if (land[i][j] === 1) {
        const q = [[i, j, 1]];
        let amount = 1;
        const visited = new Array(m).fill(false);
        visited[j] = true;
        land[i][j] = 0;

        while (q.length) {
          const [x, y, z] = q.shift();

          Dir.forEach(([a, b]) => {
            const nx = a + x;
            const ny = b + y;
            if (0 <= nx && nx < n && 0 <= ny && ny < m && land[nx][ny]) {
              q.push([nx, ny, z + 1]);
              land[nx][ny] = 0;
              amount++;
              visited[ny] = true;
            }
          });
        }

        visited.forEach((x, index) => {
          if (x) {
            arr[index] += amount;
          }
        });
      }
    }
  }

  arr.sort((a, b) => b - a);
  return arr[0];
}
