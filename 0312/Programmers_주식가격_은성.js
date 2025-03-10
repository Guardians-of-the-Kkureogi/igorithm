/**
 * 이진탐색으로 풀었는데, 이중 for문으로도 풀리는구만..
 */

function solution(prices) {
    var answer = Array(prices.length).fill(0);
    let arrayList = [];
  
    // 이진탐색
    const binarySearch = (price, idx) => {
      let left = 0;
      let right = arrayList.length;
  
      while (left < right) {
        let mid = Math.floor((left + right) / 2);
        if (arrayList[mid].price <= price) {
          left = mid + 1;
        } else {
          right = mid;
        }
      }
  
      // 지정된 위치에 추가
      arrayList.splice(left, 0, { price: price, idx: idx });
      if (left == arrayList.length) return;
      // 위치 뒤에 값들이 있으면 answer에 초 설정
      if (left < arrayList.length) {
        for (let i = arrayList.length - 1; i > left; i--) {
          let overIdx = arrayList.pop().idx;
          answer[overIdx - 1] = idx - overIdx;
        }
      }
    };
  
    prices.forEach((price, idx) => {
      idx == 0
        ? arrayList.push({ price: price, idx: idx + 1 })
        : binarySearch(price, idx + 1);
    });
  
    // 아직 0인 시간들 설정
    answer.forEach((a, idx) => {
      if (a == 0) answer[idx] = prices.length - 1 - idx;
    });
    return answer;
  }

  // 이중 for문 방식
  function solutionFor(prices) {
    let answer = Array(prices.length).fill(0);
    for (let i = 0; i < prices.length; i++) {
      for (let j = i; j < prices.length; j++) {
        if (prices[i] > prices[j]) {
          answer[i] = j - i;
          break;
        }
      }
    }
    answer.forEach((a,idx)=>{
      if(a == 0) answer[idx] = prices.length -1 - idx
    })
    return answer
  }
  
  solution([1, 2, 3, 2, 3]);  