/**
 *
 * [a,b,c] a<->b c 비용
 * 최소 신장 트리 알고리즘 -> 크루스칼, 프림 중 프림 알고리즘으로 해결해봄
 *
 * 0부터 시작해서 해당 노드와 연결된 간선 중 가장 작은 비용 선택
 * 방문하지 않은 노드라면 비용추가, 방문처리, 큐 간선 추가
 * 모든 노드 방문할때까지 반복해서 작은 비용을 구함
 *
 */

function solution(n, costs) {
  const graph = Array.from({ length: n }, () => []);
  const visited = Array(n).fill(false);
  const queue = [[0, 0]]; // [노드, 비용]
  let answer = 0;

  // 이동 가능한 노드 연결
  costs.forEach(([a, b, c]) => {
    console.log(a, b, c);
    graph[a].push([b, c]);
    graph[b].push([a, c]);
  });

  while (queue.length) {
    queue.sort((a, b) => a[1] - b[1]); // 비용 정렬
    const [node, cost] = queue.shift(); // 첫번째 배열값
    if (visited[node]) continue;

    visited[node] = true;
    answer += cost;

    graph[node].forEach(([nextNode, nextCost]) => {
      if (!visited[nextNode]) {
        queue.push([nextNode, nextCost]);
      }
    });
  }

  return answer;
}
