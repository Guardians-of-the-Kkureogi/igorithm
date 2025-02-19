// string -> number 초 변환
function toNumberTime(str) {
  const [hours, minutes] = str.split(":").map(Number);
  return hours * 60 + minutes;
}
// number -> string 시간 포맷 변환
function toStringTime(num) {
  const hours = Math.floor(num / 60);
  const minutes = num % 60;
  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;
}

function solution(video_len, pos, op_start, op_end, commands) {
  // 시간 계산을 위해 모두 초 단위로 변환
  let videoLen = toNumberTime(video_len);
  let answer = toNumberTime(pos); // 현재 시간
  let opStart = toNumberTime(op_start);
  let opEnd = toNumberTime(op_end);
  // 오프닝 건너뛰기, 현재시간이 오프닝 구간이면 오프닝 끝나는 시간으로 이동
  const checkOpening = () => {
    if (opStart <= answer && answer <= opEnd) {
      answer = opEnd;
    }
  };
  // commands 확인전 오프닝 구간 체크
  checkOpening();
  // commands 전체 순회
  commands.forEach((command) => {
    if (command === "prev") {
      // prev 이면 -10초, 0보다 작으면 0초로 지정
      answer = Math.max(0, answer - 10);
    } else {
      // next 이면 +10초, 비디오시간보다 크면 비디오시간으로 지정
      answer = Math.min(videoLen, answer + 10);
    }
    // 시간 이동 후 오프닝 구간 체크
    checkOpening();
  });

  return toStringTime(answer);
}
