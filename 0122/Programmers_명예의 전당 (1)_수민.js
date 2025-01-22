function solution(k, score) {
  const answer = [];
  let list = [];

  score.forEach((current) => {
    list.push(current);
    list.sort((a, b) => b - a).splice(k);
    answer.push(...list.slice(-1));
  });

  return answer;
}
