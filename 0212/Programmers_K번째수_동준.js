function solution(array, commands) {
  return commands.map(([start, end, k]) => {
    // 배열을 자르고 정렬한 후 k번째 수 반환
    return array.slice(start - 1, end).sort((a, b) => a - b)[k - 1];
  });
}
