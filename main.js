const statusDiv = document.querySelector('.status');
const resetDiv = document.querySelector('.reset');
const cellDivs = document.querySelectorAll('.game-cell');

const xSymbol = '✖';
const oSymbol = '○';

let gameIsLive = true;
let xIsNext = true;
let winner = true;

// functions

const letterToSymbol = (letter) => letter === 'x' ? xSymbol : oSymbol ;

const handWin = (letter) => {
    gameIsLive = false;
    winner = letter;
    if(winner === 'x'){
        statusDiv.innerHTML = `${letterToSymbol(winner)} has Won!`;
    } else {
        statusDiv.innerHTML = `<span> ${letterToSymbol(winner)} has Won!</span> `;
    }
}

const checkGameStatus = () => {
    const topLeft = cellDivs[0].classList[1];
    const topMiddle = cellDivs[1].classList[1];
    const topRight = cellDivs[2].classList[1];
    const middleLeft = cellDivs[3].classList[1];
    const middleMiddle = cellDivs[4].classList[1];
    const middleRight = cellDivs[5].classList[1];
    const bottomLeft = cellDivs[6].classList[1];
    const bottomMiddle = cellDivs[7].classList[1];
    const bottomRight = cellDivs[8].classList[1];

    // checking Winner 
    if(topLeft && topLeft===topMiddle && topLeft===topRight){
        
        handWin(topLeft);
        cellDivs[0].classList.add('won');
        cellDivs[1].classList.add('won');
        cellDivs[2].classList.add('won');

    } else if(middleLeft && middleLeft===middleMiddle && middleLeft === middleRight){

        handWin(middleLeft);
        cellDivs[3].classList.add('won');
        cellDivs[4].classList.add('won');
        cellDivs[5].classList.add('won');

    } else if (bottomLeft && bottomLeft === bottomMiddle && bottomLeft === bottomRight){

        handWin(bottomLeft);
        cellDivs[6].classList.add('won');
        cellDivs[7].classList.add('won');
        cellDivs[8].classList.add('won');

    } else if (topLeft && topLeft=== middleMiddle && topLeft === bottomRight){
        
        handWin(topLeft);
        cellDivs[0].classList.add('won');
        cellDivs[4].classList.add('won');
        cellDivs[8].classList.add('won');

    } else if(topRight && topRight === middleMiddle && topRight === bottomLeft){
        
        handWin(topRight);
        cellDivs[2].classList.add('won');
        cellDivs[4].classList.add('won');
        cellDivs[6].classList.add('won');

    } else if(topLeft && topLeft === middleLeft && topLeft === bottomLeft){
       
        handWin(topLeft);
        cellDivs[0].classList.add('won');
        cellDivs[3].classList.add('won');
        cellDivs[6].classList.add('won');

    } else if(topMiddle && topMiddle === middleMiddle && topMiddle === bottomMiddle){
        
        handWin(topMiddle);
        cellDivs[1].classList.add('won');
        cellDivs[4].classList.add('won');
        cellDivs[7].classList.add('won');

    } else if(topRight && topRight === middleRight && topRight === bottomRight){
        
        handWin(topRight);
        cellDivs[2].classList.add('won');
        cellDivs[5].classList.add('won');
        cellDivs[8].classList.add('won');

    } else if( topLeft && topMiddle && topRight && middleLeft && middleMiddle && middleRight && bottomLeft && bottomMiddle && bottomRight){
        gameIsLive = false;
        statusDiv.innerHTML = 'Tied!!'
    } else {
        xIsNext = !xIsNext;
        if(xIsNext) {
            statusDiv.innerHTML = `${xSymbol} is next`;
        } else {
            statusDiv.innerHTML = `<span>${oSymbol} is next</span>`
        }
    }
    console.log(winner);
};

// event Handlers
const handleReset = () => {
    xIsNext = true;
    statusDiv.innerHTML = `${xSymbol} is next`;
    winner = null;
    for(const cellDiv of cellDivs){
        cellDiv.classList.remove('x');
        cellDiv.classList.remove('o');
        cellDiv.classList.remove('won');
    }
    gameIsLive = true;
}

const handleCellClick = (e) => {

    const classList = e.target.classList;

    if( !gameIsLive || classList[1] == 'x' || classList[1] == 'o') {
        return;
    }

    if (xIsNext){
        classList.add('x');
        checkGameStatus();
    } else {
        classList.add('o');
        checkGameStatus();
    }
}


// event listeners
resetDiv.addEventListener('click',handleReset);

for(const cellDiv of cellDivs){
    cellDiv.addEventListener('click',handleCellClick);
}
