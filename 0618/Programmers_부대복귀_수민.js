/*
    1. roads 배열을 순회하며 양방향 graph 구성
    2. 도착지점을 시작점으로 설정하고 각 지역의 최단 거리 구하기(BFS)
    3. dist[next] > 현재 cost + 1 면 dist 갱신 + queue 추가
    4. sources 순회하며 해당 지역의 최단 거리 반환, Infinity면 -1 반환
 */

function solution(n, roads, sources, destination) {
  const dist = Array(n + 1).fill(Infinity);
  const visited = Array(n + 1).fill(false);
  const graph = Array.from({ length: n + 1 }, () => []);

  roads.forEach(([a, b]) => {
    graph[a].push(b);
    graph[b].push(a);
  });

  dist[destination] = 0;
  const queue = [[destination, 0]];

  while (queue.length) {
    const [current, cost] = queue.shift();

    if (visited[current]) continue;

    visited[current] = true;

    for (let next of graph[current]) {
      if (dist[next] > cost + 1) {
        dist[next] = cost + 1;
        queue.push([next, dist[next]]);
      }
    }
  }

  return sources.map((source) =>
    dist[source] === Infinity ? -1 : dist[source]
  );
}
