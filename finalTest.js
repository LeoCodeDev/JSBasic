// {(b[1]/matrix[b[0]]) - (a[1]/matrix[a[0]])}
const matrix = {
  'PENNY': 0.01,
  'NICKEL': 0.05,
  'DIME': 0.1,
  'QUARTER': 0.25,
  'ONE': 1,
  'FIVE': 5,
  'TEN': 10,
  'TWENTY': 20,
  "ONE HUNDRED": 100,
};

function checkCashRegister(price, cash, cid) {
  const cashRegister = cid
    .sort((a, b) => matrix[b[0]] - matrix[a[0]])
    .reduce((acc, [key, value]) => {
      acc[key] = { amount: value, pices: Math.round(value / matrix[key]) }
      return acc;
    }, {});

  let totalInRegister = 0;

  for(let bucks in cashRegister){
    totalInRegister += cashRegister[bucks].amount
  }
  
  let changeAmount = cash - price;
  let outPut = { status: "", change: [] };


  for (let bucks in cashRegister) {
    let denomination = (
      cashRegister[bucks].amount / cashRegister[bucks].pices
    )

    if(denomination < 1){
      denomination.toFixed(2)
    }

      console.log(changeAmount,denomination, cashRegister[bucks].pices, changeAmount >= denomination)
    if (changeAmount >= denomination) {
      let i = Math.round(changeAmount % denomination);
      let changeValue = 0;
      for (i;
        i > 0 && cashRegister[bucks].pices > 0;
        cashRegister[bucks].pices--, i--
      ) {
        changeAmount = (changeAmount - denomination).toFixed(2)
        changeValue += Number(denomination);
        if (cashRegister[bucks].pices == 0)
          outPut.change.push([bucks, changeValue]);
      }
    }
  }

  if (totalInRegister < changeAmount) {
    outPut.status = "INSUFFICIENT_FUNDS";
    outPut.change = [];
  } else if (totalInRegister === changeAmount) {
    outPut.status = "CLOSED";
  } else {
    outPut.status = "OPEN";
  }

  return outPut;
}

console.log(
  checkCashRegister(3.26, 100, [
    ["PENNY", 1.01],
    ["NICKEL", 2.05],
    ["DIME", 3.1],
    ["QUARTER", 4.25],
    ["ONE", 90],
    ["FIVE", 55],
    ["TEN", 20],
    ["TWENTY", 60],
    ["ONE HUNDRED", 100],
  ])
);