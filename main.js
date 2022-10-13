"use strict";

const gameBoard = (() => {
    const cell = document.querySelectorAll(".cell");
    const status = document.querySelector(".status");
    const rstBtn = document.querySelector(".restart");

    let board = ["", "", "", "", "", "", "", "", ""];

    let currentPlayer = "X";
    let running = false;

    const winConditions = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6]
    ];
    const initializeGame = () => {

        cell.forEach(cells => cells.addEventListener("click", cellClicked));
        rstBtn.addEventListener("click", gameRestart);
        status.textContent = `${currentPlayer}'s turn`;
        running = true;
    }

    const cellClicked = () => {
        const cellIndex = this.getAttribute("cellIndex");
    

        if(board[cellIndex] != "" || !running) {
        return;
        }
        updateCell(this, cellIndex);
        checkWinner();
    }
    const updateCell = (cellValue, index) => {
        board[index] = currentPlayer;
        cellValue.textContent = currentPlayer;
    }
    const changePlayer = () => {
        currentPlayer = (currentPlayer == "X") ? "O" : "X";
        status.textContent = `${currentPlayer}'s turn`;
    }

    const checkWinner = () => {
        let roundWon = false;

        for(let i = 0; i < winConditions.length; i++) {
            const condition = winConditions[i];
            const cellA = board[condition[0]];
            const cellB = board[condition[1]];
            const cellC = board[condition[2]];
         
            if(cellA == "" || cellB == "" || cellC == "") {
                continue;
            }
            if(cellA == cellB && cellB == cellC) {
                roundWon = true;
                break;
            }
         }
         if(roundWon) {
            status.textContent = `${currentPlayer} Wins!`;
            running = false;
         }
         else if (!board.includes("")) {
            status.textContent = `Draw`;
            running = false;
         }
         else {
            changePlayer();
         }
    }
        const gameRestart = () => {
            currentPlayer = "X";
            board = ["", "", "", "", "", "", "", "", ""];
            status.textContent = `${currentPlayer}'s turn`;
            cell.forEach(cells => cells.textContent = "");
            running = true;
        }

        initializeGame();

    return {changePlayer, checkWinner, initializeGame, cellClicked, updateCell, gameRestart};
})();