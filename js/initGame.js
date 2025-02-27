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
    baseDropInterval = 1000;
    dropInterval = baseDropInterval;
    currentPiece = createPiece();
    setupControls();
    requestAnimationFrame(update);
}