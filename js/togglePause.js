// Switches the game between paused and unpaused states.
// Shows or hides the pause menu and manages the game loop.
function togglePause() {
    if (isGameOver) return;
    isPaused = !isPaused;
    pauseMenu.style.display = isPaused ? 'block' : 'none';
    if (!isPaused) {
        lastFrameTime = performance.now();
        requestAnimationFrame(update);
    }
}

document.getElementById('continue').addEventListener('click', togglePause);
document.getElementById('restart').addEventListener('click', restart);