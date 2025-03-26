function solution(book_time) {
  let answer = []; // 퇴실시간+10분 저장

  // 시간을 분으로 변환하는 함수
  const getMinute = (time) => {
    const [h, m] = time.split(":");
    return Number(h) * 60 + Number(m);
  };

  // [입실 시간, 퇴실 시간+10분] 형태로 변환
  const times = book_time.map(([x, y]) => [getMinute(x), getMinute(y) + 10]);

  // 입실 시간순으로 정렬, 입실시간이 같으면 퇴실시간 비교
  times.sort((a, b) => (a[0] === b[0] ? a[1] - b[1] : a[0] - b[0]));

  // 예약시간을 순회하며 각 방의 퇴실시간 업데이트
  times.forEach(([start, end]) => {
    // 각 방 퇴실시간 오름차순으로 정렬
    answer.sort((a, b) => a - b);

    // 방이 존재하고, 재사용이 가능한 경우
    if (answer.length > 0 && answer[0] <= start) {
      answer.shift(); // 가장 빨리 퇴실한 방 재사용
    }
    // 방 퇴실시간 업데이트
    answer.push(end);
  });

  return answer.length;
}
