function solution(array, commands) {
  // map : 배열의 모든 요소를 순회하고, 반환 값은 새 배열에서 단일 요소로 추가됨
  // slice : 어떤 배열의 begin부터 end까지에대한 얕은 복사본을 새로운 배열 객체로 반환
  return commands.map((command) => {
    const [i, j, k] = command;
    const newArray = array.slice(i - 1, j);
    newArray.sort((a, b) => a - b); // 오름차순 정렬
    return newArray[k - 1];
  });
}
