// Attempts to move the current piece by the specified x and y offsets.
// Handles collisions, merging, line clearing, and new piece creation.
let lastSpeedIncreaseScore = 0;
let lastScore = 0;

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
                let newPoints = scoreValues[linesCleared - 1];
                score += newPoints;

                   // Check if we've crossed a 500-point threshold
                   if (Math.floor(score / 200) > Math.floor(lastSpeedIncreaseScore / 200)) {
                    increaseSpeed();
                }  
                if (Math.floor(score/500) > Math.floor(lastScore/500)) {
                    storyTeller();
                }
                
                lastSpeedIncreaseScore = score;
                lastScore = score;
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