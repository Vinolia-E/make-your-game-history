// Initializes the game by setting up the grid, game variables, and controls.
// Starts the game loop by requesting the first animation frame.
function init() {
    grid = createGrid(ROWS, COLS);
    score = 0;
    lives = 3;
    startTime = Date.now();
    isPaused = false;
    isGameOver = false;
    lastFrameTime = 0;
    dropCounter = 0;
    // gamePausedForStory = false;
    baseDropInterval = 1000;
    dropInterval = baseDropInterval;
    lastSpeedIncreaseScore = 0;
    totalPausedTime = 0;
    pauseStartTime = 0;
    currentPiece = createPiece();
    setupControls();
    requestAnimationFrame(update);
}

// changes the drop interval, makes the change only if not in fast drop
function increaseSpeed() {
    const minDropInterval = 100; 
    baseDropInterval = Math.max(minDropInterval, baseDropInterval * 0.9);
    
    if (dropInterval > 100) {
        dropInterval = baseDropInterval;
    }
    
    showSpeedNotification();
}

// shows the pop-up for increased tetro speed
function showSpeedNotification() {
    const notification = document.createElement('div');
    notification.textContent = 'Speed increased!';
    notification.className = 'speed-notification';
    document.body.appendChild(notification);
    
    setTimeout(() => {
        document.body.removeChild(notification);
    }, 1500);
}
