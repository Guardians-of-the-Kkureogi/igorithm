function solution(maps) {
  const answer = [];
  const height = maps[0].length;
  const width = maps.length;
  const visit = Array.from(Array(width), () => Array(height).fill(0));
  const dx = [0, -1, 1, 0];
  const dy = [1, 0, 0, -1];

  const bfs = (x, y) => {
    visit[x][y] = 1;
    const que = [];
    que.push([x, y]);
    let num = parseInt(maps[x][y]);
    while (que.length > 0) {
      const now = que.shift();
      console.log("실행?", now);
      for (let k = 0; k < 4; k++) {
        const nx = now[0] + dx[k];
        const ny = now[1] + dy[k];

        if (
          nx >= 0 &&
          nx < width &&
          ny >= 0 &&
          ny < height &&
          visit[nx][ny] === 0 &&
          maps[nx][ny] !== "X"
        ) {
          visit[nx][ny] = 1;
          que.push([nx, ny]);
          console.log(maps[nx][ny]);
          num += parseInt(maps[nx][ny]);
        }
      }
    }

    return num;
  };

  for (let i = 0; i < width; i++) {
    for (let j = 0; j < height; j++) {
      if (visit[i][j] === 0 && maps[i][j] !== "X") {
        answer.push(bfs(i, j));
      }
    }
  }

  return answer.length ? answer.sort((a, b) => a - b) : [-1];
}
