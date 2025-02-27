// Checks if the current piece collides with the grid boundaries or other blocks.
// Returns true if a collision is detected, false otherwise.
function collide() {
    for (let y = 0; y < currentPiece.shape.length; y++) {
        for (let x = 0; x < currentPiece.shape[y].length; x++) {
            if (currentPiece.shape[y][x] !== 0) { 
                let gridY = currentPiece.y + y;
                let gridX = currentPiece.x + x;
                if (gridY >= ROWS || gridX < 0 || gridX >= COLS || (gridY >= 0 && grid[gridY][gridX] !== 0)) {
                    return true; 
                }
            }
        }
    }
    return false; 
}
