// Attempts to rotate the current piece 90 degrees clockwise.
// Reverts the rotation if it would cause a collision.
function rotatePiece() {
    if (isGameOver) return; 
    const original = currentPiece.shape; 
    currentPiece.shape = currentPiece.shape[0].map((_, colIndex) =>
        currentPiece.shape.map(row => row[colIndex]).reverse()
    );
    if (collide()) {
        currentPiece.shape = original;
    }
}