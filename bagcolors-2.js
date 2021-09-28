process.stdin.resume();
process.stdin.setEncoding('utf8');

const input = ['shiny gold bags contain 2 dark red bags',
'dark red bags contain 2 dark orange bags',
'dark orange bags contain 2 dark yellow bags',
'dark yellow bags contain 2 dark green bags',
'dark green bags contain 2 dark blue bags',
'dark blue bags contain 2 dark violet bags',
'dark violet bags contain no other bags'];

/*['light red bags contain 1 bright white bags, 2 muted yellow bags',
'dark orange bags contain 3 bright white bags, 4 muted yellow bags',
'bright white bags contain 1 shiny gold bags',
'muted yellow bags contain 2 shiny gold bags, 9 faded blue bags',
'shiny gold bags contain 1 dark olive bags, 2 vibrant plum bags',
'dark olive bags contain 3 faded blue bags, 4 dotted black bags',
'vibrant plum bags contain 5 faded blue bags, 6 dotted black bags',
'faded blue bags contain no other bags',
'dotted black bags contain no other bags'];*/

/* ['shiny gold bags contain 2 dark red bags',
'dark red bags contain 2 dark orange bags',
'dark orange bags contain 2 dark yellow bags',
'dark yellow bags contain 2 dark green bags',
'dark green bags contain 2 dark blue bags',
'dark blue bags contain 2 dark violet bags',
'dark violet bags contain no other bags'];*/

const flatMap = (f, arr) => arr.reduce((x, y) => [...x, ...f(y)], []);

const rules = input.map(x => x.split("contain"));

let total = 0; 
let sum_pai = 0;

function getChildren(arrayContains){
    let totalColors = 0;
    let filhos = [];
    let resultado = [];
    arrayContains[0].forEach(item => {
        item = item.trim();
        let num = parseInt(item.substring(0))
        if(!isNaN(num)){
          let color = item.substring(2);
          totalColors += num;
          filhos.push(num+"|"+color);
        }       
    });
    resultado.push(totalColors);
    resultado.push(filhos);
    return resultado;
}

function find(numParent, value, first_level) {
    console.log(value + " - " + numParent);
    let arr = rules;
    let result = arr.filter(rule => rule[0].includes(value)).map(x => x[1].split(","));
   
    let children = getChildren(result);

    let totColors = parseInt(children[0]);
    if(totColors > 0){
       console.log(value + " tem " + totColors);
       total+=(numParent*totColors);
       
       children[1].forEach(child => {
           let aux = child.split("|");
           find(parseInt(aux[0]), aux[1], false);
       });
       
    }else{
       console.log(value + " sem bolsa dentro");
           // count += parseInt(numParent);
    } 
}
find(1, 'shiny gold bags', true);



console.log("***** count - " + total);
