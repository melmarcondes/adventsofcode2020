
const solve = async () => {
    const input = ['mask = 000000000000000000000000000000X1001X',
'mem[42] = 100',
'mask = 00000000000000000000000000000000X0XX',
'mem[26] = 1']; 
    try{
        console.log(input.length);
        return await run(input);
    }catch(e){
        console.log(e);
    }
}

const decToBin = (num) => {
    let binary = (num).toString(2);
    while(binary.length < 36){
        binary = "0".concat(binary);
    }
    return binary;
}


let permut = [];
const generateAllBinaryStrings = (n, arr, i) => {
        if (i == n)
        {
            permut.push(...arr);
            return;
        }
        
        arr[i] = 0;
        generateAllBinaryStrings(n, arr, i + 1);
 
        arr[i] = 1;
        generateAllBinaryStrings(n, arr, i + 1);
}

const run = (input) => {
   let mem = new Map();
   let applyMask = [];   
   let positions = [];
   let n = 0;
   input.forEach((cmd) => {
      let aux = cmd.split('=').map((x) => x.trim());
      let memAdress = aux[0].replace('mem[','').replace(']','');
      if(cmd.startsWith('mask')){
           applyMask.splice(0, applyMask.length);
           positions.splice(0, positions.length); //melhorar
           permut.splice(0, permut.length); //melhorar - tentar fazer tudo no apply mask
           [...aux[1]].map((char, i) => {
               if(char !== '0'){
                   applyMask.push(i);
                   applyMask.push(char);
               }
           });
           positions = applyMask.filter((e, i) => i % 2 == 0 && applyMask[i+1] === 'X');
           n = positions.length;
            //hacked code*********
           let arr = new Array(n);
           arr.fill(0);
   	       generateAllBinaryStrings(n, arr, 0);
   	       //**********************
           return;
       }
       let bin = [...decToBin(parseInt(memAdress))];
       for(var i = 0; i < applyMask.length; i += 2) {
           bin[applyMask[i]] = applyMask[i + 1];
       }
       let z = 0;
       /*console.log('permut:' + permut);
       console.log('positions:' + positions);
       console.log('bin:' + bin);*/
       while(z < permut.length) {
           var y = 0;
           while(y < n){
               bin[positions[y]] = permut[z];
               y++;
               z++;
           }
           console.log('bin z:' +  bin);
           let finalBin = '';
           bin.map(x => finalBin+=x);
           mem.set(parseInt(finalBin, 2), parseInt(aux[1]));
       }
       bin.splice(0, bin.length);
       console.log('mem:', mem);
   });
   let tot = 0;
   mem.forEach((v,k) => tot+=parseInt(v));
   return tot;  
}


solve().then((data) => console.log("data:" + data)).catch((e) => console.log("error:" + e));
