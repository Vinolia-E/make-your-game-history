// Scans for and removes completed rows from the grid.
// Returns the number of lines cleared and reconstructs the grid.
function checkLines() {
    let linesCleared = 0;
    let newGrid = [];
    for (let y = 0; y < ROWS; y++) {
        let isFull = true;
        for (let x = 0; x < COLS; x++) {
            if (grid[y][x] === 0) {
                isFull = false;
                break; 
            }
        }
        if (isFull) {
            linesCleared++; 
        } else {
            let rowCopy = [];
            for (let x = 0; x < COLS; x++) {
                rowCopy[x] = grid[y][x];
            }
            newGrid[newGrid.length] = rowCopy; 
        }
    }
    let missingRows = ROWS - newGrid.length;
    for (let i = 0; i < missingRows; i++) {
        let emptyRow = [];
        for (let x = 0; x < COLS; x++) {
            emptyRow[x] = 0;
        }
        for (let j = newGrid.length; j > 0; j--) {
            newGrid[j] = newGrid[j - 1];
        }
        newGrid[0] = emptyRow;
    }
    grid = newGrid;
    updateUI(); 
    return linesCleared; 
}