// Processes keyboard input to control piece movement and game state.
// Ignores most inputs if the game is paused or over.
function handleKeyPress(event) {
    if ((isPaused || isGameOver) && event.key !== ' ') {
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
    }
}

// Resets the drop interval when the down arrow key is released.
// Restores normal falling speed after fast drop.
function handleKeyRelease(event) {
    if (event.key === 'ArrowDown') {
        dropInterval = baseDropInterval;
    }
}
