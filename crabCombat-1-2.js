
function moveCards(arr1, wlabel, arr2, llabel) {
  arr1.push(arr1.shift());
  arr1.push(arr2.shift());
  return {
        winner: [arr1, wlabel],
        loser: [arr2, llabel]
    };
}

function playRound(p1, p2){
  if(parseInt(p1[0]) > parseInt(p2[0])){
    return moveCards(p1,'p1',p2,'p2');
  }else{
    return moveCards(p2,'p2',p1,'p1');
 }
}


function playGame(p1, p2, game){
 // console.log('Game:',game);
  var round = 0;
  let loser = [p1,'p1'];
  let winner = [p1,'p1'];

  let player1 = new Map();
  player1.set(p1.toString(), 0);

  let player2 = new Map();
  player2.set(p2.toString(), 0);

  while(loser[0].length > 0){
        let current1 = parseInt(p1[0]);
        let current2 = parseInt(p2[0]);
        let gameResult = [];
        
        if((current1 <= p1.length-1) && (current2 <= p2.length-1) ){

            let newP1 = p1.slice(1, current1+1);
            let newP2 = p2.slice(1, current2+1);

            let subGameResult = playGame(newP1, newP2, game+1); 
            
            if(subGameResult[0][1] == 'p1'){
              gameResult = moveCards(p1,'p1',p2,'p2');
            }else{
              gameResult = moveCards(p2,'p2',p1,'p1');
            }
        }else{
           gameResult = playRound(p1, p2);
        }
        
        if(round > 0 && 
        ((player1.has(p1.toString()) && round != player1.get(p1.toString())) || 
         (player2.has(p2.toString()) && round != player2.get(p2.toString())))){
            winner = [p1,'p1'];
            loser = [[], 'p2'];
          
        }else{
            winner = gameResult.winner;
            loser = gameResult.loser;
           
            round++; 
            player2.set(p2.toString(), round);
            player1.set(p1.toString(), round);
        }
  }//fim while
  return [winner, loser];
}

let p1 = ['18','50','9','4','25','37','39','40','29','6','41',
'28','3','11','31','8','1','38','33','30','42','15','26','36','43'];


let p2= ['32','44','19','47','12','48','14','2','13','10','35','45',
'34','7','5','17','46','21','24','49','16','22','20','27','23'];

/*let p1 = ['9', '2', '6', '3', '1'];
let p2 = ['5', '8', '4', '7', '10'];*/

let finalWinner = playGame(p1, p2, 0);
console.log('finalWinner:',finalWinner[0]);
const result = finalWinner[0][0].reverse().map((e,i)=> parseInt(e) *(i+1)).reduce((acc, curr) => acc + curr);
console.log(result);
