/**
 * BFS로 풀었다가 시간초과가 나길래 답을 봄..
 * 생각을 해보니 DFS로 푸는게 제일 빠른 길을 찾을 수 있겠다 이해함.
 *
 * DFS로 풀어도 도저히 모르겠다.. 탈출 조건을 찾아야하는데
 */

function solution(n, m, x, y, r, c, k) {
  var answer = "";
  const dr = [1, 0, 0, -1]; // d, l, r, u
  const dc = [0, -1, 1, 0];
  const dirChar = ["d", "l", "r", "u"];

  /* 절대 안되는 경우의 수
    - 도착지와 출발지 거리 % 2가 k % 2 와 같아야 함
    - 다르면 impossible
  */

  const dir = Math.abs(x - r) + Math.abs(y - c);
  if (dir > k || (Math.abs(x - r) + Math.abs(y - c)) % 2 !== k % 2)
    return "impossible";

  // -- BFS 풀이 --
  //   const queue = [[x, y, ""]];

  //   while (queue.length > 0) {
  //     const [nr, nc, str] = queue.shift();

  //     // 성공여부 확인
  //     if (str.length === k) {
  //       if (nr == r && nc == c) return str;
  //       continue;
  //     }

  //     for (let i = 0; i < 4; i++) {
  //       if (
  //         nr + dr[i] > 0 &&
  //         nr + dr[i] < n + 1 &&
  //         nc + dc[i] > 0 &&
  //         nc + dc[i] < m + 1
  //       ) {
  //         queue.push([nr + dr[i], nc + dc[i], str + dirChar[i]]);
  //       }
  //     }
  //   }

  let isFound = false;
  dfs(x, y, "");

  function dfs(nr, nc, str) {
    if (isFound) return;
    // 성공여부 확인
    console.log(nr, nc, str);
    if (str.length === k) {
      if (nr == r && nc == c) {
        isFound = true;
        answer = str;
        return;
      }
      return;
    }

    for (let i = 0; i < 4; i++) {
      if (
        nr + dr[i] > 0 &&
        nr + dr[i] < n + 1 &&
        nc + dc[i] > 0 &&
        nc + dc[i] < m + 1
      ) {
        dfs(nr + dr[i], nc + dc[i], str + dirChar[i]);
      }
    }
  }
  return answer;
}

console.log(solution(2, 2, 1, 1, 2, 2, 2));
