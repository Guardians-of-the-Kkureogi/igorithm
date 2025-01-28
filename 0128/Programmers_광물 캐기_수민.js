const table = {
    diamond:[1,5,25],
    iron:[1,1,5],
    stone:[1,1,1]
}

function solution(picks, minerals) {
    const maxMineral = 5 * picks.reduce((acc, cur) => acc + cur, 0); // 최대 곡갱이 수
    const n = Math.min(minerals.length, maxMineral); // 최대 광질 수 
    const stack = [[picks,0,0]]; 
    let answer = 0; // 최소 피로도
    
    const sum = (pick, arr) => {
        // 피로도 합
        return arr.reduce((acc, cur) => acc + table[cur][pick], 0);
    }
    
    while(stack.length){
        const [pick, index, fatigue] = stack.pop();
  
        if(index === n){
            if(answer===0 || answer > fatigue){
                answer = fatigue;
            }
            continue;
        }
        
        const nextIndex = Math.min(index + 5, n);
        
        pick.forEach((item,i)=>{
            if(item > 0){ 
                const nextPick = [...pick];
                nextPick[i]--;
                stack.push([nextPick, nextIndex,fatigue+sum(i,minerals.slice(index,nextIndex))]) 
            }
        })    
    }
    return answer;
}