class Solution {
    public String solution(String video_len, String pos, String op_start, String op_end, String[] commands) {
        String answer = "";
        
        // 1. 포맷 변경
        int videoLen = convertToSecond(video_len);
        int startTime = convertToSecond(pos);
        int openingStart = convertToSecond(op_start);
        int openingEnd = convertToSecond(op_end);
        
        // 2. 재생위치가 오프닝 구간인지 체크
        int nowPlaying = skip(startTime, openingStart, openingEnd);
        
        // 3-1. prev, next 구간 이동하여 재생 위치 체크
        for (String c : commands) {
            if (c.equals("prev")) {
                // 10초 전으로 이동했을 때, 0분 0초 미만이면 0분 0초로 이동
                int prev = nowPlaying - 10;
                nowPlaying =  prev < 0 ? 0 : prev;  
            } else {
                // 10초 후로 이동했을 때, 동영상 길이보다 크면 동영상의 길이로 이동
                int next = nowPlaying + 10;
                nowPlaying = next > videoLen ? videoLen : next;
            }
            // 3-2. 오프닝 구간인지 체크
            nowPlaying = skip(nowPlaying, openingStart, openingEnd);
        }
        
        // 4. 포맷 변경
        int minute = nowPlaying / 60;
        int second = nowPlaying % 60;
    
        answer = String.format("%02d:%02d", minute, second);
        return answer;
    }
    
    // 분 -> 초 단위로 변환
    public int convertToSecond (String v) {
        int minute = Integer.parseInt(v.split(":")[0]);
        int second = Integer.parseInt(v.split(":")[1]);
        
        return minute * 60 + second;
    }
    
    // 오프닝 건너뛰기
    public int skip (int time, int openingStart, int openingEnd) {
        if (time >= openingStart && time <= openingEnd) {
            return openingEnd;
        }
        return time;
    }
}