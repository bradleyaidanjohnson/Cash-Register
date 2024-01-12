let price = 19.5;
let cid = [["PENNY", 0.5], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 0], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]];
const changeDescriptions = {
  "PENNY": [0.01, 0.0],
  "NICKEL": [0.05, 0.0],
  "DIME": [0.10, 0.0],
  "QUARTER": [0.25, 0.0],
  "ONE": [1, 0.0],
  "FIVE": [5, 0.0],
  "TEN": [10, 0.0],
  "TWENTY": [20, 0.0],
  "ONE HUNDRED": [100, 0.0]
}

const cashInput = document.getElementById("cash");
const changeDue = document.getElementById("change-due");
const purchaseButton = document.getElementById("purchase-btn");
const princeInput = document.getElementById("price-display");

princeInput.placeholder = price;

const cashInDrawer = cid.reduce((a, arr) => parseFloat((a + arr[1]).toFixed(2)), 0);
/*console.log(cashInDrawer);*/
const changeAvailable = (change) => {
  if(cashInDrawer < change) {
    return false;
  } else {
    let changedLoop = true;
    let changeToPay = change;
    while (changedLoop && changeToPay > 0) {
      changedLoop = false;
      block:
        for (let i = cid.length - 1; i > -1; i--) {
          /* console.log(changeDescriptions[cid[i][0]][0]);
          console.log(changeToPay);
          console.log(cid[i][1]); */
          if (Math.round(changeDescriptions[cid[i][0]][0] * 100) <= Math.round(changeToPay * 100) && Math.round(cid[i][1] * 100) > 0) {
            changeToPay -= changeDescriptions[cid[i][0]][0];
            cid[i][1] = parseFloat((cid[i][1] - changeDescriptions[cid[i][0]][0]).toFixed(2));
            changeDescriptions[cid[i][0]][1] += changeDescriptions[cid[i][0]][0];
            changedLoop = true;
            break block;
          }
        }
    }
    if (changeToPay > 0) {
      return false;
    }
  }
  return true;
}

const changeDetails = (change) => {
  let changeString = "";
  const reversedCid = cid.reverse();
  reversedCid.forEach((element) => {
    if (changeDescriptions[element[0]][0] <= parseFloat((change).toFixed(2))) {
      changeString += `${element[0]}: $${parseFloat((changeDescriptions[element[0]][1]).toFixed(2))} `
    }
  })
  changeString = changeString.slice(0, -1);
  return changeString;
}

purchaseButton.addEventListener("click", () => {
  if(princeInput.value) {
    price = parseFloat(princeInput.value);
  }
  
  const parsedInputCash = parseFloat(cashInput.value);
  const change = parseFloat((parsedInputCash - price).toFixed(2));
  if (parsedInputCash < price) {
    alert("Customer does not have enough money to purchase the item");
  } else if (parsedInputCash === price) {
    changeDue.innerText = "No change due - customer paid with exact cash";
  } else {
    if (!changeAvailable(change)) {
      changeDue.innerText = "Status: INSUFFICIENT_FUNDS";
    } else if (cashInDrawer === change) {
      changeDue.innerText = `Status: CLOSED ${changeDetails(change)}`;
    } else {
      changeDue.innerText = `Status: OPEN ${changeDetails(change)}`;
    }
  }
})