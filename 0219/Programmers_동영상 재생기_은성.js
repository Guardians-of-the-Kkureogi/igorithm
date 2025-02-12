/**
 * 구현문제인가.. 더 쉽게 푸는 법 찾아봐야겠..
 * 상시조건: 현재 위치가 오프닝 구간인지 체크
 * 일반조건
 * 1. 현재 위치가 10초 미만이면 0분0초로 이동
 * 2. 현재 위치가 비디오 길이를 넘어가면 비디오 길이로 이동
 * 3. 초 단위가 60을 넘어가면 분+=1 / 초-=60
 * 4. 초 단위가 -가 되면 분-=1 / 초+=60
 */

function solution(video_len, pos, op_start, op_end, commands) {
    var answer = '';
    const pos_list = pos.split(':')
    const video_len_list = video_len.split(':')
    let timeObj = { 'minute': Number(pos_list[0]), 'second': Number(pos_list[1]) }
    let videoLenObj = { 'minute': Number(video_len_list[0]), 'second': Number(video_len_list[1]) }

    commands.forEach((command) => {
        isOpening(timeObj, op_start, op_end)

        if (command == 'prev') {
            timeObj.second -= 10
            if (timeObj.minute == 0 && timeObj.second < 0) {
                timeObj.second = 0
            }
            else if (timeObj.second < 0) {
                timeObj.minute -= 1
                timeObj.second += 60
            }
        } else if (command == 'next') {
            timeObj.second += 10
            if (timeObj.second > 60) {
                timeObj.minute += 1
                timeObj.second -= 60
            }
            if (timeObj.minute >= videoLenObj.minute && timeObj.second >= videoLenObj.second) {
                timeObj.minute = videoLenObj.minute
                timeObj.second = videoLenObj.second
            }
        }
    })
    isOpening(timeObj, op_start, op_end)
    minuteStr = timeObj.minute.toString().length == 1 ? "0" + timeObj.minute.toString() : timeObj.minute.toString()
    secondStr = timeObj.second.toString().length == 1 ? "0" + timeObj.second.toString() : timeObj.second.toString()

    answer = minuteStr + ":" + secondStr
    return answer;
}

function isOpening(timeObj, op_start, op_end) {
    const op_start_list = op_start.split(':')
    const op_end_list = op_end.split(':')
    let op_start_minute = Number(op_start_list[0])
    let op_start_second = Number(op_start_list[1])
    let op_end_minute = Number(op_end_list[0])
    let op_end_second = Number(op_end_list[1])
    if (timeObj.minute > op_start_minute) {
        if (timeObj.minute < op_end_minute) {
            timeObj.minute = op_end_minute
            timeObj.second = op_end_second
        } else if (timeObj.minute == op_end_minute && timeObj.second <= op_end_second) {
            timeObj.minute = op_end_minute
            timeObj.second = op_end_second
        }
    } else if (timeObj.minute == op_start_minute && timeObj.second >= op_start_second) {
        if (timeObj.minute < op_end_minute) {
            timeObj.minute = op_end_minute
            timeObj.second = op_end_second
        } else if (timeObj.minute == op_end_minute && timeObj.second <= op_end_second) {
            timeObj.minute = op_end_minute
            timeObj.second = op_end_second
        }
    }
}