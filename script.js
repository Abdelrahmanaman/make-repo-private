class Cell {
    constructor(isMine = false, isRevealed = false, isFlagged = false, adjacentMines = 0) {
        this.isMine = isMine;
        this.isRevealed = isRevealed;
        this.isFlagged = isFlagged;
        this.adjacentMines = adjacentMines;
    }
}

class Minesweeper {
    constructor(gridSize = 9, numMines = 10) {
        this.gridSize = gridSize;
        this.numMines = numMines;
        this.board = [];
        this.gameStarted = false;
        this.gameOver = false;
        this.gameBoardElement = document.getElementById('gameBoard');
        this.resetButton = document.getElementById('resetButton');
        this.createBoard();
        this.renderBoard();
        this.resetButton.addEventListener('click', this.resetGame.bind(this));
    }

    createBoard() {
        this.board = [];
        for (let i = 0; i < this.gridSize * this.gridSize; i++) {
            this.board.push(new Cell());
        }
    }

    placeMines() {
        let minesPlaced = 0;
        while (minesPlaced < this.numMines) {
            let randomIndex = Math.floor(Math.random() * (this.gridSize * this.gridSize));
            if (!this.board[randomIndex].isMine) {
                this.board[randomIndex].isMine = true;
                minesPlaced++;
            }
        }
    }

    calculateAdjacentMines() {
        for (let i = 0; i < this.gridSize * this.gridSize; i++) {
            if (this.board[i].isMine) continue;

            let adjacentMines = 0;
            for (let j = -1; j <= 1; j++) {
                for (let k = -1; k <= 1; k++) {
                    let neighborIndex = i + j * this.gridSize + k;
                    if (
                        neighborIndex >= 0 &&
                        neighborIndex < this.gridSize * this.gridSize &&
                        neighborIndex !== i &&
                        this.board[neighborIndex].isMine
                    ) {
                        adjacentMines++;
                    }
                }
            }
            this.board[i].adjacentMines = adjacentMines;
        }
    }

    renderBoard() {
        this.gameBoardElement.innerHTML = '';
        for (let i = 0; i < this.gridSize * this.gridSize; i++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.dataset.index = i;

            if (this.board[i].isRevealed) {
                cell.classList.add('revealed');
                if (this.board[i].isMine) {
                    cell.classList.add('mine');
                    cell.textContent = '💣';
                } else if (this.board[i].adjacentMines > 0) {
                    cell.classList.add('number');
                    cell.textContent = this.board[i].adjacentMines;
                }
            } else if (this.board[i].isFlagged) {
                cell.classList.add('flag');
                cell.textContent = '🚩';
            } else {
                cell.classList.add('hidden');
            }

            cell.addEventListener('click', this.handleCellClick.bind(this));
            cell.addEventListener('contextmenu', this.handleRightClick.bind(this));
            this.gameBoardElement.appendChild(cell);
        }
    }

    handleCellClick(event) {
        if (this.gameOver) return;

        const cell = event.target;
        const index = parseInt(cell.dataset.index);

        if (!this.gameStarted) {
            this.gameStarted = true;
            this.placeMines();
            this.calculateAdjacentMines();
        }

        if (this.board[index].isMine) {
            this.gameOver = true;
            this.revealAllMines();
            alert('Game Over! You hit a mine.');
        } else if (!this.board[index].isRevealed) {
            this.revealCell(index);
        }
    }

    handleRightClick(event) {
        event.preventDefault();
        if (this.gameOver) return;

        const cell = event.target;
        const index = parseInt(cell.dataset.index);

        if (!this.board[index].isRevealed) {
            this.board[index].isFlagged = !this.board[index].isFlagged;
            this.renderBoard();
        }
    }

    revealCell(index) {
        if (this.board[index].isRevealed || this.board[index].isFlagged) return;

        this.board[index].isRevealed = true;

        if (this.board[index].adjacentMines === 0) {
            for (let j = -1; j <= 1; j++) {
                for (let k = -1; k <= 1; k++) {
                    let neighborIndex = index + j * this.gridSize + k;
                    if (
                        neighborIndex >= 0 &&
                        neighborIndex < this.gridSize * this.gridSize &&
                        neighborIndex !== index
                    ) {
                        this.revealCell(neighborIndex);
                    }
                }
            }
        }

        this.renderBoard();
    }

    revealAllMines() {
        for (let i = 0; i < this.gridSize * this.gridSize; i++) {
            if (this.board[i].isMine) {
                this.board[i].isRevealed = true;
            }
        }
        this.renderBoard();
    }

    resetGame() {
        this.gameOver = false;
        this.gameStarted = false;
        this.createBoard();
        this.renderBoard();
    }
}

const game = new Minesweeper();
