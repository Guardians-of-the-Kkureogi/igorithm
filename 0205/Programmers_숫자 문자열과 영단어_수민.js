function solution(s) {
  const numbers = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine"];

  numbers.forEach((eng, num) => {
    // numbers 배열 순회 메서드
    s = s.replaceAll(eng, num); // 모든 eng 단어를 찾아 num 배열 인덱스로 변환
  });
  return Number(s); // 숫자 형변환
}
