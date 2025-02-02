import java.util.*;

/*
- 처음에 곡괭이 수에 *5를 우선적으로 해서 dfs 활용하여 곡괭이 수를 곡괭이에 대한 작업양을 감소시키려고 했다.
- 테스트케이스에서는 통화했는데, 제출하니까 실패로 떠서 확인해보니 백트래킹이 필요한 문제였다,,,,
*/

// 실패 코드
class Solution {
    
    static int answer = Integer.MAX_VALUE;
    public int solution(int[] picks, String[] minerals) {
        
        for (int i = 0; i < picks.length; i++) {
            picks[i] = picks[i] * 5;
        }
                
        solve (picks, minerals, 0, 0);
        
        return answer;

    }
    public static void solve (int[] picks, String minerals[], int level, int sum) {
        if (level == minerals.length || Arrays.stream(picks).sum() == 0) {
            answer = Math.min(answer, sum);
            return;
        }

        for (int i = 0; i < picks.length; i++) {
            if(picks[i] > 0)  {
                for (int j = level; j < minerals.length; j++) {
                    switch(i) {
                        case(0) :
                            sum += 1;   
                            break;
                        case(1) :
                            if (minerals[j].equals("diamond")) {
                                sum += 5;
                            } else {
                                sum += 1;
                            }
                            break;
                        case(2) :
                            if (minerals[j].equals("diamond")) {
                                sum += 25;
                            } else if (minerals[j].equals("iron")) {
                                sum += 5;
                            } else {
                                sum += 1;
                            }
                            break;
                    }   
                    picks[i] -= 1;
                    level = j;
                
                     if (picks[i] == 0) {
                         break;
                     }

            }
            solve(picks, minerals, level + 1, sum);
            }
        }
    }
}

// 성공 코드
class Solution {
    
    static int answer = Integer.MAX_VALUE;
    public int solution(int[] picks, String[] minerals) {
                
        solve(picks, minerals, 0, 0);
        
        return answer;

    }
    public static void solve (int[] picks, String minerals[], int level, int sum) {
        if (level == minerals.length || Arrays.stream(picks).sum() == 0) {
            answer = Math.min(answer, sum);
            return;
        }

        for (int i = 0; i < picks.length; i++) {
            if(picks[i] > 0)  {
  
                int tempPick = picks[i]; // 원래 곡괭이 수 저장
                int tempSum = sum; // 원래 피로도 저장
                
                for (int j = level; j < Math.min(level + 5, minerals.length); j++) {
                    switch(i) {
                        case(0) :
                            sum += 1;   
                            break;
                        case(1) :
                            if (minerals[j].equals("diamond")) {
                                sum += 5;
                            } else {
                                sum += 1;
                            }
                            break;
                        case(2) :
                            if (minerals[j].equals("diamond")) {
                                sum += 25;
                            } else if (minerals[j].equals("iron")) {
                                sum += 5;
                            } else {
                                sum += 1;
                            }
                            break;
                    }   
                }
                
                picks[i]--; // 곡괭이 수 감소 
                solve(picks, minerals, level + 5, sum); // 광물을 5개 연속 캐기 때문에 +5
                
                // 백트래킹 
                picks[i] = tempPick;
                sum = tempSum;
                
            }
        }
    }
}