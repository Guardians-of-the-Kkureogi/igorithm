import java.util.*;

class Solution {
    public int solution(String s) {
        int answer = 0;
    
        for (int i = 0; i < s.length(); i++) {
            
            Stack<Character> stack = new Stack<>();
            
            for (int j = 0; j < s.length(); j++) {
                // 1. 문자열 시작이 여는 괄호일 경우
                if (s.charAt(j) == '(' || s.charAt(j) == '{' || s.charAt(j) == '[') {
                    stack.push(s.charAt(j));
                } else { // 2. 여는 괄호가 아닐 경우
                    
                    // 2-1. stack이 비어있으면 담기
                    if (stack.isEmpty()) {
                        stack.push(s.charAt(j));
                    }
                    
                    // 2-2. stack에 여는 괄호가 있고 문자열이 닫는 괄호일경우 pop
                    if (stack.peek() == '(' && s.charAt(j) == ')') {
                        stack.pop();
                    } else if (stack.peek() == '[' && s.charAt(j) == ']') {
                        stack.pop();
                    } else if (stack.peek() == '{' && s.charAt(j) == '}') {
                        stack.pop();
                    } else { // 괄호 짝이 없다면 push
                        stack.push(s.charAt(j));
                    }
                }
            }
            
            // 3. 비어 있다면 올바른 괄호 문자열이므로 카운트
            if (stack.isEmpty()) {
                answer++;
            }
            
            // 4. 문자열 회전
            s = s.substring(1) + s.charAt(0); 
        
        }
        
        return answer;
    }
}