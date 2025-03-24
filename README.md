# make-your-game-score-handling

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
* `Scoreboard System` : Maintains a scoreboard tracking the top five highest scores.

* `Go API Service` : Allows saving and retrieving scoreboard data in JSON format via POST and GET requests.
* `Sorting & Pagination` : Scores are sorted in descending order, with pagination for easier navigation.
* `Position Percentile Display` : Shows the player's ranking percentile after submitting a score.

### Controls
* `Left Arrow` ``(←)`` Move piece left.
* `Right Arrow` ``(→)`` Move piece right.
* `Down Arrow` ``(↓)`` Soft drop (faster descent).
* `Up Arrow` ``(↑)`` Rotate piece.
* `Spacebar` Pause/Resume the game.
* `R` or `r` Restart the game.

### Scoreboard Implementation

* After every game, whether the player wins or loses, a scoreboard displays the five highest scores.
* Each score entry includes:
 * Position (Rank)
 * Player Name
 * Score
 * Time taken (minutes and seconds)

* Scores are displayed in descending order, with the highest score appearing first.
* Pagination is implemented for handling multiple pages of scores.
* For the submitted score, the position percentile is displayed.

### API Implementation
* The Go API stores scores in JSON format and supports:
 * POST requests to submit game scores.
 * GET requests to retrieve scoreboard data.

 ### Time Handling Implementation
 * The game maintains accurate time tracking by:
  * Starting the timer only when the game begins.
  * Stopping the timer when the game is paused.
  * Resuming from the correct time after unpausing.
  * Resetting the timer properly upon game restart.

### Installation & Usage
1. Clone the repository:
``` bash
git clone https://learn.zone01kisumu.ke/git/vandisi/make-your-game-score-handling
```

2. Navigate to the project directory:
``` bash
cd make-your-game-score-handling
```
3. Execute the program:
 ```bash
go run .
```

4. To access the game, visit the website recommended after the execution.

### Technologies Used
* HTML for rendering the game board.
* JavaScript for game logic.
* CSS for styling.
* Go for the API service handling scores.

### Allowed Packages
* Only standard Go packages are allowed, except for:
   * `Gorilla WebSocket` for real-time functionality.

### Future Enhancements

* Introduce sound effects and animations.

## Authors

[Kaunda Rodgers](https://learn.zone01kisumu.ke/git/krodgers)

[Vinolia Esao](https://learn.zone01kisumu.ke/git/vandisi)