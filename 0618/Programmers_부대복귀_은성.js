/**
 * 성공 풀이
 * 정말 간단하게 destination에서 bfs를 돌리면 되는 문제였다.
 */

function solution(n, roads, sources, destination) {
  var answer = [];
  let visited = Array(n + 1).fill(-1);
  let connectRoads = Array.from({ length: n + 1 }, () => Array());
  let queue = [];
  roads.forEach((road) => {
    const [road1, road2] = road;
    connectRoads[road1].push(road2);
    connectRoads[road2].push(road1);
  });
  visited[destination] = 0;
  queue.push([destination, 0]);
  while (queue.length !== 0) {
    const [now, len] = queue.shift();
    connectRoads[now].forEach((connectRoad) => {
      if (visited[connectRoad] == -1) {
        queue.push([connectRoad, len + 1]);
        visited[connectRoad] = len + 1;
      }
    });
  }

  sources.forEach((source) => {
    answer.push(visited[source]);
  });

  return answer
}











/** 실패 풀이
 * 1. 모든 노드에서 다른 노드까지의 최단 거리 정보를 미리 구해놓기.
 * 2. 이를 위해 노드 간 거리 정보를 저장할 구조로 connectRoads 배열을 사용하고, 내부에 Map으로 연결 노드와 거리 정보를 담는다.
 * 3. connectRoad(start, destination)라는 함수를 만들어, 두 노드를 연결하며 BFS로 연결 가능한 다른 노드들을 탐색하면서 거리 정보를 갱신한다.
 * 4. 최종적으로 각 source에서 목적지까지의 거리 정보를 connectRoads[source].get(destination)을 통해 찾아서 answer에 넣는다.
 */

function failedSolution(n, roads, sources, destination) {
  var answer = [];
  let visited = Array(n + 1).fill(false);
  let queue = [];
  let connectRoads = Array.from({ length: n + 1 }, () => new Map());

  const resetArrays = () => {
    visited.fill(false);
    queue = [];
  };
  const connectRoad = (start, destination) => {
    visited[start] = true; // 자기자신 방문처리
    visited[destination] = true; // 목적지 방문처리
    queue.push([destination, 1]);
    connectRoads[start].set(destination, 1);

    while (queue.length != 0) {
      const [connectStart, connectLength] = queue.shift();
      visited[connectStart] = true;
      for (let key of connectRoads[connectStart].keys()) {
        if (!connectRoads[start].has(key) && !visited[key]) {
          queue.push([key, connectLength + 1]);
          connectRoads[start].set(key, connectLength + 1);
          // 만약 상대 node에 내 key가 없으면 같이 push
          if (!connectRoads[key].has(start)) {
            connectRoads[key].set(start, connectLength + 1);
          }
        }
      }
    }
    resetArrays();
  };
  roads.forEach((road) => {
    const [n1, n2] = road;
    connectRoad(n1, n2);
    connectRoad(n2, n1);
  });

  sources.forEach((source) => {
    source == destination
      ? answer.push(0)
      : connectRoads[source].has(destination)
      ? answer.push(connectRoads[source].get(destination))
      : answer.push(-1);
  });
  return answer;
}


solution(
    3,
    [
      [1, 2],
      [2, 3],
    ],
    [2, 3],
    1
  );
  
  solution(
    5,
    [
      [1, 2],
      [1, 4],
      [2, 4],
      [2, 5],
      [4, 5],
    ],
    [1, 3, 5],
    5
  );
  

/** Chat GPT 질문. 내가 왜 이렇게 생각을 했고, 정석적인 방법을 생각해내지 못했을까?
 * 
 
🧠 너의 사고 흐름을 추정해보면
"각 노드에서 다른 노드로 가는 최단거리만 있으면 되지 않을까?"
→ 맞는 생각이야. 다만 이 문제는 그걸 모든 쌍에 대해 구하려고 해서 무리였어

"도로 정보를 보자마자, 이걸 쌍마다 연결해 저장해두면 쉽게 조회 가능하겠네"
→ 최적화된 접근처럼 느껴질 수 있어.
→ 문제는 모든 거리 정보를 Map으로 저장하려고 했던 점에서 터졌어

"한 번만 탐색해서 모든 걸 해결할 수 있다"는 발상을 놓쳤던 이유는?
문제를 source → destination 식으로 읽었기 때문이야.
그런데 이 문제는 destination → source로 BFS를 한 번만 해도 답이 나와

🔍 왜 정석적인 방법이 떠오르지 않았을까?
이유	설명
1. 문제 구조의 착시	sources가 여러 개니까, source마다 탐색해야 할 것 같음
2. 모든 거리 저장이 더 효율적일 것처럼 보임	그래프 탐색 최적화를 할수록 성능이 좋다고 느꼈을 수 있음
3. 가중치가 없다는 점을 놓침	이 문제는 모든 도로가 거리 1인데, 이걸 인지했으면 BFS 한 번이면 끝난다는 걸 더 쉽게 떠올릴 수 있음
4. 목적지를 고정된 출발지로 보는 발상 부족	"단일 목적지를 기준으로 탐색하면?" 이라는 역발상이 없었음

🧩 그럼 다음엔 어떻게 다르게 사고하면 좋을까?
🎯 이런 질문을 던져봐
"모든 간선의 가중치가 동일한가?"
→ 그렇다면 BFS로 한 번에 해결될 수 있다

"모든 source에 대해 탐색해야 하나?"
→ 아니라면 공통으로 쓸 수 있는 역탐색이 없을까?

"내가 만든 데이터 구조는 O(N²) 메모리를 요구하진 않나?"
→ Map[N][N], 2중 배열이면 N=10만에선 절대 불가

"source 개수가 적고 destination이 1개면, 역탐색이 더 빠르지 않을까?"
→ 고정된 도착점이 있다는 건 역탐색 힌트!
 * 
 */