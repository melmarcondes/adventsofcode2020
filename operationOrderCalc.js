const solve = async () => {
       const input =  ['2 * 3 + (4 * 5)','((2 + 4 * 9) * (6 + 9 * 8 + 6) + 6) + 2 + 4 * 2']
        try{        
            let cont = 0;            
            input.forEach(x => {
                let expressionAsArray = x.trim().split('');
                cont =  cont + evaluate(findParenthesis(expressionAsArray, 0));
            });        
            return await cont;
        }catch(e){
            console.log(e);
        }
}

const calc = (a, b, signal) => {
	let result = a + b;
	if(signal == '*') result = a * b;
	return result;
}

const evaluate = (str) => {    
	let i = 0;
	let op1 = '';
	let op2 = '';
	let signal = '';
	let idx_cut = 0;
	while(i < str.length){	   
	   if(isNaN(str[i])) {
		if(signal != ''){
		   idx_cut = i;
		   break;
		}
		signal = str[i];
	   }else{
		if(signal == ''){
		  op1+= str[i];
		}else{
		  op2+= str[i];
		}		
	   }
	   i++;
	}
	let result = calc(parseInt(op1), parseInt(op2), signal);
	let aux = str.slice(idx_cut);
	let expression = idx_cut > 0 ? [result].concat(aux) : [result]; //melhorar, manter array
	if(!expression.includes('*') && !expression.includes('+')){
	  return expression[0];
	}else{
	  return evaluate(expression);
	}
}

const findParenthesis = (str) => {
   	let end = str.indexOf(')');
	let ini = 0;
	if(end > -1){
    	   for(let i = end - 1; i >= 0; i--){
    	 	 let char = str[i];
    		 if(char == '('){
    		   ini = i;
    		   break;
    		 }			
    	   }
    	   //ini SEMPRE SENDO O INDEX COM O PARENTHESIS ABRINDO O FECHADO DO END
	   let expression = str.slice(ini + 1, end); //vou ter q corrigir INI
	   let result = evaluate(expression);
	   str.splice(ini, (end - ini) + 1, result); 
	   findParenthesis(str, num);
	 }
	 return str;	
}

solve().then((data) => console.log("data:",data)).catch((e) => console.log("error:" + e));
