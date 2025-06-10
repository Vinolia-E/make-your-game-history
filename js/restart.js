// // Clears game over message and reinitializes the game.
// // Hides the pause menu to start a new game.
function restart() {
    gamePausedForStory = false;

    while (pauseMenu.firstChild) {
        pauseMenu.removeChild(pauseMenu.firstChild);
    }
    
    const continueButton = document.createElement('button');
    continueButton.id = 'continue';
    continueButton.className = 'menu-button';
    continueButton.textContent = 'Continue';
    continueButton.onclick = togglePause;
    pauseMenu.appendChild(continueButton);
    
    const restartButton = document.createElement('button');
    restartButton.id = 'restart';
    restartButton.className = 'menu-button';
    restartButton.textContent = 'Restart';
    restartButton.onclick = restart;
    pauseMenu.appendChild(restartButton);
    
    // Reset game state
    totalPausedTime = 0;
    pauseStartTime = 0;
    index = 0;
    init();
    pauseMenu.style.display = 'none';
}
