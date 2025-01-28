function backtracking(picks, minerals, minCost, cost) {
    if (minerals.length <= 0) { // 광물 전부 사용 시 return
        minCost.value = cost
        return
    }

    let pickZeroCheck = false
    picks.forEach((pick) => { 
        pickZeroCheck = pick === 0 ? true : false
    })

    if (pickZeroCheck) { // 곡괭이 전부 사용 시 return
        minCost.value = cost
        return
    }

    const useMinerals = minerals.splice(0, 5) // 미네랄 5개씩 추출

    for (let i = 0; i < 3; i++) {
        let newCost = cost
        if (picks[i] > 0) { // 곡갱이가 있으면
            picks[i] -= 1; // 곡갱이 사용
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
            backtracking(picks, minerals, minCost, newCost)
        }
    }
}

function solution(picks, minerals) {
    const minCost = { value: Infinity } // 객체값으로 전달
    backtracking(picks, minerals, minCost, 0)
    return minCost.value;
}