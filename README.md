# make-your-game

## Tetris

### Introduction

* This is a JavaScript-based implementation of the classic Tetris game.
* The game follows standard Tetris mechanics, including piece rotation, movement, and line clearing. Additionally, it ensures proper time handling during game start, pause, and restart.



### Features

* `Classic Tetris Gameplay`: Move, rotate, and drop pieces to clear lines and score points.
* `Smooth Time Handling`: Ensures the timer only counts active playtime, pauses correctly, and resets properly on restart.
* `Keyboard Controls`: Fully interactive gameplay using the keyboard.
* `Score & Lives Tracking`: Displays real-time score and remaining lives.
* `Responsive UI`: Game state updates dynamically in the UI.

### Controls
* `Left Arrow` ``(←)`` Move piece left.
* `Right Arrow` ``(→)`` Move piece right.
* `Down Arrow` ``(↓)`` Soft drop (faster descent).
* `Up Arrow` ``(↑)`` Rotate piece.
* `Spacebar` Pause/Resume the game.
* `R` or `r` Restart the game.

### Time Handling Implementation

*The game maintains accurate time tracking by:
 * Starting the timer only when the game begins.
 * Stopping the timer when the game is paused.
 * Resuming from the correct time after unpausing.
 * Resetting the timer properly upon game restart.

### Installation & Usage
1. Clone the repository:
``` bash
git clone https://learn.zone01kisumu.ke/git/krodgers/make-your-game.git
```

2. Navigate to the project directory:
``` bash
cd make-your-game
```
3. Open `tetris.html `

4. Press `Go Live` (from the bottom of your screen) and go in a browser to start playing.

### Technologies Used
* HTML for rendering the game board.
* JavaScript for game logic.
* CSS for styling.

### Future Enhancements
* Implement different difficulty levels.
* Add a leaderboard for high scores.
* Introduce sound effects and animations.

## Authors

[Kaunda Rodgers](https://learn.zone01kisumu.ke/git/krodgers)

[Vinolia Esao](https://learn.zone01kisumu.ke/git/vandisi)