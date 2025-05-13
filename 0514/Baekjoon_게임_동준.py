def calculate_min_games(X, Y):
    # 현재 승률 계산
    current_rate = (Y * 100) // X
    
    # 승률이 100%인 경우 더 이상 변할 수 없음
    if current_rate == 100:
        return -1
    
    # 이진 탐색
    left = 1
    right = 2000000000  # 충분히 큰 값으로 설정
    
    answer = -1
    while left <= right:
        mid = (left + right) // 2
        new_rate = ((Y + mid) * 100) // (X + mid)
        
        if new_rate > current_rate:
            answer = mid
            right = mid - 1
        else:
            left = mid + 1
    
    return answer

# 입력 받기
X, Y = map(int, input().split())

# 결과 출력
print(calculate_min_games(X, Y))
