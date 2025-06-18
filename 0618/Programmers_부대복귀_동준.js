function solution(n, roads, sources, destination) {
  const answer = [];
  const arr = Array.from({ length: n + 1 }, () => []);
  // 반대로 가자

  // 우선 연결
  for (let i = 0; i < roads.length; i++) {
    const [a, b] = roads[i];
    arr[a].push(b);
    arr[b].push(a);
  }

  // 시작지점을 destination으로, 연결된 곳만 찾고, 나머지 -1 처리
  const visit = Array(n + 1).fill(-1);
  visit[destination] = 0;
  const q = [];
  q.push(destination);

  while (q.length > 0) {
    const now = q.shift();
    for (let k = 0; k < arr[now].length; k++) {
      const nx = arr[now][k];
      if (visit[nx] === -1) {
        visit[nx] = visit[now] + 1;
        q.push(nx);
      }
    }
  }

  for (let j = 0; j < sources.length; j++) {
    answer.push(visit[sources[j]]);
  }

  return answer;
}
