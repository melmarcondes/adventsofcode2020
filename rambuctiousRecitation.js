const solve = async () => {
    const input = [15,12,0,14,3,1];
     
    try{       
        return await run(input);
    }catch(e){
        console.log(e);
    }
}


const run = (input) => {
	let mem = [];
	input.forEach((item, i) => mem.push([i+1, item]));
	
	let aux = mem[mem.length-1]; //last number
	let number = aux[1];
	let idx = parseInt(aux[0]) + 1;

	for(let i = idx; i <= 30000000; i++){
	    let hasNumber = false;
	    //console.log('***Rodada ' + i + ' procura por ' + number);
	    for(let j = i-3; j >= 0; j--){
	        let curr = mem[j][1];
	       // console.log(curr +  ' eh igual a ' + number + '?');
	        if(curr == number){
	           // console.log('sim');
	            number = (i-1) - mem[j][0];
	            hasNumber = true;
	            break;
	        }
	    }
	    if(!hasNumber)  number = 0;
	    //console.log('retorna number ' + number);
	    mem.push([i, number]);
	    //console.log(mem);
	}
	return number;
}


solve().then((data) => console.log("data:" + data)).catch((e) => console.log("error:" + e));
