function solution(n, m, x, y, r, c, k) {
  // 초기 검사: 목적지까지의 최소 거리가 k보다 크면 불가능
  const minDist = Math.abs(x - r) + Math.abs(y - c);
  if (minDist > k || (k - minDist) % 2 !== 0) return "impossible";

  // 사전순으로 정렬된 방향 (d, l, r, u)
  const directions = [
    [1, 0, "d"], // 아래
    [0, -1, "l"], // 왼쪽
    [0, 1, "r"], // 오른쪽
    [-1, 0, "u"], // 위
  ];

  let result = null;

  function dfs(sx, sy, path, remaining) {
    // 이미 답을 찾았으면 종료 (사전순으로 가장 빠른 답)
    if (result !== null) return;

    // 목적지 도달 시
    if (sx === r && sy === c && remaining === 0) {
      result = path;
      return;
    }

    // 남은 거리가 남은 이동 횟수보다 크면 불가능
    const remainDist = Math.abs(sx - r) + Math.abs(sy - c);
    if (remainDist > remaining) return;

    // 남은 이동 횟수와 남은 거리의 차이가 홀수면 불가능
    if ((remaining - remainDist) % 2 !== 0) return;

    // 사전순으로 방향 탐색
    for (const [dx, dy, dir] of directions) {
      const nx = sx + dx;
      const ny = sy + dy;

      // 경계 체크
      if (nx <= 0 || nx > n || ny <= 0 || ny > m) continue;
      if (remaining <= 0) continue;

      dfs(nx, ny, path + dir, remaining - 1);
    }
  }

  dfs(x, y, "", k);
  return result || "impossible";
}
