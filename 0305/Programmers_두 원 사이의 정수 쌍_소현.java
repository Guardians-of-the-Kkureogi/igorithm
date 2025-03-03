class Solution {
    public long solution(int r1, int r2) {
        long answer = 0;
        
        // 원의 방정식(0, 0) : x^2 + y^2 = r^2 사용
        // x = 0인 y축 제외하고 계산
        for (int x = 1; x <= r2; x++) {
            long minY = (long)Math.ceil(Math.sqrt(1.0 * r1 * r1 - 1.0 * x * x)); // 작은 원은 최댓값
            long maxY = (long)Math.floor(Math.sqrt(1.0 * r2 * r2 - 1.0 * x * x)); // 큰 원은 최솟값

            answer += (maxY - minY + 1);
        }
        
        return answer * 4;
    }
}