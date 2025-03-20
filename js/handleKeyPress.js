// Processes keyboard input to control piece movement and game state.
// Ignores most inputs if the game is paused or over.
function handleKeyPress(event) {

    const activeElement = document.activeElement;
    const isInputActive = activeElement && (
        activeElement.tagName === 'INPUT' || 
        activeElement.tagName === 'TEXTAREA'
    );
    
    // game controls not active when input is being processed
    if (isInputActive) {
        return;
    }
    
    // process the game control logic
    if ((isPaused || isGameOver) && event.key !== ' ' && event.key.toLowerCase() !== 'r') {
        return;
    }
    
    if (event.key === 'ArrowLeft') {
        movePiece(-1, 0); 
    } else if (event.key === 'ArrowRight') {
        movePiece(1, 0); 
    } else if (event.key === 'ArrowDown') {
        dropInterval = 20; 
    } else if (event.key === 'ArrowUp') {
        rotatePiece(); 
    } else if (event.key === ' ' && !isGameOver) {
        togglePause(); 
    } else if (event.key.toLowerCase() === 'r') {
        restart();
    }
}

// Resets the drop interval when the down arrow key is released.
// Restores normal falling speed after fast drop.
function handleKeyRelease(event) {
    if (event.key === 'ArrowDown') {
        dropInterval = baseDropInterval;
    }
}
