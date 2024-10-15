function gameBoard() {
    let gameBoard = [
        '','','',
        '','','',
        '','',''
    ];

    return {gameBoard};
}

function player(name, marker) {
    return {name, marker};
}

function startGame(playerOneName, playerOneMarker, playerTwoName, playerTwoMarker) {
    const playerOne = player(playerOneName, playerOneMarker);
    const playerTwo = player(playerTwoName, playerTwoMarker);
    const playerBoard = gameBoard();
    return {playerOne, playerTwo, playerBoard};
}

function placeMarker(marker, board, position){
    board.gameBoard[position] = marker
}


function checkBoard(board) {
    const gameSolutions = solutions();
    
    for (const solution of Object.values(gameSolutions)) {
        const xCount = solution.reduce((count, index) => count + (board.gameBoard[index] === 'X' ? 1 : 0), 0);
        const oCount = solution.reduce((count, index) => count + (board.gameBoard[index] === 'O' ? 1 : 0), 0);
        if (xCount === 3) {
            displayWinner("X's");
            seeWinner(solution);
            return true; 
        } else if (oCount === 3) {
            displayWinner("O's");
            seeWinner(solution);
            return true;
        }
    }
}

function seeWinner(solution){
    const buttons = getGameBoardButton();
    solution.forEach(index => {
        buttons.posList[index].style.cssText = `
            background-color: lightBlue;
        `;

    })
}

function displayWinner(winner){
    const container = document.querySelector(".winnerMessage");
    container.textContent = `${winner} wins`;
}

function resetWinner(){
    const container = document.querySelector(".winnerMessage");
    container.textContent = '';
}

function solutions() {
    const solutionOne = [0, 1 ,2]
    const solutionTwo = [3, 4 ,5]
    const solutionThree = [6, 7 ,8]
    const solutionFour = [0, 3 ,4]
    const solutionFive = [1, 4 ,7]
    const solutionSix = [2, 5 ,8]
    const solutionSeven = [0, 4 ,8]
    const solutionEight = [2, 4 ,6]

    return {solutionOne, solutionTwo,
            solutionThree, solutionFour,
            solutionFive, solutionSix,
            solutionSeven, solutionEight
    }
}


function getGameBoardButton(){
    const posOne = document.querySelector(".bOne");
    const posTwo = document.querySelector(".bTwo");
    const posThree = document.querySelector(".bThree");
    const posFour = document.querySelector(".bFour");
    const posFive = document.querySelector(".bFive");
    const posSix = document.querySelector(".bSix");
    const posSeven = document.querySelector(".bSeven");
    const posEight = document.querySelector(".bEight");
    const posNine = document.querySelector(".bNine");

    const posList = [posOne, posTwo, posThree,
                     posFour, posFive, posSix,
                     posSeven, posEight, posNine
    ];

    return {posOne, posTwo, posThree,
            posFour, posFive, posSix,
            posSeven, posEight, posNine, posList
    }
}

function displayBoard(board){
    let buttons = getGameBoardButton()
    for (let i = 0; i < buttons.posList.length; i++) {
        board.gameBoard[i] = buttons.posList[i].textContent
    }
}


function updateBoard(board){
    displayBoard(board);
    checkBoard(board);
}

function resetBoard(board){
    let buttons = getGameBoardButton()
    for (let i = 0; i < buttons.posList.length; i++) {
        board.gameBoard[i] = '';
        buttons.posList[i].textContent = '';
        buttons.posList[i].style.backgroundColor = '';
    }
}

function displayTurn(marker){
    const turnMessage = document.querySelector(".turnMessage");
    turnMessage.textContent = `${marker}'s Turn`;
}

function displayDraw(){
    const turnMessage = document.querySelector(".turnMessage");
    turnMessage.textContent = "Draw";
}

function lockGame(){
    const gameLock= document.querySelector(".lockGame");
    gameLock.style.zIndex = '2';
}

function resetLock(){
    const gameLock= document.querySelector(".lockGame");
    gameLock.style.zIndex = '-1';
}

function getRoundNumber(){
    return 0
}

const startButton = document.querySelector("#startGame");
const resetButton = document.querySelector("#resetGame")

const game = startGame('bob', 'X', 'jose', 'O');

function playGame(){
    const buttons = getGameBoardButton();
    let round = 0;
    buttons.posList.forEach(button => {
        button.addEventListener('click', () => {
            if (!button.textContent) {
                if (round % 2 === 0){
                    displayTurn(game.playerTwo.marker)
                    button.textContent = game.playerOne.marker;
                    updateBoard(game.playerBoard);
                } else {
                    displayTurn(game.playerOne.marker)
                    button.textContent = game.playerTwo.marker;
                    updateBoard(game.playerBoard);
                }
                round ++;
                if (checkBoard(game.playerBoard)){
                    lockGame();
                }
                if (!checkBoard(game.playerBoard) && round === 9){
                    displayDraw();
                }
            }
        })
    })
}

startButton.addEventListener('click', () => {
    playGame();
})

resetButton.addEventListener('click', () => {
    resetBoard(game.playerBoard);
    resetWinner();
    resetLock();
    playGame();
})


