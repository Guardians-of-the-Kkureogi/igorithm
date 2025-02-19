/**
 * 좌표마다 움직이는 값을 100*100 2차원배열에 입력 후 충돌값 비교
 * r좌표 먼저 계산 이동, 그 이후 c좌표 이동
 */

function solution(points, routes) {
    var answer = 0;
    let pointMap = new Map()
    let routeCount = 1
    let x = routes.length
    let m = routes[0].length
    // 초기설정
    for (let i = 0; i < x; i++) {
        let pointArr = []
        for (let j = 0; j < m; j++) {
            let routeX = routes[i][j]
            pointArr.push(points[routeX - 1])
        }
        pointMap.set(routeCount, pointArr)
        routeCount += 1
    }

    while (pointMap.size != 0) {
        let dimArr = Array.from(new Array(101), () => new Array(101).fill(0))
        const keys = pointMap.keys()
        console.log(pointMap)
        for (let key of keys) {
            console.log("key :: ", key)
            let point = pointMap.get(key)
            console.log("point12 : ", point[1])
            if (point.length > 1) {
                // row, col 계산

                console.log(")))", pointMap)
                console.log("**", point, point[0], point[1])
                let calX = point[0][0] - point[1][0]
                console.log("point13 : ", point[1])
                let calY = point[0][1] - point[1][1]
                console.log("point14 : ", point[1])
                if (calX == 0) {
                    if (calY == 0) {
                        // point[0] 제거
                        pointMap.delete(key)
                    } else if (calY > 0) {
                        point[0][1] -= 1
                    } else if (calY < 0) {
                        point[0][1] += 1
                    }
                } else if (calX > 0) {
                    point[0][0] -= 1
                } else if (calX < 0) {
                    point[0][0] += 1
                }
                console.log("point15 : ", point[1])
                conflictCount = dimArr[point[0][0]][point[0][1]]
                console.log("point16 : ", point[1])
                if (conflictCount > 0) {
                    console.log("point17 : ", point[1])
                    console.log(point[0][0], point[0][1])
                    answer += 1
                } else {
                    console.log("point18 : ", point[1])
                    dimArr[point[0][0]][point[0][1]] += 1 // 2차원 배열에 충돌 체크
                }
                console.log("point19 : ", point[1])
            }
            console.log("point20 : ", point[1])
            console.log("=== ", pointMap)
        }
    }
    return answer;
}

solution([[3, 2], [6, 4], [4, 7], [1, 4]], [[4, 2], [1, 3], [2, 4]])
// solution([[2, 2], [2, 3], [2, 7], [6, 6], [5, 2]], [[2, 3, 4, 5], [1, 3, 4, 5]])

// [[3, 2], [6, 4], [4, 7], [1, 4]]	[[4, 2], [1, 3], [2, 4]]	1
// [[3, 2], [6, 4], [4, 7], [1, 4]]	[[4, 2], [1, 3], [4, 2], [4, 3]]	9
// [[2, 2], [2, 3], [2, 7], [6, 6], [5, 2]]	[[2, 3, 4, 5], [1, 3, 4, 5]]	0