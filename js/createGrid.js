// Creates and returns a 2D array representing the game grid with specified dimensions.
// Validates inputs to ensure rows and columns are positive integers.
function createGrid(rows, cols) {
    if (!Number.isInteger(rows) || !Number.isInteger(cols) || rows <= 0 || cols <= 0) {
        throw new Error('Rows and columns must be positive integers');
    }
    grid = [];
    for (let i = 0; i < rows; i++) {
        let newRow = [];
        for (let j = 0; j < cols; j++) {
            newRow.push(0);
        }
        grid.push(newRow);
    }
    return grid;
}
