function solution(k, scores) {
    var answer = [];
    var score_asc = [];
    scores.map((score, idx) => {
        if (idx == 0) { // 초기 data 처리
            score_asc.push(score)
            answer.push(score)
            return
        }

        if (score_asc.length < k) { // 리스트 길이가 k 미만일 때
            let isPush = false
            for (let i = 0; i < score_asc.length; i++) {
                if (score > score_asc[i] && !isPush) {
                    score_asc.splice(i, 0, score) // 삽입
                    isPush = true
                }
            }
            if (!isPush) {
                score_asc.push(score)
            }
            answer.push(score_asc[score_asc.length - 1]) // 최하위 점수 추가
        }
        else { // 리스트 길이가 k 이상일 때
            let isPush = false
            for (let i = 0; i < k; i++) {
                if (score > score_asc[i] && !isPush) {
                    score_asc.splice(i, 0, score)
                    isPush = true
                }
            }
            if (!isPush) {
                score_asc.push(score)
            }
            answer.push(score_asc[k - 1]) // k번째 점수 추가
        }
    })
    return answer;
}