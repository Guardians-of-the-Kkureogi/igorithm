// 실패원인 : splice는 원본 배열 값을 변경하여서 곡괭이와 광물을 원상복구 안시켜둠. slice()를 이용해서 복사해서 사용해야함.

function backtracking(picks, minerals, index, minCost, cost) {
    if (minerals.length <= 0) { // 광물 전부 사용 시 return
        if (minCost.value > cost)
            minCost.value = cost
        return
    }

    let pickZeroCheck = 3
    picks.forEach((pick) => {
        pickZeroCheck = pick === 0 ? pickZeroCheck - 1 : pickZeroCheck
    })

    if (pickZeroCheck === 0) { // 곡괭이 전부 사용 시 return
        if (minCost.value > cost)
            minCost.value = cost
        return
    }

    const useMinerals = minerals.slice(index, index + 5) // 미네랄 5개씩 추출

    for (let i = 0; i < 3; i++) {
        let newCost = cost
        if (picks[i] > 0) { // 곡갱이가 있으면
            let newPicks = picks.slice()
            newPicks[i] -= 1; // 곡갱이 사용
            useMinerals.forEach(useMineral => {
                if (i === 0) // 다이아 곡괭이
                    newCost += 1
                else if (i === 1) { // 철 곡괭이
                    newCost += useMineral === "diamond" ? 5 : 1
                }
                else { // 돌 곡괭이
                    newCost += useMineral === "diamond" ? 25 : useMineral === "iron" ? 5 : 1
                }
            });
            if (newCost > minCost.value) {
                return
            }
            backtracking(newPicks, minerals, index + 5, minCost, newCost)
        }
    }
}

function solution(picks, minerals) {
    const minCost = { value: Infinity } // 객체값으로 전달
    backtracking(picks, minerals, 0, minCost, 0)
    return minCost.value;
}