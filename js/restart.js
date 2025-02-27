// Clears game over message and reinitializes the game.
// Hides the pause menu to start a new game.
function restart() {
    let buttonsToKeep = new Set(['continue', 'restart']);
    Array.from(pauseMenu.children).forEach(child => {
        if (!buttonsToKeep.has(child.id)) {
            pauseMenu.removeChild(child);
        }
    });
    
    const continueButton = document.getElementById('continue');
    if (continueButton) {
        continueButton.style.display = 'block';
    }
    
    totalPausedTime = 0;
    pauseStartTime = 0;
    
    init(); 
    pauseMenu.style.display = 'none'; 
}