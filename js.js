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
        const xCount = solution.reduce((count, index) => count + (board.gameBoard[index] === 'x' ? 1 : 0), 0);
        const oCount = solution.reduce((count, index) => count + (board.gameBoard[index] === 'o' ? 1 : 0), 0);
        console.log(xCount)
        console.log()
        console.log(oCount)
        if (xCount === 3) {
            console.log("x wins");
            return true; // Exit the function if 'x' wins
        } else if (oCount === 3) {
            console.log("o wins");
            return true; // Exit the function if 'o' wins
        }
    }
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


(function () {
    const playerOne = prompt("Enter player one name: ");
    const playerOneMarker = prompt("Enter p1 marker: ");
    const playerTwo = prompt("Enter player two name: ");
    const playerTwoMarker = prompt("Enter p2 marker: ");

    game = startGame(playerOne, playerOneMarker, playerTwo, playerTwoMarker);

    while (!checkBoard(game.playerBoard)) {
        playerOneChoice = prompt("P1 place: ")
        placeMarker(game.playerOne.marker, game.playerBoard, playerOneChoice)
        playerTwoChoice = prompt("P2 place: ")
        placeMarker(game.playerTwo.marker, game.playerBoard, playerTwoChoice)
    }

})();