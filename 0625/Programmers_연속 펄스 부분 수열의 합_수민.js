/**
 * 생각보다 간단?하게 풀었다.
 *
 * 펄스 수열은 2가지 ->1 or -1 로 시작됨
 * 1. 원본 수열과 곱해서 새 수열 2개를 만든다.
 * 2. 각 수열의 연속하는 최대 합을 구하는 함수를 작성한다.
 *      - 현재합, 최대합 변수를 두고 순차적으로 비교하면서 업데이트 해준다.
 *      - 연속으로 더하는 것보다 현재 값이 크면 현재값을 합으로 업데이트 + 최대합 갱신
 *      - 최대합 반환
 * 3. 두 수열의 최대합을 구해 둘 중 큰 수를 반환한다.
 */

function solution(sequence) {
  const arr1 = [];
  const arr2 = [];

  sequence.forEach((num, index) => {
    const a = index % 2 === 0 ? 1 : -1;
    const b = index % 2 === 0 ? -1 : 1;
    arr1.push(num * a);
    arr2.push(num * b);
  });

  const getMaxSum = (arr) => {
    let sum = arr[0];
    let maxSum = arr[0];

    for (let i = 1; i < arr.length; i++) {
      sum = Math.max(arr[i], sum + arr[i]);
      maxSum = Math.max(sum, maxSum);
    }
    return maxSum;
  };

  return Math.max(getMaxSum(arr1), getMaxSum(arr2));
}

console.log(solution([2, 3, -6, 1, 3, -1, 2, 4]));
