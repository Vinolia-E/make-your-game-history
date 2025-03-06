// Stops the game and displays the game over message with final score.
// Shows the pause menu with game over information.
function gameOver() {
    isGameOver = true;
    isPaused = true;
    pauseMenu.style.display = 'block';
    
    const continueButton = document.getElementById('continue');
    if (continueButton) {
        continueButton.style.display = 'none';
    }
    

    //stores the final score in the slice/array.
    scoreResults.push(score);

    // Finds the highScore in the slice
    const highScore = Math.max(...scoreResults);

    // Remove previous game over messages
    const existingMessages = pauseMenu.querySelectorAll('div');
    existingMessages.forEach(msg => msg.remove());

    // Create a new div for the game over message
    const gameOverMessage = document.createElement('div');
    gameOverMessage.textContent = `Game Over! Final Score: ${score}`;
    gameOverMessage.style.marginBottom = '10px';

    // Create a new div for the high score message
    const highScoreMessage = document.createElement('div');
    highScoreMessage.textContent = `High Score: ${highScore}`;
    highScoreMessage.style.fontWeight = 'bold';
    highScoreMessage.style.color = 'gold';

    // Add both messages to the pause menu
    pauseMenu.insertBefore(gameOverMessage, pauseMenu.firstChild);
    pauseMenu.insertBefore(highScoreMessage, pauseMenu.firstChild);
    
    // const gameOverMessage = document.createElement('div');
    // gameOverMessage.textContent = `Game Over! Final Score: ${score}`;
    // gameOverMessage.style.marginBottom = '20px';
    // pauseMenu.insertBefore(gameOverMessage, pauseMenu.firstChild);
 
}