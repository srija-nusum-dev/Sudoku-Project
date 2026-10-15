const board = [
    [5, 3, 0, 0, 7, 0, 0, 0, 0],
    [6, 0, 0, 1, 9, 5, 0, 0, 0],
    [0, 9, 8, 0, 0, 0, 0, 6, 0],

    [8, 0, 0, 0, 6, 0, 0, 0, 3],
    [4, 0, 0, 8, 0, 3, 0, 0, 1],
    [7, 0, 0, 0, 2, 0, 0, 0, 6],

    [0, 6, 0, 0, 0, 0, 2, 8, 0],
    [0, 0, 0, 4, 1, 9, 0, 0, 5],
    [0, 0, 0, 0, 8, 0, 0, 7, 9]
];

const originalBoard = board.map(row => [...row]);

function createBoard() {

    const sudokuBoard = document.getElementById("sudoku-board");

    sudokuBoard.innerHTML = "";

    for (let row = 0; row < 9; row++) {

        for (let col = 0; col < 9; col++) {

            const input = document.createElement("input");

            input.type = "text";
            input.maxLength = 1;
            input.classList.add("cell");

            if (board[row][col] !== 0) {
                input.value = board[row][col];
                input.disabled = true;
            }

            input.addEventListener("input", function () {

                if (!/^[1-9]$/.test(this.value)) {
                    this.value = "";
                }

            });

            sudokuBoard.appendChild(input);
        }
    }
}

function isValid(row, col, num) {

    // Check row
    for (let i = 0; i < 9; i++) {
        if (board[row][i] === num) {
            return false;
        }
    }

    // Check column
    for (let i = 0; i < 9; i++) {
        if (board[i][col] === num) {
            return false;
        }
    }

    // Check 3x3 box
    const startRow = row - row % 3;
    const startCol = col - col % 3;

    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {

            if (board[startRow + i][startCol + j] === num) {
                return false;
            }
        }
    }

    return true;
}

function solve() {

    for (let row = 0; row < 9; row++) {

        for (let col = 0; col < 9; col++) {

            if (board[row][col] === 0) {

                for (let num = 1; num <= 9; num++) {

                    if (isValid(row, col, num)) {

                        board[row][col] = num;

                        if (solve()) {
                            return true;
                        }

                        board[row][col] = 0;
                    }
                }

                return false;
            }
        }
    }

    return true;
}

function solveSudoku() {

    if (solve()) {

        updateBoard();

        document.getElementById("message").textContent =
            "Sudoku solved successfully!";

    } else {

        document.getElementById("message").textContent =
            "No solution exists!";
    }
}

function updateBoard() {

    const cells = document.querySelectorAll(".cell");

    let index = 0;

    for (let row = 0; row < 9; row++) {

        for (let col = 0; col < 9; col++) {

            cells[index].value = board[row][col];

            index++;
        }
    }
}

function checkSudoku() {

    const cells = document.querySelectorAll(".cell");

    for (let row = 0; row < 9; row++) {

        for (let col = 0; col < 9; col++) {

            let value = cells[row * 9 + col].value;

            if (value === "") {
                document.getElementById("message").textContent =
                    "Please fill all empty cells.";

                return;
            }
        }
    }

    document.getElementById("message").textContent =
        "Board is completely filled!";
}

function resetBoard() {

    for (let row = 0; row < 9; row++) {

        for (let col = 0; col < 9; col++) {

            board[row][col] = originalBoard[row][col];
        }
    }

    createBoard();

    document.getElementById("message").textContent = "";
}

createBoard();