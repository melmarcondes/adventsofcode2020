const solve = async () => {
    const timestamp = 1005162;
    const busIds = [19,41,823,23,17,29,443,37,13];
   // const busIds = [7,13,59,31,19];
    
    try{
        return await getNextBusDepartureInfs(timestamp, busIds);
    }catch(e){
        console.log(e);
    }
}

const getTotal = (x, timestamp) => {
    let tot = 0;
    while(tot < timestamp){
        tot+=x;
    }
    return tot - timestamp;
}

const getNextBusDepartureInfs = (timestamp, busIds) => {
    const waitTimeArr = [...busIds].map(x => getTotal(x, timestamp));
    const min = Math.min(...waitTimeArr);
    const busId = busIds[waitTimeArr.indexOf(min)];
    return busId * min;
    
}

solve().then((data) => console.log("data:" + data)).catch((e) => console.log("error:" + e));
