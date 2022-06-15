let input =  ["sesenwnenenewseeswwswswwnenewsewsw",
"neeenesenwnwwswnenewnwwsewnenwseswesw",
"seswneswswsenwwnwse",
"nwnwneseeswswnenewneswwnewseswneseene",
"swweswneswnenwsewnwneneseenw",
"eesenwseswswnenwswnwnwsewwnwsene",
"sewnenenenesenwsewnenwwwse",
"wenwwweseeeweswwwnwwe",
"wsweesenenewnwwnwsenewsenwwsesesenwne",
"neeswseenwwswnwswswnw",
"nenwswwsewswnenenewsenwsenwnesesenew",
"enewnwewneswsewnwswenweswnenwsenwsw",
"sweneswneswneneenwnewenewwneswswnese",
"swwesenesewenwneswnwwneseswwne",
"enesenwswwswneneswsenwnewswseenwsese",
"wnwnesenesenenwwnenwsewesewsesesew",
"nenewswnwewswnenesenwnesewesw",
"eneswnwswnwsenenwnwnwwseeswneewsenese",
"neswnwewnwnwseenwseesewsenwsweewe",
"wseweeenwnesenwwwswnew"];

const mov = new Map();
mov.set('nw', [[-1,-1], [0,-1]]);
mov.set('ne', [[0,-1],[1,-1]]);
mov.set('e', [1,0]);
mov.set('se', [[0,1], [1,1]]); //x - 0 pra par, 1 pra impar
mov.set('sw', [[-1,1], [0,1]]); //x - -1 pra par, 0 pra impar
mov.set('w', [-1,0]);

function getCommands(arr){
  const cmds = [];
  arr.forEach((line) => {
      var str = [...line];
      var tile = [];
      for(var i = 0; i < str.length; i++){
        var curr = str[i];
        if(curr == 'n' || curr == 's'){
          tile.push(curr.concat(str[i+1]));
          i++;
        }else{
          tile.push(curr);
        }
      }
      cmds.push(tile);
  });

  return cmds;
}

function getPosition(x,y,direction){
    var move = mov.get(direction);
     //    console.log('------------');
     //   console.log(direction);
    if(direction.length == 2){
       if(y % 2 == 0){
           move = move[0];
        }else{
           move = move[1];
        }
    }
    x+= move[0];
    y+= move[1];
    return [x,y];
}

function flipOver(startPosition, commands){
    var x = startPosition[0];
    var y = startPosition[1];
    var len = commands.length;
    for(var i = 0; i < len; i++){
        var direction = commands[i];
        var curr = getPosition(x,y,direction);
        x = curr[0];
        y = curr[1];
    }
    return x.toString().concat('|').concat(y.toString());
}

function getNumOfBlack(tiles){
    var count = 0;
    tiles.forEach((v, k) => {if (v == true) count++;});
    return count;
}

//black - true, white - false
const commands = getCommands(input);
let tiles = new Map();

//**********SOLUTION PART 1
//run
commands.forEach((lineCmd) => {
    //every line starts from the same reference tile (in the center, 0,0)
    let tile = flipOver([0,0], lineCmd);
    if(tiles.has(tile)){
       var color = tiles.get(tile);
       tiles.set(tile, !color);
    }else{
       tiles.set(tile, true);
    }
});

console.log("Result part 1: " + getNumOfBlack(tiles));


//**********SOLUTION PART 2
function getAdjacents(tile){
    var x = tile[0];
    var y = tile[1];
    var nw = getPosition(x,y,'nw');
    var ne = getPosition(x,y,'ne');
    var e = getPosition(x,y,'e');
    var se = getPosition(x,y,'se');
    var sw = getPosition(x,y,'sw');
    var w = getPosition(x,y,'w');

    return [nw,ne,e,se,sw,w];
}

function getNumOfNeighborsBlack(neighbors, oldTiles, tiles){
    let count = 0;
    neighbors.forEach(key => {
        if (oldTiles.has(key)){
            if(oldTiles.get(key) === true) count++;
        }else{
            tiles.set(key, false);
        };
    });
    return count;
}

//initially fill neighbors
let newTiles = new Map(tiles);
tiles.forEach((v, k) => {
    var tile = k.split('|').map(x => parseInt(x));
    var neighbors = getAdjacents(tile).map(x => x.toString().replace(',','|'));
    neighbors.forEach(key => {
        if (!tiles.has(key)){
           newTiles.set(key, false);
        }
    });
});

//run
for(var i = 1; i <= 100; i++){
    let oldTiles = new Map(newTiles);
    oldTiles.forEach((v, k) => {
        var tile = k.split('|').map(x => parseInt(x));
        var currentColor = v;
        var neighbors = getAdjacents(tile).map(x => x.toString().replace(',','|'));
        var bn = getNumOfNeighborsBlack(neighbors, oldTiles, newTiles);
        if((currentColor && (bn === 0 || bn > 2)) || (currentColor === false && bn === 2)){
            newTiles.set(k, !currentColor);
        }
    });
}

console.log("Result part 2: " + getNumOfBlack(newTiles));
