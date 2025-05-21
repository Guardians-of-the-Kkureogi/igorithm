function solution(routes) {
  let answer = 0;

  // 각 경로를 정규화 (진입 지점이 진출 지점보다 큰 경우 처리)
  routes = routes.map((route) => {
    return route[0] > route[1] ? [route[1], route[0]] : route;
  });

  routes.sort((a, b) => a[1] - b[1]); // 진출 지점 기준으로 정렬

  let camera = -30001; // 초기 카메라 위치를 최소값으로 설정

  for (let i = 0; i < routes.length; i++) {
    if (camera < routes[i][0]) {
      // 현재 카메라가 다음 차량의 진입 지점보다 앞에 있으면
      camera = routes[i][1]; // 해당 차량의 진출 지점에 카메라 설치
      answer++;
    }
  }

  return answer;
}
