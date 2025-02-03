class Solution {
    
    static String[] str = {"zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine"};
    static String[] numbers = {"0", "1", "2", "3", "4", "5", "6", "7", "8", "9"};
    public int solution(String s) {
        
        for(int i = 0; i < 10; i++) {
            s = s.replace(str[i], numbers[i]);
        }
        
        return Integer.parseInt(s);
    }
}