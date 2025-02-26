// Renders the current state of the game grid and active piece.
// Creates HTML elements to display blocks with appropriate positions and colors.
function draw() {
    container.innerHTML = '';
    for (let y = 0; y < grid.length; y++) {
        for (let x = 0; x < grid[y].length; x++) {
            if (grid[y][x]) {
                drawBlock(x, y, grid[y][x]); 
            }
        }
    }
    for (let y = 0; y < currentPiece.shape.length; y++) {
        for (let x = 0; x < currentPiece.shape[y].length; x++) {
            if (currentPiece.shape[y][x]) {
                drawBlock(currentPiece.x + x, currentPiece.y + y, currentPiece.color);
            }
        }
    }
}