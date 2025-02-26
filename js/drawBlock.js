
// Creates a single block div element with the specified position and color.
// Adds the block to the game container.
function drawBlock(x, y, color) {
    const block = document.createElement('div');
    block.className = 'block';
    block.style.backgroundColor = color;
    block.style.left = `${x * BLOCK_SIZE}px`;
    block.style.top = `${y * BLOCK_SIZE}px`;
    container.appendChild(block);
}