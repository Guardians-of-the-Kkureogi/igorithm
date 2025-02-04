function solution(k, tangerine) {
  const map = {}; // 크기별 귤 갯수 객체, ex) {1:1, 2:1}

  tangerine.forEach((t) => {
    const value = map[t];
    // map에 이미 크기값이 있다면 +1, 없으면 1로 초기화
    if (value) {
      map[t]++;
    } else {
      map[t] = 1;
    }
  });

  const valueArr = Object.values(map); // key, value로 이루어진 객체중 value값만 모아서 배열화
  valueArr.sort((a, b) => b - a); // 내림차순으로 정렬

  for (let i = 0; i < valueArr.length; i++) {
    k -= valueArr[i]; // 귤 갯수만큼 빼기
    if (k < 1) {
      // 귤 갯수가 1보다 작으면 return
      return i + 1;
    }
  }
}
