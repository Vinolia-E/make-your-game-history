// Resets the grid while maintaining score and decremented lives.
// Creates a new piece to continue gameplay.
function continueGame() {
    if (lives > 0) {
        grid = createGrid(ROWS, COLS);
        currentPiece = createPiece();
    } else {
        gameOver();
    }
}