const solve = async () => {
const input = 
['153',
'17',
'45',
'57',
'16',
'147',
'39',
'121',
'75',
'70',
'85',
'134',
'128',
'115',
'51',
'139',
'44',
'65',
'119',
'168',
'122',
'72',
'105',
'31',
'103',
'89',
'154',
'114',
'55',
'25',
'48',
'38',
'132',
'157',
'84',
'71',
'113',
'143',
'83',
'64',
'109',
'129',
'120',
'100',
'151',
'79',
'125',
'22',
'161',
'167',
'19',
'26',
'118',
'142',
'4',
'158',
'11',
'35',
'56',
'18',
'40',
'7',
'150',
'99',
'54',
'152',
'60',
'27',
'164',
'78',
'47',
'82',
'63',
'46',
'91',
'32',
'135',
'3',
'108',
'10',
'159',
'127',
'69',
'110',
'126',
'133',
'28',
'15',
'104',
'138',
'160',
'98',
'90',
'144',
'1',
'2',
'92',
'41',
'86',
'66',
'95',
'12'
];/*
['16',
'10',
'15',
'5',
'1',
'11',
'7',
'19',
'6',
'12',
'4'
];*/
  let sortedInput = input.map(x => parseInt(x)).sort((a, b) => a - b);
  sortedInput.unshift(0);
  sortedInput.push(parseInt(sortedInput[sortedInput.length - 1]) + 3);
  try{
    return await addArrangement(sortedInput);
  }catch(e){
    console.log(e);
  }
  
}


const addArrangement = (arr, idx = 0, memo = {}) => {

  if(idx in memo){
    return memo[idx];
  }
  if(idx === arr.length - 1){
    return 1;
  }

  let count = 0;
  var current = arr[idx];
  var next = arr[idx+1];
  var twoNext = arr[idx+2];
  var threeNext = arr[idx+3];

  if(next && (next - current <= 3)){
     count += addArrangement(arr, idx+1, memo);
  }
  if(twoNext && (twoNext - current <= 3)){
     count += addArrangement(arr, idx+2, memo);
  }
  if(threeNext && (threeNext - current <= 3)){
     count += addArrangement(arr, idx+3, memo);
  }
  memo[idx] = count;
  return count;      
}
   
solve().then((data) => console.log(data)).catch((e) => console.log(e));
