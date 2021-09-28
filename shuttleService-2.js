const solve = async () => {
  
   const input = [19,'x','x','x','x','x','x','x','x',41,'x','x','x','x','x','x','x','x','x',823,,'x','x','x','x','x','x','x',23,'x','x','x','x','x','x','x','x',17,'x','x','x','x','x','x','x','x','x','x','x',29,'x',443,'x','x','x','x','x',37,'x','x','x','x','x','x',13];
    try{ 
        let initialArray = [];
        input.forEach((x, i) => { 
            if(x != 'x') initialArray.push([i, x, x]);
        });
        return await getNextBusDepartureInfs(initialArray);
    }catch(e){
        console.log(e);
    }
}



const getNextBusDepartureInfs = (busIds) => {
    let go = true;
    let maxTimestamp = busIds.reduce((max, arr) => {return Math.max(max, arr[1]);}, -Infinity);
    const maxOffset = busIds[busIds.length-1][0];
    const arrLen = busIds.length;
    while(go){
         let subsequent = 0;
         let i = 0;
         while(i < arrLen){
            let idx0currTmt = parseInt(busIds[0][2]);
            let currIdx = parseInt(busIds[i][0]);
            let currTmt = parseInt(busIds[i][2]);
            let interval = parseInt(busIds[i][1]);
            let lastTmt = parseInt(busIds[arrLen-1][2]);
        
             while(currTmt < maxTimestamp){
                  if(currTmt > 2416992022){//2416992022 - 1058443396696792 - 1.058.443.396.696.792
                        console.log('i:' + i + ',currTmt='+ currTmt + ',==max:'+ maxTimestamp + ',==idx0currTmt:'+ idx0currTmt +',==array:'+ busIds+',==subsequent:'+ subsequent);
                    }
                   
                    if((maxTimestamp - currTmt) > maxOffset &&
                      ((lastTmt < currTmt) || 
                         (i == arrLen - 1 && lastTmt == currTmt && (currTmt - busIds[i-1][2] != currIdx - busIds[i-1][0])) ||
                         ((lastTmt - currTmt) > (maxOffset - currIdx) ||
                            ((lastTmt - currTmt) < (maxOffset - currIdx) &&
                              ((subsequent > 0) && (lastTmt - currTmt) != (maxOffset - currIdx)))
                          ))){
                        currTmt = currTmt + interval;
                     }else{
                         if(i === arrLen - 1 && (subsequent !== arrLen - 2)){
                             currTmt = currTmt + interval;
                         }else{
                            break;
                         }
                     }
            }
            busIds[i][2] = currTmt;
            if(currTmt > maxTimestamp){
               maxTimestamp = currTmt;
            }
            if(i !== 0 && (currTmt - idx0currTmt == currIdx)){
                subsequent++;
                go = false;
            }else{
                go = true;
            }
            if(i === arrLen-1 && (subsequent !== arrLen-1)){
               maxTimestamp = maxTimestamp + interval;
            }
            i++;
         }
         
         if(!go && (subsequent != busIds.length-1)){
           go = true; 
         }
    }
    return busIds[0][2];
}

solve().then((data) => console.log("data:" + data)).catch((e) => console.log("error:" + e));
