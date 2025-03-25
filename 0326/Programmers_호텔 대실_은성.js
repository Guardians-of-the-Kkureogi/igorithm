function solution(book_time) {
  const setCheckoutTime = (time) => {
    // 분이 60분이 넘어가면 1시간 더하기
    if ((time + 10) % 100 >= 60) {
      return time + 50;
    } else {
      return time + 10;
    }
  };
  let rooms = [];

  book_time.forEach((book) => {
    book[0] = Number(book[0].replace(":", ""));
    book[1] = Number(book[1].replace(":", ""));
  });

  // 시작시간으로 정렬
  book_time.sort((a, b) => {
    return a[0] - b[0];
  });
  // 초기 값 설정
  rooms.push(book_time.shift());

  book_time.forEach((book) => {
    let isPosible = false;
    for (let i = 0; i < rooms.length; i++) {
      if (setCheckoutTime(rooms[i][1]) <= book[0]) {
        // 입실 가능하면
        rooms[i] = book;
        isPosible = true;
        break;
      }
    }
    if (!isPosible) {
      rooms.push(book);
    }
  });
  return rooms.length;
}