process.stdin.resume();
process.stdin.setEncoding('utf8');

	
const returnOccupiedSeats = (input, isChanging) => {
  let finalCount = 0;
  while(isChanging){
    
    let newInput = [];
    isChanging = false;
    finalCount = 0;
    
    //console.log(input);
  //  console.log("************************************");

    for(var i = 0; i < input.length; i++){	 
      let line = [...input[i]];
      let newLine = "";
      for(var j = 0; j < line.length; j++){
	      const current = line[j];
    	     
    	      if(current === "."){
                newLine+=current;	
    		    continue;
    	      }
    
    	      const isEmpty = current === 'L';
    	      const isOccupied =  current === '#';
    	     
        let left = "*";
	    if(j > 0){
	       	let indexLeft = j - 1;
	       	left = line[indexLeft];
	    	while(left === "." && indexLeft > -1){
	    	  indexLeft--;
	    	  left = line[indexLeft];
	    	}
	    }
    	let right = "*";
      	if(j < (line.length-1)){
		    let indexRight = j +  1;
	    	right = line[indexRight];
		    while(right === "." && indexRight < (line.length-1)){
		     indexRight++;
		     right = line[indexRight];
	    	}
	    }
		
	  
//posso incluir as 3 checagens acima em 1 funcao no mesmo while mudando a condicao do while, usando flags talvez
    
    	      let above = (i > 0) ? 
    			   left !== "*" ? 
    			      right !== "*" ?
    				    checkDiagonalUpLeft(i,j, input) + checkUp(i,j, input) + checkDiagonalUpRight(i,j, input, line.length)
    			      : checkDiagonalUpLeft(i,j, input) + checkUp(i,j, input)
    			   : right !== "*" ? checkUp(i,j, input) + checkDiagonalUpRight(i,j, input, line.length) : checkUp(i,j, input)
    			  : "*";
    
    	      let below = (i < input.length) ? 
    			   left !== "*" ? 
    			      right !== "*" ?
    				checkDiagonalDownLeft(i,j, input) + checkDown(i,j, input) + checkDiagonalDownRight(i,j, input, line.length)
    			      : checkDiagonalDownLeft(i,j, input) + checkDown(i,j, input)
    			   : right !== "*" ? checkDown(i,j, input) + checkDiagonalDownRight(i,j, input, line.length) : checkDown(i,j, input)
    			  : "*";
    			  
    	      let around = below + above + left + right;
    	      
    	    /*  if(count === 2 && i === 1 && j === 2){
    	           console.log("current=>" + current); 
    	        console.log(above);   
    	         console.log(below);  
    	          console.log(left);  
    	           console.log(right);  
    	            console.log(input);  
    	      }*/
    	      
    	  
    	      let countOccupied = (around.match(/#/g) || []).length;
    	      
    	      let newChar = current;
    	      if(isEmpty){
    		    if(countOccupied === 0){
    		        isChanging = true;
    		        newChar = '#';
    		        finalCount++;
    		    }
    	      }else if(isOccupied){
        		if(countOccupied > 4){
        		  isChanging = true;
        		  newChar = 'L';
        		}else{
        		  finalCount++;
        		}
    	      }
    	      newLine+=newChar;	     	      
          }  // fecha j  
    	  newInput.push(newLine);
        } // fecha i
	input.splice(0, input.length);
	input = [...newInput];	
//	console.log(finalCount);
  }
return finalCount;
} 
