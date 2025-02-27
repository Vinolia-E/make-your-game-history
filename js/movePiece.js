// Attempts to move the current piece by the specified x and y offsets.
// Handles collisions, merging, line clearing, and new piece creation.
function movePiece(dx, dy) {
    if (isGameOver) return; 
    currentPiece.x += dx;
    currentPiece.y += dy;
    if (collide()) {
        currentPiece.x -= dx;
        currentPiece.y -= dy;
        if (dy > 0) {
            merge(); 
            let linesCleared = checkLines(); 
            if (linesCleared > 0) {
                let scoreValues = [100, 300, 500, 800];
                score += scoreValues[linesCleared - 1];
            }
            currentPiece = createPiece();
            if (collide()) {
                lives--; 
                livesElement.textContent = lives; 
                if (lives <= 0) {
                    gameOver(); 
                } else {
                    continueGame(); 
                }
            }
        }
    }
}