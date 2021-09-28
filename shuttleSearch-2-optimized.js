const solve = async () => {

  try{ 
         const buses = [19,'x','x','x','x','x','x','x','x',41,'x','x','x','x','x','x','x','x','x',823,'x','x','x','x','x','x','x',23,'x','x','x','x','x','x','x','x',17,'x','x','x','x','x','x','x','x','x','x','x',29,'x',443,'x','x','x','x','x',37,'x','x','x','x','x','x',13].
  map(bus => bus === 'x' ? 1 : parseInt(bus));
  
        return await getNextBusDepartureInfs(buses);
    }catch(e){
        console.log(e);
    }
}  

const getNextBusDepartureInfs = (buses) => {
      
  let time = 0;
  let stepSize = buses[0];
  
  console.log(buses);

  for (let i = 1; i < buses.length; i += 1) {
    const bus = buses[i];

    while ((time + i) % bus !== 0) {
      time += stepSize;
    }

    stepSize *= bus;
  }

  return time;
}


solve().then(console.log).catch((e) => console.log("error:" + e));
