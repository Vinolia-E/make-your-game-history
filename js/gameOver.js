// Stops the game and displays the game over message with final score.
// Shows the pause menu with game over information.
function gameOver() {
    isGameOver = true;
    isPaused = true;
    pauseMenu.style.display = 'block';
    const gameOverMessage = document.createElement('div');
    gameOverMessage.textContent = `Game Over! Final Score: ${score}`;
    gameOverMessage.style.marginBottom = '20px';
    pauseMenu.insertBefore(gameOverMessage, pauseMenu.firstChild);
}