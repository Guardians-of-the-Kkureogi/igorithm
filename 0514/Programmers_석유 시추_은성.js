/**
 * 단순 BFS로 풀었다가 효율성에서 다 틀림.. 새로운 접근방식으로 풀이
 * 
 * 전체 land 순회
 * - 석유 매장량 배열 oilTotal 저장
 * - 석유 매장량 oilTotal 조회 Index 각 oilData 2차원 배열에 저장
 * 
 * 전체 land 재순회
 * - oilTotal 방문조회 + oilData에 index 값이 있을 때 nowTotal값에 더함.
 * 
 * nowTotal > answer 일 때 answer = nowTotal로 전환
 */

function solution(land) {
  var answer = 0;
  const row = land[0].length;
  const col = land.length;
  const dr = [0, 0, -1, 1];
  const dc = [-1, 1, 0, 0];
  let queue = [];

  const landVisited = Array(col)
    .fill(0)
    .map(() => Array(row).fill(false));

  const oilData = Array(col)
    .fill(0)
    .map(() => Array(row).fill(false));

  const oilTotal = [];

  // land 순회하면서 전체 오일 매장량 조회
  for (let r = 0; r < row; r++) {
    for (let c = 0; c < col; c++) {
      let oil = 0;
      if (land[c][r] == 1 && landVisited[c][r] == false) {
        queue.push([c, r]);
        oil += 1;
        landVisited[c][r] = true;
        oilData[c][r] = oilTotal.length;
      }
      while (queue.length > 0) {
        let [nowC, nowR] = queue.shift();
        for (let i = 0; i < 4; i++) {
          const nc = nowC + dc[i];
          const nr = nowR + dr[i];
          if (
            nc > -1 &&
            nc < col &&
            nr > -1 &&
            nr < row &&
            land[nc][nr] == 1 &&
            landVisited[nc][nr] == false
          ) {
            queue.push([nc, nr]);
            oil += 1;
            landVisited[nc][nr] = true;
            oilData[nc][nr] = oilTotal.length;
          }
        }
      }
      if (oil > 0) oilTotal.push(oil);
    }
  }
  
  // 전체 재 순회
  for (let r = 0; r < row; r++) {
    let oilVisited = Array(oilTotal.length).fill(false);
    let nowTotal = 0;
    for (let c = 0; c < col; c++) {
      let oilIndex = oilData[c][r];
      if (oilIndex !== false && oilVisited[oilIndex] === false) {
        nowTotal += oilTotal[oilIndex];
        oilVisited[oilIndex] = true;
      }
    }
    if (nowTotal > answer) answer = nowTotal;
  }

  return answer;
}