function solution(picks, minerals) {
  // 피로도 테이블 정의
  const fatigueTable = {
    diamond: { diamond: 1, iron: 1, stone: 1 },
    iron: { diamond: 5, iron: 1, stone: 1 },
    stone: { diamond: 25, iron: 5, stone: 1 },
  };

  // 사용 가능한 곡괭이 수에 따라 광물 제한
  const maxMinerals = Math.min(
    minerals.length,
    picks.reduce((a, b) => a + b) * 5
  );
  const mineralGroups = [];

  // 5개씩 그룹화
  for (let i = 0; i < maxMinerals; i += 5) {
    const group = minerals.slice(i, i + 5);
    let diamondCount = 0;
    let ironCount = 0;
    let stoneCount = 0;

    group.forEach((mineral) => {
      if (mineral === "diamond") diamondCount++;
      else if (mineral === "iron") ironCount++;
      else stoneCount++;
    });

    mineralGroups.push({
      minerals: group,
      score: diamondCount * 25 + ironCount * 5 + stoneCount,
    });
  }

  // 피로도가 높은 순으로 정렬
  mineralGroups.sort((a, b) => b.score - a.score);

  let fatigue = 0;
  let pickTypes = ["diamond", "iron", "stone"];
  let currentPick = 0;

  // 광물 캐기
  for (let group of mineralGroups) {
    // 사용 가능한 곡괭이 찾기
    while (currentPick < 3 && picks[currentPick] === 0) {
      currentPick++;
    }
    if (currentPick >= 3) break;

    // 피로도 계산
    group.minerals.forEach((mineral) => {
      fatigue += fatigueTable[pickTypes[currentPick]][mineral];
    });

    picks[currentPick]--;
  }

  return fatigue;
}
