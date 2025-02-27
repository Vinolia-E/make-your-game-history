// Adds event listeners for keyboard input to control the game.
// Sets up handlers for key press and release events.
function setupControls() {
    document.addEventListener('keydown', handleKeyPress);
    document.addEventListener('keyup', handleKeyRelease);
}