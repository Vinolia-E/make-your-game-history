// Switches the game between paused and unpaused states.
// Shows or hides the pause menu and manages the game loop.
let totalPausedTime = 0;
let pauseStartTime = 0;

function togglePause() {
    if (isGameOver) return;

    isPaused = !isPaused;
    pauseMenu.style.display = isPaused ? 'block' : 'none';

    //  If story was being displayed, remove it when continuing
    if (!isPaused && storyElement) {
        pauseMenu.removeChild(storyElement);
        storyElement = null;
        gamePausedForStory = false;
    }

    if (isPaused) {
        pauseStartTime = Date.now();
    } else {
        totalPausedTime += Date.now() - pauseStartTime;
        lastFrameTime = performance.now();
        requestAnimationFrame(update);
    }
}

document.getElementById('continue').addEventListener('click', togglePause);
document.getElementById('restart').addEventListener('click', restart);