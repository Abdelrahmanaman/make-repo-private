const gameBoard = document.getElementById('gameBoard');
const resetButton = document.getElementById('resetButton');

const gridSize = 9;
const numMines = 10;

let board = [];
let gameStarted = false;
let gameOver = false;

// Create the game board
function createBoard() {
    board = [];
    for (let i = 0; i < gridSize * gridSize; i++) {
        board.push({
            isMine: false,
            isRevealed: false,
            isFlagged: false,
            adjacentMines: 0
        });
    }
}

// Place mines randomly
function placeMines() {
    let minesPlaced = 0;
    while (minesPlaced < numMines) {
        let randomIndex = Math.floor(Math.random() * (gridSize * gridSize));
        if (!board[randomIndex].isMine) {
            board[randomIndex].isMine = true;
            minesPlaced++;
        }
    }
}

// Calculate the number of adjacent mines for each cell
function calculateAdjacentMines() {
    for (let i = 0; i < gridSize * gridSize; i++) {
        if (board[i].isMine) continue;

        let adjacentMines = 0;
        for (let j = -1; j <= 1; j++) {
            for (let k = -1; k <= 1; k++) {
                let neighborIndex = i + j * gridSize + k;
                if (
                    neighborIndex >= 0 &&
                    neighborIndex < gridSize * gridSize &&
                    neighborIndex !== i &&
                    board[neighborIndex].isMine
                ) {
                    adjacentMines++;
                }
            }
        }
        board[i].adjacentMines = adjacentMines;
    }
}

// Render the game board
function renderBoard() {
    gameBoard.innerHTML = '';
    for (let i = 0; i < gridSize * gridSize; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.dataset.index = i;

        if (board[i].isRevealed) {
            cell.classList.add('revealed');
            if (board[i].isMine) {
                cell.classList.add('mine');
                cell.textContent = '💣';
            } else if (board[i].adjacentMines > 0) {
                cell.classList.add('number');
                cell.textContent = board[i].adjacentMines;
            }
        } else if (board[i].isFlagged) {
            cell.classList.add('flag');
            cell.textContent = '🚩';
        } else {
            cell.classList.add('hidden');
        }

        cell.addEventListener('click', handleCellClick);
        cell.addEventListener('contextmenu', handleRightClick);
        gameBoard.appendChild(cell);
    }
}

// Handle cell click
function handleCellClick(event) {
    if (gameOver) return;

    const cell = event.target;
    const index = parseInt(cell.dataset.index);

    if (!gameStarted) {
        gameStarted = true;
        placeMines();
        calculateAdjacentMines();
    }

    if (board[index].isMine) {
        gameOver = true;
        revealAllMines();
        alert('Game Over! You hit a mine.');
    } else if (!board[index].isRevealed) {
        revealCell(index);
    }
}

// Handle right click (flag/unflag)
function handleRightClick(event) {
    event.preventDefault();
    if (gameOver) return;

    const cell = event.target;
    const index = parseInt(cell.dataset.index);

    if (!board[index].isRevealed) {
        board[index].isFlagged = !board[index].isFlagged;
        renderBoard();
    }
}

// Reveal a cell and its empty neighbors recursively
function revealCell(index) {
    if (board[index].isRevealed || board[index].isFlagged) return;

    board[index].isRevealed = true;

    if (board[index].adjacentMines === 0) {
        for (let j = -1; j <= 1; j++) {
            for (let k = -1; k <= 1; k++) {
                let neighborIndex = index + j * gridSize + k;
                if (
                    neighborIndex >= 0 &&
                    neighborIndex < gridSize * gridSize &&
                    neighborIndex !== index
                ) {
                    revealCell(neighborIndex);
                }
            }
        }
    }

    renderBoard();
}

// Reveal all mines after game over
function revealAllMines() {
    for (let i = 0; i < gridSize * gridSize; i++) {
        if (board[i].isMine) {
            board[i].isRevealed = true;
        }
    }
    renderBoard();
}

// Reset the game
function resetGame() {
    gameOver = false;
    gameStarted = false;
    createBoard();
    renderBoard();
}

// Initialize the game
createBoard();
renderBoard();

resetButton.addEventListener('click', resetGame);
