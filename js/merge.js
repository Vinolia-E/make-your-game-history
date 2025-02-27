// Adds the current piece to the grid by transferring its blocks.
// Uses the piece's color to mark occupied grid positions.
function merge() {
    for (let y = 0; y < currentPiece.shape.length; y++) {
        for (let x = 0; x < currentPiece.shape[y].length; x++) {
            if (currentPiece.shape[y][x] !== 0) { 
                let gridY = y + currentPiece.y; 
                let gridX = x + currentPiece.x; 
                grid[gridY][gridX] = currentPiece.color; 
            }
        }
    }
}