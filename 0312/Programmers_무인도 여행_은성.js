/**
 * BFS 문제. 잘 풀고 마지막에 정렬기준을 숫자로 안하고 array.sort()로 처리해서 틀림..
 * array.sort((a,b)=>a-b) 로 했어야 함
 */

function solution(maps) {
    var answer = [];
    let X = maps[0].length;
    let Y = maps.length;
    let mapsArray = Array.from(Array(Y), () => Array(X).fill("X"));
    let islandList = [];
    let queue = [];
    let dx = [0, 0, -1, 1];
    let dy = [-1, 1, 0, 0];
  
    maps.forEach((map, i) => {
      let mapArray = Array.from(map);
      mapArray.forEach((mapA, j) => {
        if (mapA != "X") {
          islandList.push([i, j]);
        }
        mapsArray[i][j] = mapA;
      });
    });
    while (islandList.length > 0) {
      if (mapsArray[islandList[0][0]][islandList[0][1]] == "X") {
        islandList.shift();
        continue;
      }
      let qAnswer = Number(mapsArray[islandList[0][0]][islandList[0][1]]);
      queue.push(islandList.shift());
      mapsArray[queue[0][0]][queue[0][1]] = "X"; // 초기 방문처리
  
      while (queue.length > 0) {
        let now = queue.shift();
        let nowX = now[0];
        let nowY = now[1];
        for (let i = 0; i < 4; i++) {
          let nextX = nowX + dx[i];
          let nextY = nowY + dy[i];
          if (
            nextX > -1 &&
            nextX < Y &&
            nextY > -1 &&
            nextY < X &&
            mapsArray[nextX][nextY] != "X"
          ) {
            queue.push([nextX, nextY]);
            qAnswer = qAnswer + Number(mapsArray[nextX][nextY]);
            mapsArray[nextX][nextY] = "X"; // 방문처리
          }
        }
      }
      answer.push(qAnswer);
    }
    if (answer.length == 0) answer.push(-1);
    answer.sort((a, b) => a - b);
    return answer;
  }
  
  solution(["X591X","X1X5X","X231X", "1XXX1"]);