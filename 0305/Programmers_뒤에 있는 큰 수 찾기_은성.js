/**
 * 1. answer 전체 -1로 설정
 * 2. 뒷 큰수 못찾은 배열 searchIdxList 생성
 * 3. 현재기준 제일큰 수 (maxNumIdx) / 제일 작은 수 (minNumIdx) 위치 설정
 * 4. numbers 반복
 * 5. 제일 큰수보다 큰지 비교
 * 5-1. 큰수보다 크면 searchIdxList 전체 answer[idx] 현재 숫자로 초기화
 * 5-2. searchIdxList / maxNumIdx / minNumIdx 초기화 후 반복문 return
 * 6. 제일 작은 수 보다 큰지 비교
 * 6-1. 제일 작은 수 보다 크면 searchIdxList.pop() 으로 맨 마지막 값부터 반복해서 가져오기
 * 6-2. pop() 값이 현재 값보다 작으면 answer[pop()] 현재 숫자로 초기화
 * 6-3. pop() 값이 현재 값보다 크거나 같으면 설정 초기화
 *      searchIdxList.push(pop()) / searchIdxList.push(현재 값 idx) / minNumIdx = 현재 idx
 * 7. 4-6 반복 후 answer return
 */

function solution(numbers) {
    var answer = [];
    answer = Array(numbers.length).fill(-1); // 전체 -1 초기화
    let searchIdxList = []; // 뒷 큰수 못찾은 idx 리스트
    let maxNumIdx = 0; // 뒷 큰수 못찾은 idx 중 최대 값 위치
    let minNumIdx = 0; // 뒷 큰수 못찾은 idx 중 최소 값 위치
  
    // 값 초기화
    searchIdxList.push(0);
  
    numbers.forEach((number, idx) => {
      if (idx == 0) return; // 첫번째 값 pass
  
      if (number > numbers[maxNumIdx]) {
        searchIdxList.forEach((searchIdx) => {
          answer[searchIdx] = number;
        });
        searchIdxList = [idx]; // 현재 idx로 초기화
        maxNumIdx = idx;
        minNumIdx = idx;
        return;
      } else if (number > numbers[minNumIdx]) {
        while (searchIdxList.length > 0) {
          let searchIdx = searchIdxList.pop();
          if (number > numbers[searchIdx]) {
            answer[searchIdx] = number;
          } else {
            searchIdxList.push(searchIdx);
            searchIdxList.push(idx);
            minNumIdx = idx;
            break;
          }
        }
      } else {
        searchIdxList.push(idx);
        minNumIdx = idx;
      }
    });
    return answer;
  }