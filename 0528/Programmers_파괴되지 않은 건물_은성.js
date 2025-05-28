/**
 * 이중 반복문으로 풀면 되는데, 그러면 효율성 케이스를 안냈겠지..
 * skills를 어떻게 한번에 묶은다음에 board에 한번에 계산하면 될 것 같았는데
 * 그 방법을 도저히 모르겠어서 정답을 보고 풀이함.. 누적합 처음봤다..
 */

function solution_누적합(board, skills) {
  var answer = 0;
  const row = board.length;
  const col = board[0].length;

  // 변화량을 기록할 배열
  let diff = Array.from(new Array(row + 1), () => new Array(col + 1).fill(0));

  // 변화량 기록
  skills.forEach((skill)=>{
    let [type, r1, c1, r2, c2, degree] = skill
    const data = type === 1 ? -degree : degree;
    diff[r1][c1] += data;
    diff[r1][c2 + 1] -= data;
    diff[r2 + 1][c1] -= data;
    diff[r2 + 1][c2 + 1] += data;
  })

  // 행 방향 누적합
  for (let r = 0; r < row + 1; r++) {
    for (let c = 1; c < col + 1; c++) {
      diff[r][c] += diff[r][c - 1];
    }
  }

  // 열 방향 누적합
  for (let c = 0; c < col + 1; c++) {
    for (let r = 1; r < row + 1; r++) {
      diff[r][c] += diff[r - 1][c];
    }
  }

  // 4. 최종 board 계산 + 양수 개수 세기
  for (let r = 0; r < row; r++) {
    for (let c = 0; c < col; c++) {
      board[r][c] += diff[r][c];
      if (board[r][c] > 0) answer++;
    }
  }

  return answer;
}

function solution_실패(board, skills) {
    var answer = 0;
  
    skills.forEach((skill) => {
      const type = skill[0];
      const r1 = skill[1];
      const c1 = skill[2];
      const r2 = skill[3];
      const c2 = skill[4];
      const degree = skill[5];
  
      if (type === 1) {
        for (let r = r1; r <= r2; r++) {
          for (let c = c1; c <= c2; c++) {
            board[r][c] -= degree;
          }
        }
      } else if (type === 2) {
        for (let r = r1; r <= r2; r++) {
          for (let c = c1; c <= c2; c++) {
            board[r][c] += degree;
          }
        }
      }
    });
  
    for (let r = 0; r < board.length; r++) {
      for (let c = 0; c < board[0].length; c++) {
        if (board[r][c] > 0) answer++;
      }
    }
    return answer;
  }
  