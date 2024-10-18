// Slot Machine Constants
const ROWS = 3;
const COLS = 3;

const SYMBOLS_COUNT = {
    A: 2,
    B: 4,
    C: 6,
    D: 8
};

const SYMBOLS_VALUES = {
    A: 5,
    B: 4,
    C: 3,
    D: 2
};

// HTML Elements
const depositInput = document.getElementById("depositAmount");
const depositBtn = document.getElementById("depositBtn");
const linesInput = document.getElementById("lines");
const betInput = document.getElementById("betAmount");
const betBtn = document.getElementById("betBtn");
const resultSection = document.getElementById("result");
const row1 = document.getElementById("row1");
const row2 = document.getElementById("row2");
const row3 = document.getElementById("row3");
const playAgainBtn = document.getElementById("playAgainBtn");

// Variables
let balance = 0;
let lines = 1;
let betAmount = 0;

// Deposit Money
depositBtn.addEventListener("click", () => {
    const depositValue = parseFloat(depositInput.value);
    if (isNaN(depositValue) || depositValue <= 0) {
        resultSection.textContent = "Invalid deposit amount. Try again.";
    } else {
        balance = depositValue;
        resultSection.textContent = `You deposited $${balance}`;
    }
});

// Place Bet
betBtn.addEventListener("click", () => {
    const numberOfLines = parseInt(linesInput.value);
    const betValue = parseFloat(betInput.value);
    
    if (isNaN(betValue) || betValue <= 0 || isNaN(numberOfLines) || numberOfLines < 1 || numberOfLines > 3) {
        resultSection.textContent = "Invalid bet or lines. Try again.";
        return;
    }
    
    if (betValue * numberOfLines > balance) {
        resultSection.textContent = "Not enough balance.";
        return;
    }

    balance -= betValue * numberOfLines;
    lines = numberOfLines;
    betAmount = betValue;
    
    // Spin the slot machine
    const reels = spin();
    displayReels(reels);
    const winnings = checkWinnings(reels, betAmount, lines);
    balance += winnings;

    resultSection.textContent = `You won $${winnings}. Current balance: $${balance}`;
});

// Spin the reels
function spin() {
    const symbols = [];
    for (const [symbol, count] of Object.entries(SYMBOLS_COUNT)) {
        for (let i = 0; i < count; i++) {
            symbols.push(symbol);
        }
    }

    const reels = [];
    for (let i = 0; i < COLS; i++) {
        reels.push([]);
        const reelSymbols = [...symbols];
        for (let j = 0; j < ROWS; j++) {
            const randomIndex = Math.floor(Math.random() * reelSymbols.length);
            const selectedSymbol = reelSymbols[randomIndex];
            reels[i].push(selectedSymbol);
            reelSymbols.splice(randomIndex, 1);
        }
    }

    return reels;
}

// Display the reels on the front-end
function displayReels(reels) {
    row1.textContent = reels[0].join("  ");
    row2.textContent = reels[1].join("  ");
    row3.textContent = reels[2].join("  ");
}

// Check if the user won
function checkWinnings(reels, bet, lines) {
    let winnings = 0;
    
    for (let row = 0; row < lines; row++) {
        const symbols = reels.map(reel => reel[row]);
        if (symbols.every(symbol => symbol === symbols[0])) {
            winnings += bet * SYMBOLS_VALUES[symbols[0]];
        }
    }

    return winnings;
}

// Play Again Button
playAgainBtn.addEventListener("click", () => {
    depositInput.value = "";
    linesInput.value = "";
    betInput.value = "";
    row1.textContent = "-";
    row2.textContent = "-";
    row3.textContent = "-";
    resultSection.textContent = "New Game!";
});
