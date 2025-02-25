// 무지성 풀이 실패
// DFS 풀이 실패
// BFS로 겨우 성공.. 공부하자..

// BFS 방식
function solution(boards) {
  var answer = Infinity;
  let boardArray = [];
  const dx = [0, 0, -1, 1];
  const dy = [-1, 1, 0, 0];
  const endX = boards[0].length;
  const endY = boards.length;
  let startX = 0;
  let startY = 0;
  let queue = [];
  let visited = Array.from(Array(endY), () => Array(endX).fill(false));

  boards.forEach((board, idx) => {
    if (board.indexOf("R") !== -1) {
      startX = board.indexOf("R");
      startY = idx;
    }
    boardArray.push(board.split(""));
  });

  // 초기값 넣기
  queue.push([startY, startX, 0]);

  while (queue.length > 0) {
    const queueShift = queue.shift();
    let nowY = queueShift[0];
    let nowX = queueShift[1];
    let nowCount = queueShift[2];
    // 방문처리
    visited[nowY][nowX] = true;

    // 도착지점 도착 시 최솟값 비교
    if (boardArray[nowY][nowX] == "G") {
      answer = nowCount < answer ? nowCount : answer;
      continue;
    }

    for (let i = 0; i < 4; i++) {
      // 제자리로 복귀
      nowY = queueShift[0];
      nowX = queueShift[1];
      nowCount = queueShift[2];
      while (true) {
        nowY += dy[i];
        nowX += dx[i];
        if (
          nowY == -1 ||
          nowX == -1 ||
          nowY == endY ||
          nowX == endX ||
          boardArray[nowY][nowX] == "D"
        ) {
          // 이전자리로 복귀
          nowY -= dy[i];
          nowX -= dx[i];
          if (!visited[nowY][nowX]) {
            queue.push([nowY, nowX, nowCount + 1]);
          }
          break;
        }
      }
    }
  }
  console.log(answer);
  return answer == Infinity ? -1 : answer;
}

// solution(["...D..R", ".D.G...", "....D.D", "D....D.", "..D...."]);
solution(["D.R", "...", "G.."]);
// DFS 방식 실패..
// function solution(boards) {
//   var answer = 999999;
//   let boardArray = [];
//   const dx = [0, 0, -1, 1];
//   const dy = [-1, 1, 0, 0];
//   const endX = boards[0].length;
//   const endY = boards.length;
//   let startX = 0;
//   let startY = 0;

//   const visited = Array.from(Array(5), () => Array(7).fill(false));
//   //   let visited = Array(5).fill(Array(7).fill(false)); // 방문처리

//   boards.forEach((board, idx) => {
//     if (board.indexOf("R") !== -1) {
//       startX = board.indexOf("R");
//       startY = idx;
//     }
//     boardArray.push(board.split(""));
//   });

//   const dfs = (startY, startX, visited) => {
//     const stack = [];
//     stack.push([startY, startX, 0]);

//     while (stack.length) {
//       let YX = stack.pop();
//       let nowY = YX[0];
//       let nowX = YX[1];
//       let count = YX[2];

//       if (boardArray[nowY][nowX] == "G") {
//         if (count < answer) {
//           answer = count;
//           continue;
//         }
//       }
//       // 방문한 곳이 아니면
//       if (!visited[nowY][nowX]) {
//         visited[nowY][nowX] = true; // 방문처리
//         //상하좌우
//         for (let i = 0; i < 4; i++) {
//           nowY = YX[0];
//           nowX = YX[1];
//           count = YX[2];

//           while (true) {
//             let nextY = nowY + dy[i];
//             let nextX = nowX + dx[i];

//             if (
//               nextY == -1 ||
//               nextX == -1 ||
//               nextY == endY ||
//               nextX == endX ||
//               boardArray[nextY][nextX] == "D"
//             ) {
//               if ((nowY != YX[0] && nowX != YX[1]) || !visited[nowY][nowX]) {
//                 stack.push([nowY, nowX, (count + 1)]);
//               }
//               break;
//             } else {
//               nowY = nextY;
//               nowX = nextX;
//               continue;
//             }
//           }
//         }
//       }
//     }
//   };

//   dfs(startY, startX, visited);
//   console.log(answer);
//   return answer;
// }
// solution(["D.R", "...", "G.."]);

// 무지성 방식 실패..
// function solution(boards) {
//   var answer = 999999;
//   let boardArray = [];
//   const dx = [0, 0, -1, 1];
//   const dy = [-1, 1, 0, 0];
//   const endX = boards[0].length;
//   const endY = boards.length;
//   startX = 0;
//   startY = 0;
//   boards.forEach((board, idx) => {
//     if (board.indexOf("R") !== -1) {
//       startX = board.indexOf("R");
//       startY = idx;
//     }
//     boardArray.push(board.split(""));
//   });
//   const bfs = (preI, nowX, nowY, count) => {
//     // 종료조건
//     if (boardArray[nowY][nowX] == "G") {
//       console.log("정답 :", nowY, nowX);
//       if (count < answer) {
//         answer = count;
//         return;
//       }
//     }
//     let preX = nowX;
//     let preY = nowY;
//     console.log(
//       "preI =",
//       preI,
//       " nowX =",
//       nowX,
//       " nowY =",
//       nowY,
//       " count =",
//       count
//     );
//     // 상하좌우 체크
//     for (let i = 0; i < 4; i++) {
//       nowX = preX;
//       nowY = preY;
//       // 이전에 왔던 방향이면 패스
//       if (preI == 0 && (i == 0 || i == 1)) continue;
//       if (preI == 1 && (i == 1 || i == 0)) continue;
//       if (preI == 2 && (i == 2 || i == 3)) continue;
//       if (preI == 3 && (i == 3 || i == 2)) continue;
//       console.log("For === preI =", preI, " i =", i, nowY, nowX);
//       let whileCount = 0;
//       while (count < 5) {
//         let nextX = nowX + dx[i];
//         let nextY = nowY + dy[i];
//         console.log(
//           "nextY =",
//           nextY,
//           " nextX=",
//           nextX,
//           " whileCount = ",
//           whileCount
//         );
//         if (
//           whileCount == 0 &&
//           (nextX == -1 ||
//             nextY == -1 ||
//             nextX == endX ||
//             nextY == endY ||
//             boardArray[nextY][nextX] == ("D" || "X"))
//         ) {
//           break;
//         } else if (
//           whileCount > 0 &&
//           (nextX == -1 ||
//             nextY == -1 ||
//             nextX == endX ||
//             nextY == endY ||
//             boardArray[nextY][nextX] == ("D" || "X"))
//         ) {
//           console.log("들옴 : ", nowY, nowX);
//           bfs(i, nowX, nowY, (count += 1));
//           break;
//         } else {
//           nowX = nextX;
//           nowY = nextY;
//         }
//         whileCount += 1;
//       }
//     }
//     boardArray[nowY][nowX] = "X";
//     console.log(boardArray);
//   };
//   bfs(-1, startX, startY, 0);
//   console.log(answer);
//   return answer;
// };
