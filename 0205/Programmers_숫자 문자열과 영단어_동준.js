function solution(s) {
  const numbers = {
    zero: "0",
    one: "1",
    two: "2",
    three: "3",
    four: "4",
    five: "5",
    six: "6",
    seven: "7",
    eight: "8",
    nine: "9",
  };

  let result = s;
  for (const [word, num] of Object.entries(numbers)) {
    result = result.replaceAll(word, num);
  }

  return parseInt(result);
}
