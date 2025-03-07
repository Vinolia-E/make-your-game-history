function updateScoreDisplay() {
    const currentScoreElement = document.getElementById('score');
    const highScoreElement = document.getElementById('highscore');
    if (!currentScoreElement || !highScoreElement) return;

    currentScoreElement.textContent = score;
    const highScore = scoreResults.length > 0 ? Math.max(...scoreResults) : 0;
    highScoreElement.textContent = highScore;
}

function updateScore(points) {
    score += points; // Increase score
    updateScoreDisplay(); // Automatically update UI
}