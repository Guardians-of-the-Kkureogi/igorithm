function solution(board, skill) {
  let answer = 0;

  // 2차원 배열 초기화 (board 크기보다 2 크게)
  const check = Array.from({ length: board.length + 2 }, () =>
    Array(board[0].length + 2).fill(0)
  );

  // 누적합을 위한 값 설정
  for (const [ty, r1, c1, r2, c2, degree] of skill) {
    let tag = 1;
    if (ty === 1) {
      // 공격
      tag *= -1;
    }
    check[r1][c1] += tag * degree;
    check[r2 + 1][c1] += tag * degree * -1;
    check[r1][c2 + 1] += tag * degree * -1;
    check[r2 + 1][c2 + 1] += tag * degree;
  }

  // 열 방향 누적합
  for (let j = 0; j < check[0].length; j++) {
    for (let i = 1; i < check.length; i++) {
      check[i][j] += check[i - 1][j];
    }
  }

  // 행 방향 누적합
  for (let i = 0; i < check.length; i++) {
    for (let j = 1; j < check[0].length; j++) {
      check[i][j] += check[i][j - 1];
    }
  }

  // 파괴되지 않은 건물 카운트
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[0].length; j++) {
      if (board[i][j] + check[i][j] > 0) {
        answer++;
      }
    }
  }

  return answer;
}
