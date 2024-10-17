//1 Deposit money
//2 Determine number of lines to bet on
//3 Collect a bet amount
//4 Spin the slot machine
//5 Check if the user won
//6 Give the use their winnings
//7 play again

const prompt = require("prompt-sync")();


const ROWS = 3;
const COLS = 3;

const SYMBOL_COUNT = {
    "A" : 2,
    "B" : 4,
    "C" : 6,
    "D" : 8
}


const SYMBOL_VALUES = {
    "A" : 5,
    "B" : 4,
    "C" : 3,
    "D" : 2
}



const deposit = () => {
    while (true){
    const depositAmount = prompt("Enter a deposit amount: ");
    const numberDepositAmount = parseFloat(depositAmount);

    if (isNaN(numberDepositAmount) || numberDepositAmount <=0) {
        console.log("Invalid deposit amount, try again.");

    }else {
        return numberDepositAmount;
    }

    }
}


const getNumberofLines = () => {

    while (true){
        const lines = prompt("Enter the number of lines  to bet on (1-3): ");
        const numberofLines = parseFloat(lines);
    
        if (isNaN(numberofLines) || numberofLines <=0 || numberofLines > 3) {
            console.log("Invalid number of lines, try again.");
    
        }else {
            return numberofLines;
        }
    
        }
}


const getBet = (balance, lines) => {
    while (true){
        const bet = prompt("Enter the bet per line: ");
        const numberBet = parseFloat(bet);
    
        if (isNaN(numberBet) || numberBet <=0 || numberBet > balance / lines) {
            console.log("Invalid bet, try again.");
    
        }else {
            return numberBet;
        }
    
        }

}


const spin = () => {
    const symbols = [];
 
}

let balance  = deposit();
const numberofLines = getNumberofLines();
const bet = getBet(balance, numberofLines);

