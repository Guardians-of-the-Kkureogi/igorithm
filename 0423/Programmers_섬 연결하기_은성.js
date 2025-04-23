/**
 * 크루스칼 알고리즘으로 풀기
 * 50%만 정답인데 왜 인지 모르겠다..
 */

function solution(n, costs) {
  var answer = 0;
  let count = 0;

  // 유니온파인드를 위한 엣지 만들어주기
  let edges = [];
  for (let i = 0; i < n; i++) {
    edges.push(i);
  }

  // 최소비용 순서로 정렬
  costs.sort((a, b) => {
    return a[2] - b[2];
  });

  // 부모노드 찾는 함수
  const unionFind = node => {
    let findNode = node;
    let parentNode = edges[node];

    while (findNode !== parentNode) {
      findNode = parentNode;
      parentNode = edges[findNode];
    }
    return parentNode;
  };

  // 모든 노드가 연결될 때 까지 반복
  costs.forEach(cost => {
    let node = cost[0];
    let targetNode = cost[1];
    let connectCost = cost[2];

    if (unionFind(node) !== unionFind(targetNode)) {
      count += 1;
      answer += connectCost;
      edges[targetNode] = node;
    }

    if (count === n - 1) return;
  });

  return answer;
}