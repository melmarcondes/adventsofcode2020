process.stdin.resume();
process.stdin.setEncoding('utf8');

/*Initial position: E0, N0
F10 - S 100 10 - E10, N1
N3 - S 100 10 - E10, N4
R90 - S 100 10 - E4, S10
L270 - S 100 10 - W10 , S4 (current direction: south)
F11 -  S 10  34    - W10 , S4  (110 - 44)
*44*/

//ESTA CERTA MINHA LOGICA. PRECISO LER O ENUNCIADO DE NOVO E VER SE EU DEIXEI PASSAR ALGUM DETALHE ERRADO. TESTAR SOMAR S (SUL
//AO WAYPOINT E TB 180 (VER SE A LOGICA ESTA CERTA PRA ESTES). VOLTAR AQUI O INICIO DO EXERCICIO Q SAIU FORA COM O RELOAD
// DA PAGINA

const solve = async () => {
    const input = ['F10',
	    'N3',
	    'R90',
	    'L270',
	    'F11'
	    ];
    
    try{
        return await getManhattanDistance(input);
    }catch(e){
        console.log(e);
    }
}


/*Initial position: E0, N0
F10 - E10, N0
N3 - E10, N3
F7 - E17, N3
R90 - E17, N3 (current direction: south)
F11 - S8 (11 - 3(from N)), E17*/

const directionsIndexes = { 'S': 0, 'W': 1, 'N': 2, 'E': 3 };
const numberOfMov = { '90': 1, '180': 2, '270': 3};
const directions = ['S','W','N','E'];

const getNewDirection = (numMovs, position, f) => {
    return directions[f(position, numMovs)];
}

const isOposite = (dir1, dir2) =>  {
    return (dir1 == 'S' && dir2 == 'N') || 
           (dir1 == 'W' && dir2 == 'E') ||
           (dir1 == 'N' && dir2 == 'S') ||
           (dir1 == 'E' && dir2 == 'W')
}

const getNumberByDirection = (dir, number) => {
    return (dir === 'W' || dir === 'S') ? number * -1 : number;
}

const isXCoordinate = (dir) => {
    return (dir === 'W' || dir === 'E') ? true : false;
}

const getManhattanDistance = (input) => {

    let ship = [0,0];
    let waypoint = ['E', 10, 'N', 1];
    
    input.forEach(cmd => {
        let direction = cmd.substring(0,1);
        let number = parseInt(cmd.substring(1));

        if(direction === 'F'){
            numberX = getNumberByDirection(waypoint[0], number);
	    numberY = getNumberByDirection(waypoint[2], number);	    
            ship = [parseInt(ship[0]) + (numberX * parseInt(waypoint[1])), parseInt(ship[1]) + (numberY * parseInt(waypoint[3]))];
        }else if(direction === 'R' || direction === 'L'){
  	       let op = (direction === 'R') ? 
                    (a,b) => a + b < 4 ? a + b : a + b - 4 : 
                    (a,b) => a - b > -1 ? a - b : a - b + 4;
           let xTurned = getNewDirection(numberOfMov[number], directionsIndexes[waypoint[0]], op);
	       let yTurned = getNewDirection(numberOfMov[number], directionsIndexes[waypoint[2]], op);

            if(number !== 180){
                let newXValue = parseInt(waypoint[3]); //checar valores 270-ok e 180, teste de mesa, o q acontece
		        let newYValue = parseInt(waypoint[1]);     
		        waypoint[1] = newXValue;
		        waypoint[3] = newYValue;
		        waypoint[0] = yTurned;
		        waypoint[2] = xTurned;
            }else{
                waypoint[0] = xTurned;
		        waypoint[2] = yTurned;
            }
            
          
        }else{
            let numberOk = getNumberByDirection(direction, number);
            if(isXCoordinate(direction)){
                waypoint[1] += numberOk;
            }else{
                waypoint[3] += numberOk;
            }
        }
        console.log(direction + number + "=ship=>" + ship  +  "==waypoint==>" + waypoint)
    });
    return Math.abs(parseInt(ship[0])) + Math.abs(parseInt(ship[1]));
    
}

solve().then((data) => console.log("data:" + data)).catch((e) => console.log("error:" + e));
