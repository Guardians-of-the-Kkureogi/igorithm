function solution(topping) {
  var answer = 0;
  let leftCount = 0;
  let rightCount = 0;
  const leftArray = Array.from({ length: 10001 }, () => 0);
  const rightArray = Array.from({ length: 10001 }, () => 0);

  topping.forEach((v) => {
    rightArray[v] += 1;
  });

  rightCount = rightArray.filter((v) => v !== 0).length;

  topping.forEach((v) => {
    leftArray[v] += 1;
    rightArray[v] -= 1;

    if (leftArray[v] === 1) {
      leftCount += 1;
    }

    if (rightArray[v] === 0) {
      rightCount -= 1;
    }

    if (rightCount === leftCount) {
      answer += 1;
    }
  });
  return answer;
}
