// Main game loop that handles piece movement timing based on elapsed time.
// Updates the display and requests the next animation frame.
function update(time = 0) {
    if (isPaused || isGameOver) return; 
    const deltaTime = time - lastFrameTime; 
    lastFrameTime = time; 
    dropCounter += deltaTime; 
    if (dropCounter > dropInterval) { 
        movePiece(0, 1); 
        dropCounter = 0; 
    }
    draw(); 
    updateUI(); 
    requestAnimationFrame(update); 
}