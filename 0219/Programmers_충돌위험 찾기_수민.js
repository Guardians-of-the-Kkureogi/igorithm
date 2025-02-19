/**
 * 기본 테스트 케이스 3개는 맞음
 * 근데 문제를 잘 못 해석했다... a -> b 단순 1번의 이동만 계산함 ㅋ
 * a->b->c->d 경우 고려못함
 *
 * 문제 해결 방식
 * - queue배열에 현재좌표, 도착좌표 저장해서 현재 움직이는 로봇수가 존재하면 while문 로직 반복
 *    - 현재 queue에 들어있는 각 요소의 현재 위치좌표를 계산하여 충돌되는(동일좌표) 수를 계산해서 answer에 더하기
 *    - 현재좌표와 도착좌표가 동일하면 로봇수 -1
 *    - 동일하지 않으면 다음 위치 계산 후 queue에 넣기
 *
 * 다시 풀어본다면,,,
 * - 현재 좌표와 도착좌표(첫번째)가 동일하면 그다음 도착좌표(두번째)로 수정후 queue 에 넣을듯
 */

function move(posX, posY) {
  let nextR = posX[0];
  let nextC = posX[1];
  if (posX[0] !== posY[0]) {
    if (posX[0] < posY[0]) {
      return [nextR + 1, nextC];
    } else {
      return [nextR - 1, nextC];
    }
  } else {
    if (posX[1] < posY[1]) {
      return [nextR, nextC + 1];
    } else {
      return [nextR, nextC - 1];
    }
  }
}

function checkCrush(arr) {
  const map = {};
  arr.forEach((a) => {
    if (map[a]) {
      map[a] += 1;
    } else {
      map[a] = 1;
    }
  });
  return Object.values(map).filter((value) => value > 1).length;
}

function solution(points, routes) {
  let answer = 0;
  let robot = routes.length;

  const queue = routes.map(([a, b]) => {
    return [points[a - 1], points[b - 1]];
  });

  while (robot > 0) {
    let nextRobot = robot;
    answer += checkCrush(queue.map(([a, _]) => String(a)));
    for (let i = 0; i < robot; i++) {
      const result = queue.shift();
      const posX = result[0];
      const posY = result[1];
      if (posX[0] === posY[0] && posX[1] === posY[1]) {
        nextRobot -= 1;
      } else {
        queue.push([move(posX, posY), posY]);
      }
    }
    robot = nextRobot;
  }

  return answer;
}
