// Constants and Variables
const ROWS = 20;
const COLS = 10;
const BLOCK_SIZE = 30;
const SHAPES = [
    [[1, 1, 1, 1]],
    [[1, 1], [1, 1]],
    [[1, 1, 0], [0, 1, 1]],
    [[0, 1, 1], [1, 1, 0]],
    [[1, 1, 1], [0, 1, 0]],
    [[1, 1, 1], [1, 0, 0]],
    [[1, 1, 1], [0, 0, 1]]
];
const COLORS = ['#00f0f0', '#f0f000', '#f00000', '#00f000', '#a000f0', '#f0a000', '#0000f0'];

let grid, score, lives, startTime, isPaused, lastFrameTime, index, dropCounter, dropInterval, baseDropInterval, currentPiece, isGameOver, gamePausedForStory, storyElement;
const container = document.getElementById('game-container');
const scoreElement = document.getElementById('score');
const timerElement = document.getElementById('timer');
const livesElement = document.getElementById('lives');
const pauseMenu = document.getElementById('pause-menu');

// Starts the game
init();