/**
 * 2차원 누적합 알고리즘 문제 (쉽지 않네!!)
 * 1. skill마다 변화량을 arr 배열에 기록
 * 2. 가로 누적합 -> 세로 누적합 변화량 계산
 * 3. arr, board 배열을 각 좌표 값을 비교해 0보다 크면 answer+1
 *
 */

function solution(board, skill) {
  let answer = 0;
  const r = board.length;
  const c = board[0].length;
  const arr = Array.from(Array(r + 1), () => Array(c + 1).fill(0));

  skill.forEach(([type, r1, c1, r2, c2, degree]) => {
    const num = type === 1 ? -degree : degree;
    arr[r1][c1] += num;
    arr[r2 + 1][c2 + 1] += num;
    arr[r2 + 1][c1] += -num;
    arr[r1][c2 + 1] += -num;
  });

  for (let i = 0; i < r + 1; i++) {
    for (let j = 1; j < c + 1; j++) {
      arr[i][j] += arr[i][j - 1];
    }
  }

  for (let i = 0; i < c + 1; i++) {
    for (let j = 1; j < r + 1; j++) {
      arr[j][i] += arr[j - 1][i];
    }
  }

  for (let i = 0; i < r; i++) {
    for (let j = 0; j < c; j++) {
      if (board[i][j] + arr[i][j] > 0) {
        answer++;
      }
    }
  }

  return answer;
}
