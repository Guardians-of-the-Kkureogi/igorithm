/**
 * MaxHeap을 사용해서 풀이
 * "I" 삽입 시
 * - 마지막 노드 삽입, 부모보다 크면 부모랑 변경
 * "D +1" 최대값 삭제 시
 * - 최상단 노드와 최하단 노드 변경
 * - 최하단 노드 삭제
 * - 최상단 노드 자식이랑 비교 로직 수행
 * "D -1" 최소값 삭제 시
 * - leaf 노드 중 최소값 삭제, splice() 로직 수행
 */

function solution(operations) {
  var answer = [];
  let queue = [];

  // leaf 노드 중에서 최소값 얻기
  const getMinIdx = () => {
    const minQueueList = queue.slice(Math.ceil((queue.length - 1) / 2));
    let minData = queue[0];
    let minIdx = 0;
    minQueueList.forEach((min, idx) => {
      if (min < minData) {
        minData = min;
        minIdx = idx;
      }
    });
    return Math.ceil((queue.length - 1) / 2) + minIdx;
  };
  operations.forEach((operation) => {
    let separator = operation.slice(0, 1);
    let number = Number(operation.slice(2));

    // 삽입
    const priorityMaxHeapIn = (number) => {
      let nowIdx = 0;
      let tempNodeData = 0;

      queue.push(number);
      nowIdx = queue.length - 1;

      let p_node = Math.ceil(nowIdx / 2) - 1;

      while (p_node != -1) {
        if (queue[nowIdx] > queue[p_node]) {
          tempNodeData = queue[p_node];
          queue[p_node] = queue[nowIdx];
          queue[nowIdx] = tempNodeData;

          nowIdx = p_node;
          p_node = Math.ceil(nowIdx / 2) - 1;
        } else {
          break;
        }
      }
    };

    // 최대값 삭제
    const priorityMaxHeapDel = () => {
      // 마지막 값 최상단으로 이동
      let nowIdx = 0;
      let tempNodeData = 0;
      queue[0] = queue[queue.length - 1];
      // 최대값 큐 제거
      queue.pop();

      let next_node = 1;
      // 자식노드 다 방문할 때까지 반복
      while (next_node < queue.length) {
        // 왼쪽 자식 비교
        if (queue[nowIdx] < queue[next_node]) {
          tempNodeData = queue[nowIdx];
          queue[nowIdx] = queue[next_node];
          queue[next_node] = tempNodeData;
        } // 오른쪽 자식 비교
        else if (
          next_node + 1 < queue.length &&
          queue[nowIdx] < queue[next_node + 1]
        ) {
          tempNodeData = queue[nowIdx];
          queue[nowIdx] = queue[next_node + 1];
          queue[next_node + 1] = tempNodeData;
        } else {
          return;
        }
        next_node = next_node * 2 + 1;
      }
    };

    // 최소값 삭제
    const priorityMinHeapDel = () => {
      // 큐가 하나일 때 제거
      if (queue.length == 1) {
        queue.pop();
        return;
      }
      queue.splice(getMinIdx(), 1);
    };

    switch (separator) {
      case "I":
        priorityMaxHeapIn(number);
      case "D":
        if (number == 1) {
          priorityMaxHeapDel();
        } else if (number == -1) {
          priorityMinHeapDel();
        }
    }
  });

  if (queue.length == 0) {
    answer.push(0);
    answer.push(0);
  } else {
    answer.push(queue[0]);
    answer.push(queue[getMinIdx()]);
  }
  console.log(answer);
  return answer;
}

// solution(["I 16", "I -5643"]);
solution(["I 10", "I 20", "D 1", "I 30", "I 40", "D -1", "D -1"]);
