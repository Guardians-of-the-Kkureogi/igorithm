/**
 * 내 롤케이크 토핑 카운트 초기화
 * topping 배열 pop 하면서 동생 롤케이크로 옮기기
 * 토핑 카운트 체크
 */

function solution(topping) {
    var answer = 0;
    let leftRoleCake = Array(10001).fill(0);
    let rightRoleCake = Array(10001).fill(0);
    let leftToppingCnt = 0;
    let rightToppingCnt = 0;
  
    // 내 롤케이크 토핑 카운트 초기화
    topping.forEach((topp) => {
      if (leftRoleCake[topp] == 0) {
        leftToppingCnt += 1;
      }
      leftRoleCake[topp] += 1;
    });
  
    while (topping.length != 0) {
      let last = topping.pop();
      // 내 롤케이크에서 빼기
      if (leftRoleCake[last] - 1 == 0) {
        leftToppingCnt -= 1;
      }
      leftRoleCake[last] -= 1;
  
      // 동생 롤케이크에 더하기
      if (rightRoleCake[last] == 0) {
        rightToppingCnt += 1;
      }
      rightRoleCake[last] += 1;
      if (leftToppingCnt == rightToppingCnt) {
        answer += 1;
      }
    }
    return answer;
  }  