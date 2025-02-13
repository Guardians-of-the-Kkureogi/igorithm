function solution(park, routes) {
  // 시작 위치 찾기
  let pos = findStart(park);

  // 각 명령어 실행
  routes.forEach((route) => {
    const [direction, distance] = route.split(" ");
    const newPos = canMove(park, pos, direction, parseInt(distance));
    if (newPos) pos = newPos;
  });

  return pos;
}

function findStart(park) {
  for (let i = 0; i < park.length; i++) {
    for (let j = 0; j < park[0].length; j++) {
      if (park[i][j] === "S") return [i, j];
    }
  }
}

function canMove(park, pos, direction, distance) {
  const directions = {
    N: [-1, 0],
    S: [1, 0],
    W: [0, -1],
    E: [0, 1],
  };

  const [dy, dx] = directions[direction];
  const [currentY, currentX] = pos;
  let newY = currentY;
  let newX = currentX;

  // 한 칸씩 이동하면서 확인
  for (let i = 0; i < distance; i++) {
    newY += dy;
    newX += dx;

    // 공원을 벗어나는 경우
    if (newY < 0 || newY >= park.length || newX < 0 || newX >= park[0].length) {
      return null;
    }

    // 장애물을 만나는 경우
    if (park[newY][newX] === "X") {
      return null;
    }
  }

  return [newY, newX];
}
