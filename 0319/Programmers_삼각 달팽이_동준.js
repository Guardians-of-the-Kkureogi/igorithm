const DIRECTIONS = [
  [1, 0], // 아래
  [0, 1], // 오른쪽
  [-1, -1], // 왼쪽 위
];

function isValidPosition(x, y, n, visit) {
  return x >= 0 && x < n && y >= 0 && y < x + 1 && visit[x][y] === 0;
}

function solution(n) {
  const triangle = Array.from({ length: n }, (_, i) =>
    new Array(i + 1).fill(0)
  );
  let currentPosition = { x: 0, y: 0 };
  let currentNumber = 1;
  let directionIndex = 0;

  triangle[currentPosition.x][currentPosition.y] = currentNumber;

  while (true) {
    const nextX = currentPosition.x + DIRECTIONS[directionIndex][0];
    const nextY = currentPosition.y + DIRECTIONS[directionIndex][1];

    if (!isValidPosition(nextX, nextY, n, triangle)) {
      directionIndex = (directionIndex + 1) % 3;
      const nextPossibleX = currentPosition.x + DIRECTIONS[directionIndex][0];
      const nextPossibleY = currentPosition.y + DIRECTIONS[directionIndex][1];

      if (!isValidPosition(nextPossibleX, nextPossibleY, n, triangle)) {
        break;
      }
    }

    currentPosition.x += DIRECTIONS[directionIndex][0];
    currentPosition.y += DIRECTIONS[directionIndex][1];
    triangle[currentPosition.x][currentPosition.y] = ++currentNumber;
  }

  return triangle.flat();
}
