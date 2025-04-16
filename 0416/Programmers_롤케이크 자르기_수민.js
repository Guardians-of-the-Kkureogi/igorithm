function solution(topping) {
  let answer = 0,
    a = 0, // 오른쪽의 토핑 종류 수
    b = 0; // 왼쪽의 토핑 종류 수

  const map = new Map(); // 토핑 종류별 개수, 첫방문여부

  // 토핑리스트를 순회하며 정보 저장
  topping.forEach((item) => {
    const result = map.get(item);
    if (result) {
      result.count += 1;
    } else {
      a += 1;
      map.set(item, { count: 1, visited: false });
    }
  });

  // 한개씩 옮기며 비교
  topping.forEach((item) => {
    const result = map.get(item);

    // 처음 보는 토핑 -> 왼쪽 종류 수 증가
    if (!result.visited) {
      result.visited = true;
      b += 1;
    }
    result.count -= 1; // 오른쪽 토핑 하나 제거
    if (result.count === 0) a -= 1; // 오른쪽 해당 종류의 토핑수가 다 떨어지면 종류 수 감소
    if (a === b) answer += 1; // 양쪽의 토핑 종류 수가 같으면 answer+1
  });

  return answer;
}

console.log(solution([1, 2, 1, 3, 1, 4, 1, 2]));
