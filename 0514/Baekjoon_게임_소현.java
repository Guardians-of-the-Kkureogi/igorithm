import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.StringTokenizer;

/* bog 1072번 게임 */
public class boj_1072 {

    static long X, Y;
    static double Z;
     public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        StringTokenizer st = new StringTokenizer(br.readLine());

        X = Integer.parseInt(st.nextToken()); // 게임 횟수
        Y = Integer.parseInt(st.nextToken()); // 이긴 게임

        Z = (Y * 100) / X; // 승률

        long result = -1; // 승률이 변하지 않을 때 -1이므로 초기값을 -1
        long start = 1;
        long end = 1_000_000_000;
        
        while (start <= end) {
            long mid = (start + end) / 2; // 중간값

            long temp = (Y + mid) * 100 / (X + mid); // 현재까지 승률 구하기
            
            if (temp != Z) { // 승률에 변화가 있을 때
                result = mid; // mid 값을 넣고
                end = mid - 1; // end에 -1
            } else { // 승률에 변화가 없을 때
                start = mid + 1; // start에 + 1
            }
        }

        System.out.println(result);

     }
}