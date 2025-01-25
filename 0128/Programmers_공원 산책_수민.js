function solution(park, routes) {
  park = park.map((p) => [...p]); // 공원 2차원 배열
  const Dir = {
    N: [-1, 0],
    S: [1, 0],
    W: [0, -1],
    E: [0, 1],
  }; // 동서남북 객체
  const R = park.length; // 공원 행 길이
  const C = park[0].length; // 공원 열 길이
  const loc = [0, 0]; // 현재 위치 좌표

  park.forEach((row, i) =>
    row.forEach((item, j) => {
      // 시작위치 지정
      if (item === "S") {
        loc[0] = i;
        loc[1] = j;
      }
    })
  );

  routes.forEach((route) => {
    // 경로 전체 반복
    const [op, n] = route.split(" "); // 공백을 기준으로 배열 [방향, 거리]반환
    let nr = loc[0];
    let nc = loc[1];
    let isPass = true; // 현재 경로 수행 여부

    for (let i = 0; i < n; i++) {
      nr += Dir[op][0];
      nc += Dir[op][1];
      // 경로 이탈 or 장애물 -> 현재 명령 무시
      if (0 > nr || nr >= R || 0 > nc || nc >= C || park[nr][nc] === "X") {
        isPass = false;
        break;
      }
    }

    if (isPass) {
      loc[0] = nr;
      loc[1] = nc;
    }
  });

  return loc;
}
