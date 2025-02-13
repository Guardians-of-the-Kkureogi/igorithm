function solution(k, tangerine) {
  // 크기별 귤 개수를 저장할 객체
  const sizeCount = {};

  // 크기별 귤 개수 세기
  tangerine.forEach((size) => {
    sizeCount[size] = (sizeCount[size] || 0) + 1;
  });

  // 개수가 많은 순으로 정렬
  const counts = Object.values(sizeCount).sort((a, b) => b - a);

  let sum = 0;
  let types = 0;

  // k개가 될 때까지 개수가 많은 귤부터 선택
  for (const count of counts) {
    sum += count;
    types++;
    if (sum >= k) break;
  }

  return types;
}
