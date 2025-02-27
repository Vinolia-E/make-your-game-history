// Updates the score, lives, and timer display elements.
// Formats the elapsed time to show minutes and seconds.
function updateUI() {
    scoreElement.textContent = score;
    livesElement.textContent = lives;
    const elapsed = Math.floor((Date.now() - startTime) / 1000);
    timerElement.textContent = `${Math.floor(elapsed / 60)}:${(elapsed % 60).toString().padStart(2, '0')}`;
}