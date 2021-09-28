

const solve2 = (startingSeq, n) => {
  const history = new Map();
  let last = null;
  for (let i = 0; i < startingSeq.length; i += 1) {
    const num = startingSeq[i];
    history.set(num, [i]);
    last = num;
  }

  let count = startingSeq.length;
  while (count < n) {
    const positions = history.get(last);
    if (positions.length === 1) {
      const zeroPositions = history.get(0);
      zeroPositions.push(count);
      if (zeroPositions.length > 2)
        zeroPositions.shift();
      last = 0;
    } else {
      const [ a, b ] = positions;
      const newNum = b - a;
      if (history.has(newNum)) {
        const newNumPositions = history.get(newNum);
        newNumPositions.push(count);
        if (newNumPositions.length > 2)
          newNumPositions.shift();
      } else {
        history.set(newNum, [ count ]);
      }
      last = newNum;
    }
    count += 1;
  }
  return last;
};

console.log(solve2([15,12,0,14,3,1], 30000000)); // 4
