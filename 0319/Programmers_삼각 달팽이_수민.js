const Dir = [
  [1, 0], // 아래
  [0, 1], // 오른쪽
  [-1, -1], // 대각선 위
];

function solution(n) {
  const answer = [];
  const arr = Array.from(Array(n), () => Array(n).fill(0)); // 2차원 배열, default: 0
  let x = -1; // 행, 첫번째방향으로 내려가기 위해 -1
  let y = 0; // 열
  let z = 0; // 방향, (0:아래, 1:오른쪽, 2:대각선위)
  let num = 1; // 숫자

  // 2차원 배열에 숫자 채우기
  for (let i = n; i > 0; i--) {
    for (let j = 0; j < i; j++) {
      x += Dir[z][0];
      y += Dir[z][1];
      arr[x][y] = num;
      num++;
    }
    z = (z + 1) % 3; // 방향 전환
  }
  // 결과 배열 담기
  for (let i = 0; i < n; i++) {
    for (let j = 0; j <= i; j++) {
      answer.push(arr[i][j]);
    }
  }
  return answer;
}
