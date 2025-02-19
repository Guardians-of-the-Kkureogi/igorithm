/**
 * 프로그래머스 - 충돌 위험 찾기
 *
 * [문제 설명]
 * - 2차원 평면상에서 여러 로봇들이 정해진 경로를 따라 이동
 * - 각 로봇은 1초에 한 칸씩 이동
 * - 두 대 이상의 로봇이 같은 위치에 있을 때 충돌 위험 발생
 *
 * [입력]
 * - points: 좌표점들의 배열 [[x1,y1], [x2,y2], ...]
 * - routes: 각 로봇의 이동 경로를 나타내는 배열 [[1,2,3], [2,3], ...] (숫자는 points의 인덱스+1)
 *
 * [해결 방법]
 * 1. 각 로봇의 전체 이동 경로를 계산
 *    - 시작점부터 끝점까지 모든 중간 경로를 포함
 *    - getPath 함수를 사용하여 두 점 사이의 모든 좌표를 구함
 *
 * 2. 시간대별로 로봇들의 위치를 확인
 *    - Map을 사용하여 각 위치에 있는 로봇의 수를 카운트
 *    - 같은 위치에 2대 이상의 로봇이 있으면 위험 상황으로 판단
 *
 * [시간 복잡도]
 * - O(R * P * T), R: 로봇의 수, P: 경로의 최대 길이, T: 전체 시간
 *
 * @param {number[][]} points - 좌표점들의 배열
 * @param {number[][]} routes - 로봇들의 이동 경로
 * @returns {number} 충돌 위험이 발생하는 횟수
 */
function solution(points, routes) {
  let dangerCount = 0;
  const robotPaths = [];

  // 각 로봇의 전체 경로를 계산
  for (const route of routes) {
    const path = [];
    // 시작 위치 추가
    path.push([...points[route[0] - 1]]);
    for (let i = 0; i < route.length - 1; i++) {
      const start = points[route[i] - 1];
      const end = points[route[i + 1] - 1];
      path.push(...getPath(start, end));
    }
    robotPaths.push(path);
  }

  // 가장 긴 경로 길이 찾기
  const maxPathLength = Math.max(...robotPaths.map((path) => path.length));

  // 각 시간대별로 로봇들의 위치를 확인
  for (let time = 0; time < maxPathLength; time++) {
    const positions = new Map();

    // 각 로봇의 현재 위치 기록
    for (let robotId = 0; robotId < robotPaths.length; robotId++) {
      if (time < robotPaths[robotId].length) {
        const pos = robotPaths[robotId][time];
        const key = `${pos[0]},${pos[1]}`;
        if (!positions.has(key)) {
          positions.set(key, 1);
        } else {
          positions.set(key, positions.get(key) + 1);
        }
      }
    }

    // 위험 상황 카운트
    for (const count of positions.values()) {
      if (count >= 2) dangerCount++;
    }
  }

  return dangerCount;
}

// 두 점 사이의 경로를 반환하는 함수
function getPath(start, end) {
  const path = [];
  let current = [...start];

  while (current[0] !== end[0] || current[1] !== end[1]) {
    if (current[0] < end[0]) {
      current[0]++;
    } else if (current[0] > end[0]) {
      current[0]--;
    } else if (current[1] < end[1]) {
      current[1]++;
    } else if (current[1] > end[1]) {
      current[1]--;
    }
    path.push([...current]);
  }

  return path;
}
