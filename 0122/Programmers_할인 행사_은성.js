function solution(want, number, discount) {
    var answer = 0;
    let wantList = []
    for (let i = 0; i < want.length; i++) { // 할인받으려는 품목*수량 배열 생성
        for (let j = 0; j < number[i]; j++) {
            wantList.push(want[i])
        }
    }

    while (true) {
        if (discount.length < 10)
            break;
        let day10List = discount.slice(0, 10) // 10개씩 체크
        let copyWantList = wantList.slice()
        day10List.map((day10) => {
            if (copyWantList.indexOf(day10) >= 0) { // 원하는 품목에 포함되어 있을 때
                copyWantList.splice(copyWantList.indexOf(day10), 1)
            } else { // 원하는 품목에 포함되어있지 않을 때 return
                return;
            }
        })
        if (copyWantList.length == 0) // 원하는 품목 모두 받았을 때 answer++
            answer++;
        discount.shift()
    }
    return answer;
}