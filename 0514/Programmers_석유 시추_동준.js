function solution(land) {
  const n = land.length;
  const m = land[0].length;
  const visited = Array(n)
    .fill()
    .map(() => Array(m).fill(false));
  const oilGroups = new Map(); // 각 석유 덩어리의 크기와 위치한 열들을 저장
  let groupId = 0;

  // BFS로 석유 덩어리 찾기
  function bfs(startRow, startCol) {
    const queue = [[startRow, startCol]];
    const columns = new Set(); // 이 덩어리가 위치한 열들
    let size = 0;

    while (queue.length > 0) {
      const [row, col] = queue.shift();

      if (visited[row][col]) continue;
      visited[row][col] = true;
      size++;
      columns.add(col);

      // 상하좌우 탐색
      const directions = [
        [-1, 0],
        [1, 0],
        [0, -1],
        [0, 1],
      ];
      for (const [dr, dc] of directions) {
        const newRow = row + dr;
        const newCol = col + dc;

        if (
          newRow >= 0 &&
          newRow < n &&
          newCol >= 0 &&
          newCol < m &&
          !visited[newRow][newCol] &&
          land[newRow][newCol] === 1
        ) {
          queue.push([newRow, newCol]);
        }
      }
    }

    return { size, columns };
  }

  // 모든 석유 덩어리 찾기
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      if (land[i][j] === 1 && !visited[i][j]) {
        const { size, columns } = bfs(i, j);
        oilGroups.set(groupId, { size, columns });
        groupId++;
      }
    }
  }

  // 각 열별로 획득할 수 있는 석유량 계산
  const columnOil = Array(m).fill(0);
  for (const { size, columns } of oilGroups.values()) {
    for (const col of columns) {
      columnOil[col] += size;
    }
  }

  // 최대 석유량 반환
  return Math.max(...columnOil);
}
