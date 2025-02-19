function solution(video_len, pos, op_start, op_end, commands) {
  // 시간 변환 유틸리티
  const toSeconds = (t) => t.split(":").reduce((m, s) => m * 60 + +s);
  const toTimeString = (s) =>
    [~~(s / 60), s % 60].map((n) => `${n}`.padStart(2, "0")).join(":");

  // 초기 설정
  let time = toSeconds(pos);
  const [end, opStart, opEnd] = [video_len, op_start, op_end].map(toSeconds);

  // 명령어 처리
  for (const cmd of commands) {
    // 오프닝 구간이면 건너뛰기
    if (time >= opStart && time <= opEnd) {
      time = opEnd;
    }

    // 시간 이동 및 경계 처리
    time = Math.min(Math.max(time + (cmd === "next" ? 10 : -10), 0), end);

    // 이동 후 오프닝 구간 체크
    if (time >= opStart && time <= opEnd) time = opEnd;
  }

  return toTimeString(time);
}
