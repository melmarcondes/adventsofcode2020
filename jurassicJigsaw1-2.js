var input = $('pre').innerText.trimEnd().split('\n\n');
var tiles = [];
input.forEach((a)=>{
    let tile = [];
    let split = a.split(':\n');
    tile[0] = Number.parseInt(split[0].substr(5));
    split = split[1].split('\n');
    tile[1] = split[0];
    tile[3] = split[split.length-1];
    tile[4] = split.map(a=>a[0]).join('');
    tile[2] = split.map(a=>a[a.length-1]).join('');
    tiles.push(tile);
});

function rotateEdges(tile, rotations) { //CW
    let newTile = [];
    newTile[0] = tile[0];
    if (rotations == 0) {
        newTile[1] = tile[1];
        newTile[2] = tile[2];
        newTile[3] = tile[3];
        newTile[4] = tile[4];
    } else if (rotations == 1) {
        newTile[1] = tile[4].split('').reverse().join('');
        newTile[2] = tile[1];
        newTile[3] = tile[2].split('').reverse().join('');
        newTile[4] = tile[3];
    } else if (rotations == 2) {
        newTile[1] = tile[3].split('').reverse().join('');
        newTile[2] = tile[4].split('').reverse().join('');
        newTile[3] = tile[1].split('').reverse().join('');
        newTile[4] = tile[2].split('').reverse().join('');
    } else if (rotations == 3) {
        newTile[1] = tile[2];
        newTile[2] = tile[3].split('').reverse().join('');
        newTile[3] = tile[4];
        newTile[4] = tile[1].split('').reverse().join('');
    }
    return newTile;
}

function flip(tile) { // y axis
    let newTile = [];
    newTile[0] = tile[0];
    newTile[1] = tile[3];
    newTile[2] = tile[2].split('').reverse().join('');
    newTile[3] = tile[1];
    newTile[4] = tile[4].split('').reverse().join('');
    return newTile;
}

function checkNeighbour(tile1, tile2) {
    if (tile1[1]==tile2[3]) return 1;
    if (tile1[2]==tile2[4]) return 2;
    if (tile1[3]==tile2[1]) return 3;
    if (tile1[4]==tile2[2]) return 4;
    return 0;
}

function findNeighbours(tile) {
    let neighbours = new Array(5);
    tiles.forEach((a)=>{
        if (a[0] == tile[0])  return;
        for (let i=0; i<=3; i++) {
            let variant1 = rotateEdges(a, i);
            let n = checkNeighbour(tile, variant1);
            if (n) neighbours[n] = [a[0], i, false];

            let variant3 = flip(variant1);
            n = checkNeighbour(tile, variant3);
            if (n) neighbours[n] = [a[0], i, true];
        }
    });
    return neighbours;
}

var neighboursList = [];
tiles.forEach((tile)=>{
    neighboursList[tile[0]] = findNeighbours(tile);
});
var product = 1;
var corners = [];
neighboursList.forEach((a,i)=>{
    if (a.filter(c=>(c||[]).length>0).length==2)
        corners.push([i, a]);
});
console.log(`Answer 1: ${corners.reduce((a,b)=>a*b[0],1)}`);

var picture = [];
for (let i=0; i<tiles.length**0.5; i++) {
    picture[i] = new Array(tiles.length**0.5);
}
picture[0][0] = [corners.filter(a=>a[1][2]!=null&&a[1][3]!=null)[0][0], 0, false];

function normalizeNeighbours(tile, neighbours) {
    let normNeighbours = [];
    for (let i=1; i<=4; i++) {
        let newNeighbour = [];
        if (neighbours[i] == null) {
            continue;
        } else {
            newNeighbour[0] = neighbours[i][0];
            newNeighbour[1] = (4+neighbours[i][1]+(neighbours[i][2]?-tile[1]:tile[1]))%4;
            newNeighbour[2] = neighbours[i][2] != tile[2];
            if (tile[2]) {
                normNeighbours[(4-tile[1]+(i-1)+(i%2?2:0))%4+1] = newNeighbour;
            } else {
                normNeighbours[(tile[1]+(i-1))%4+1] = newNeighbour;
            }
        }
    }
    return normNeighbours;
}
function getPicture() {
    for (let y=0; y<picture.length; y++) {
        for (let x=0; x<picture[y].length; x++) {
            let tile = picture[y][x];
            let neighbours = normalizeNeighbours(tile, neighboursList[tile[0]]);
            if (neighbours[2] != null)
                picture[y][x+1] = neighbours[2];
            if (neighbours[3] != null)
                picture[y+1][x] = neighbours[3];
        }
    }
}
getPicture();
tiles = [];
input.forEach((a)=>{
    let tile = [];
    let split = a.split(':\n');
    let index = Number.parseInt(split[0].substr(5));
    split = split[1].split('\n');
    for (let i=1; i<split.length-1; i++) {
        tile[i-1]=split[i].substr(1, split[i].length-2);
    }
    tiles[index] = tile;
});

function rotateFull(tile, rotations) {
    let newTile = [];
    if (rotations == 0) {
        for (let i=0; i<tile.length; i++)
            newTile[i] = tile[i];
    } else if (rotations == 1) {
        for (let i=0; i<tile.length; i++)
            newTile[i] = tile.map(a=>a[i]).reverse().join('');
    } else if (rotations == 2) {
        for (let i=0; i<tile.length; i++)
            newTile[i] = tile[tile.length-i-1].split('').reverse().join('');
    } else if (rotations == 3) {
        for (let i=0; i<tile.length; i++)
            newTile[i] = tile.map(a=>a[a.length-i-1]).join('');
    }
    return newTile;
}

function flipFull(tile) {
    let newTile = [];
    for (let i=0; i<tile.length; i++)
        newTile[i] = tile[tile.length-i-1];
    return newTile;
}

var pictureText = [];
for (let y=0; y<picture.length; y++) {
    for (let x=0; x<picture[y].length; x++) {
        let tile = picture[y][x];
        tile[3] = tiles[tile[0]];
        if (tile[1]) tile[3] = rotateFull(tile[3], tile[1]);
        if (tile[2]) tile[3] = flipFull(tile[3]);
        for (let i=0; i<tile[3].length; i++) {
            if (pictureText[y*tile[3].length+i] == null) pictureText[y*tile[3].length+i] = '';
            pictureText[y*tile[3].length+i] += tile[3][i];
        }
    }
}
var monsterCoords = [[0,0], [1,1], [4,1], [5,0], [6,0], [7,1], [10,1], [11,0], [12,0], [13,1], [16,1], [17,0], [18,-1], [18,0], [19,0]]
function checkMonster(x,y) {
    var isMonster = true;
    monsterCoords.every(a=>pictureText[y+a[1]][x+a[0]]=='#');
}
var monsters = 0;
let i=0;
while (monsters == 0) {
    if (i==4) {
        pictureText = flipFull(pictureText);
        i=0;
    }
    pictureText = rotateFull(pictureText, i);
    for (let y=1; y<pictureText.length-1; y++) {
        for (let x=0; x<pictureText[y].length-19; x++) {
            if (monsterCoords.every(a=>['#','O'].includes(pictureText[y+a[1]][x+a[0]]))) {
                monsters++;
                monsterCoords.forEach(a=>pictureText[y+a[1]]=pictureText[y+a[1]].substr(0, x+a[0])+'O'+pictureText[y+a[1]].substr(x+a[0]+1));
            }
        }
    }
    i++;
}
console.log(`Answer 2: ${pictureText.join('').match(/#/g).length}`);
