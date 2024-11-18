// Initialize game variables
const board = document.getElementById('board');
const statusText = document.getElementById('status');
const resetButton = document.getElementById('reset');
const resultScreen = document.getElementById('resultScreen');
const resultMessage = document.getElementById('resultMessage');
const newGameButton = document.getElementById('newGame');

let currentPlayer = 'X';
let gameActive = true;
let gameState = Array(9).fill(''); // Represents the 9 cells on the board

// Winning combinations
const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6]             // Diagonals
];

// Initialize the board
function createBoard() {
    board.innerHTML = '';
    gameState.forEach((cell, index) => {
        const cellDiv = document.createElement('div');
        cellDiv.classList.add('cell');
        cellDiv.dataset.index = index;
        cellDiv.addEventListener('click', handleCellClick);
        board.appendChild(cellDiv);
    });
}

// Handle cell click
function handleCellClick(e) {
    const cell = e.target;
    const cellIndex = cell.dataset.index;

    // If the cell is already taken or game is not active, do nothing
    if (gameState[cellIndex] !== '' || !gameActive) return;

    // Update cell and game state
    gameState[cellIndex] = currentPlayer;
    cell.textContent = currentPlayer;
    cell.classList.add('taken');

    // Check for win or draw
    if (checkWin()) {
        showResult(`Player ${currentPlayer} Wins!`);
        return;
    }

    if (gameState.every(cell => cell !== '')) {
        showResult(`It's a Draw!`);
        return;
    }

    // Switch player
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    statusText.textContent = `Player ${currentPlayer}'s Turn`;
}

// Check for a win
function checkWin() {
    return winningCombinations.some(combination => {
        return combination.every(index => gameState[index] === currentPlayer);
    });
}

// Show result screen
function showResult(message) {
    gameActive = false;
    resultMessage.textContent = message;
    resultScreen.style.display = 'flex';
}

// Reset game
resetButton.addEventListener('click', resetGame);
newGameButton.addEventListener('click', resetGame);

function resetGame() {
    currentPlayer = 'X';
    gameActive = true;
    gameState.fill('');
    statusText.textContent = `Player X's Turn`;
    resultScreen.style.display = 'none';
    createBoard();
}

// Initialize the game
createBoard();
