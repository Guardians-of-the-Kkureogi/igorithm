/**
 * dfs 활용해 숫자들의 영역합을 구함
 * 재귀적으로 방문하여 합산함
 * 방문한 좌료는 방문표시를 하고 재방문하지 않음
 * 영역값 배열을 오름차순으로 정렬하여 반환
 * 만약 빈배열이면 -1 반환
 *
 */

const Dir = [
  [0, 1],
  [0, -1],
  [1, 0],
  [-1, 0],
];

function solution(maps) {
  maps = maps.map((m) => [...m]);
  const R = maps.length;
  const C = maps[0].length;
  const visited = Array.from(Array(R), () => Array(C).fill(false));
  const answer = [];

  const dfs = (x, y) => {
    let result = Number(maps[x][y]);

    for (let i = 0; i < 4; i++) {
      const nx = x + Dir[i][0];
      const ny = y + Dir[i][1];

      if (0 <= nx && nx < R && 0 <= ny && ny < C) {
        if (maps[nx][ny] !== "X" && !visited[nx][ny]) {
          visited[nx][ny] = true;
          result += dfs(nx, ny);
        }
      }
    }
    return result;
  };

  for (let i = 0; i < R; i++) {
    for (let j = 0; j < C; j++) {
      if (maps[i][j] !== "X" && !visited[i][j]) {
        visited[i][j] = true;

        answer.push(dfs(i, j));
      }
    }
  }

  if (answer.length === 0) return [-1];
  answer.sort((a, b) => a - b);

  return answer;
}
