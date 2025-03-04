/**
 * r^2 = a^2 + b^2 공식 사용해서 풀었는데 왜 안풀리지..
 */

function solution(r1, r2) {
    const integer = (r) => {
      let count = 0;
      for (let i = 1; i < r; i++) {
        console.log(Math.sqrt(Math.pow(r, 2) - Math.pow(i, 2)));
        count += Math.floor(Math.sqrt(Math.pow(r, 2) - Math.pow(i, 2)));
      }
      return 1 + 4 * r + 4 * count;
    };
  
    var answer = integer(r2) - integer(r1) + 4;
    return answer;
  }