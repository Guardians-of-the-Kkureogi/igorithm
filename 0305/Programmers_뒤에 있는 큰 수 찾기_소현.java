/* 시간 초과 난 코드 */
class Point {
    int index, value;
    
    Point (int index, int value) {
        this.index = index;
        this.value = value;
    }
}

class Solution {
    public int[] solution(int[] numbers) {
        int[] answer = new int[numbers.length];
        
        Stack<Point> stack = new Stack<>();
                
        for (int i = 0; i < numbers.length; i++) {
            stack.push(new Point(i, numbers[i])); 
        }

        while (!stack.isEmpty()) {
            Point p = stack.pop();
            
            int temp = 0; // 자신보다 큰 숫자 저장 변수
            for (int i = p.index + 1; i < numbers.length; i++) {
				// 자신보다 뒤에 있는 숫자가 클 경우
                if (p.value < numbers[i]) {
                    temp = numbers[i];
                    break;
                }
            }
			// 자신보다 큰 숫자가 없을 경우
            if(temp == 0) {
                temp = -1;
            }
			
            answer[p.index] = temp;
        }

        return answer;
    }
}

/* 정답 코드 */
import java.util.*;

class Point {
    int index, value;
    
    Point (int index, int value) {
        this.index = index;
        this.value = value;
    }
}

class Solution {
    public int[] solution(int[] numbers) {
        int[] answer = new int[numbers.length];
        Stack<Point> stack = new Stack<>();
        
        Arrays.fill(answer, -1);

        for (int i = 0; i < numbers.length; i++) {
            
            while (!stack.isEmpty()) {
                Point p = stack.pop();

                if (p.value < numbers[i]) { // 자신보다 뒤에 있는 숫자가 클 경우
                    answer[p.index] = numbers[i];
                } else { // 자신보다 뒤에 있는 숫자가 작거나 같을 경우 다시 stack에 넣어준다.
                    stack.push(p);
                    break;
                }
            }

            stack.push(new Point(i, numbers[i]));
        }

        return answer;
    }
}