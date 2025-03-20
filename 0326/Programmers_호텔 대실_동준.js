/**
 * 호텔 대실
 * sol : 누적합
 */
function solution(book_time) {
  // 24시간(1440분) + 여유 1분 → 1441 크기면 충분
  const timeTable = new Array(1441).fill(0);

  book_time.forEach((v) => {
    let [sh, sm] = v[0].split(":").map(Number);
    let [eh, em] = v[1].split(":").map(Number);
    const start = sh * 60 + sm;
    const end = eh * 60 + em + 10; // 청소 시간 포함

    for (let i = start; i < end && i < 1441; i++) {
      // 1441을 초과하지 않도록 처리
      timeTable[i]++;
    }
  });

  return Math.max(...timeTable);
}
