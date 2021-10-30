Rule:
0: 1 2
1: "a"
2: 1 3 | 3 1
3: "b"

Valid results (OR):
aab
aba

Other example:
0: 4 1 5
1: 2 3 | 3 2
2: 4 4 | 5 5
3: 4 5 | 5 4
4: "a"
5: "b"

a (2 3 | 3 2) b --4 --1 --5 --fazer na ordem 4,1 e 5
a ((4 4 | 5 5) 3 | 3 (4 4 | 5 5)) b --2 --depois fazer na ordem de novo e por ai vai
a ((4 4 | 5 5)( 4 5 | 5 4)) | ((4 5 | 5 4) (4 4 | 5 5)) b --3
a ((a a | b b)( a b | b a)) | ((a b | b a) (a a | b b)) b
a aa ab b
a aa ba b
a bb ab b
a bb ba b
a ab aa b
a ba aa b
a ab bb b
a ba bb b

-- resolver primeiro q tem pipe, recursivamente, e jogar na posicao 0.

--splitar o result acima por pipe, e eh a resposta com as masks
--criar array usando pop/push (???) pra saber os primeiros itens translated que devem ser incluidos no inicio e no fim das translations do meio


--dar replace (placeholder) de acordo com a chave (numero), e nao dar mais replace ate encontrar aspas (letra). Nao dar placeholder se for a ou b
-- pro caso do pipe, fazer 2 strings com placeholders
-- posso fazer isso recursivo, acabando a recursao quando o caracter tiver aspas
-- no final devolvo uma lista de masks (valid results)


-----------------------------------------------------------------------------------
const solve = async () => {
       let rules = new Map();
       const input = ['0: 4 1 5',
                        '1: 2 3 | 3 2',
                        '2: 4 4 | 5 5',
                        '3: 4 5 | 5 4',
                        '4: "a"',
                        '5: "b"'
                        ];
        const messages = ['ababbb',
                           'bababa',
                           'abbbab',
                           'aaabbb',
                           'aaaabbb'
                          ];
    try{        
                  
           input.forEach(x => {
                let aux = x.split(':');
                let values = aux[1].includes('|') ? 
                    aux[1].split('|').map(i => i.split(' ').filter(j => j != '')) : 
                    aux[1].split(' ').filter(i => i != '');
                rules.set(aux[0], values);
            });        
            return await convert(rules, rules.get('0'));
        }catch(e){
            console.log(e);
        }
}
const convert = (rules, ini) => {
   /* let value = 0;
    if(ini == "a" || ini == "b"){ //TODO ATIVA ESTA LOGICA PRA FAZER RECURSIVO
        return ini;
    }*/
    ini.map((item,idx) => {
        let value = "";
        if(!isNaN(item)){
            value = rules.get(item);
            if(value.length > 0 && value[0].constructor === Array){ //TODO TIRAR ISSO E FAEZR RECURSIVO
              value.forEach((v) => convert(rules, v));
            }
            ini[idx] = value;  
        }else{
           
        }
    });
    return ini;
}

solve().then((data) => console.log("data:",data)).catch((e) => console.log("error:" + e));

//PRAS POSICOES EM RULE0 QUE SEJAM LIST, DESMEMBRAR EM DIFERENTES RESPOSTS
