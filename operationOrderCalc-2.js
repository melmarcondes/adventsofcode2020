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
	let aux = str.join('').split('*')
	let multiplyList = aux.filter(x => !x.includes('+'));
    let sumFirst = aux.filter(x => x.includes('+'))
    sumFirst.forEach(i => { 
        let total = i.split('+').reduce((a,b) => parseInt(a) + parseInt(b));
	      multiplyList.push(total);
	});
  return multiplyList.reduce((a,b) => parseInt(a) * parseInt(b));
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
