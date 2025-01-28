function solution(parks, routes) {
    var answer = [];
    var arr = [];
    var width = 0, height = 0; // 공원 길이

    parks.map((park, idx) => {
        const park_array = Array.from(park)
        arr.push(park_array)
        if (park_array.indexOf('S') !== -1) { // 시작점 저장
            answer = [idx, park_array.indexOf('S')]
        }
    })

    width = arr[0].length
    height = arr.length

    let directions = { // 동서남북 객체
        'E': [0, 1],
        'W': [0, -1],
        'S': [1, 0],
        'N': [-1, 0]
    }

    routes.map((route) => {
        let now_row = answer[1]
        let now_col = answer[0]
        let next_row = 0
        let next_col = 0
        let valid = true

        let direction = route.split(" ")
        let steps = Number(direction[1])
        for (let i = 0; i < steps; i++) {
            next_col = now_col + directions[direction[0]][0]
            next_row = now_row + directions[direction[0]][1]

            // 예외 케이스 설정
            if (next_col < 0 || next_col >= height || next_row < 0 || next_row >= width || arr[next_col][next_row] === 'X') {
                valid = false;
                break;
            }

            now_col = next_col
            now_row = next_row
        }

        if (valid) {
            answer[0] = next_col;
            answer[1] = next_row;
        }
    })
    return answer;
}