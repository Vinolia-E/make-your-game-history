// Generates a new random Tetris piece with a random shape and color.
// Positions the new piece at the top center of the grid.
function createPiece() {
    let randomIndex = Math.floor(Math.random() * SHAPES.length);
    let selectedShape = JSON.parse(JSON.stringify(SHAPES[randomIndex]));
    let selectedColor = COLORS[randomIndex];
    let startX = Math.floor(COLS / 2) - 1;
    let startY = 0; 
    return {
        shape: selectedShape,
        color: selectedColor,
        x: startX,
        y: startY
    };
}