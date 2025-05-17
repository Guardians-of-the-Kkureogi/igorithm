/**
 * 그리디로 접근
 * 나간 지점 기준으로 정렬
 * 현재 차량이 단속카메라 리스트 중에 속해있지 않으면 단속카메라 추가
 * 단속카메라 리스트 중에 속해있으면 시작지점 비교 후 단속카메라 시작지점 변경
 */

function solution(routes) {
    var answer = 0;
    let cameras = [];
    routes.sort((a, b)=>{return a[1] - b[1]})
    routes.forEach((route)=>{
        const enter = route[0];
        const exit = route[1];
        let isCamera = false;
        // 단속카메라 조회
        cameras.forEach((camera)=>{
            const cameraStart = camera[0];
            const cameraEnd = camera[1];
            // 진입 지점이 단속카메라 경로에 속해있을 때 단속카메라 시작지점 = 현재차량 진입 지점으로 변경
            if(enter >= cameraStart && enter <= cameraEnd) {
                isCamera = true;
                camera[0] = enter;
                return;
            // 진입 지점이 단속카메라 경로보다 적으면 pass
            }else if(enter < cameraStart){
                isCamera = true;
                return;
            }
        })
        if(!isCamera){
            cameras.push([enter,exit]);
        }
    })
    answer = cameras.length
    return answer;
}