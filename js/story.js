
let index = 0;
const story = [
    "Title: 🐸 Freddy the Frog and the Jiggly Jelly Blocks",
    "Deep in the heart of the Wiggly Willow Forest, there lived a happy little frog named Freddy.",
     "Freddy had one big job: to build the tallest tower in the forest using magical Jiggly Jelly Blocks!",
    "These jelly blocks weren’t just ordinary blocks — they wobbled, bounced, and giggled every time Freddy stacked them just right. But if he stacked them wrong… SPLAT! They flopped over like pancakes!",
    "One morning, Freddy woke up to a big surprise: The Jelly Fairy had dropped jelly blocks everywhere! Trees were wearing jelly hats, squirrels were stuck inside jelly cubes, and even the sun looked a little wobbly",
    "“Oh jellybeans!” said Freddy. “I need help stacking them back into a super silly tower!”",
    "Now it's your turn to help Freddy! Catch the jelly blocks, stack them in the right order, and watch the tower grow taller and funnier! Maybe it’ll reach the moon — or even tickle a passing cloud!",
    "Can you help Freddy bring bounce and giggles back to Wiggly Willow Forest? 🍓💫🎉"
];


let storyElement = null; // Keeps track of the currently displayed story box

function storyTeller() {
    isPaused = !isPaused;
    pauseMenu.style.display = isPaused ? 'block' : 'none';
    if (isPaused) {
        pauseStartTime = Date.now();
    } else {
        totalPausedTime += Date.now() - pauseStartTime;
        lastFrameTime = performance.now();
        requestAnimationFrame(update);
    }

    // Remove the old story message if it exists
    if (storyElement) {
        pauseMenu.removeChild(storyElement);
    }

    // Create a new story message box
    const storynotification = document.createElement('div');
    storynotification.textContent = story[index];
    storynotification.style.marginBottom = '10px';
    storynotification.className = 'story-notification';

    // Show it at the top of the pause menu
    pauseMenu.insertBefore(storynotification, pauseMenu.firstChild);

    // Keep reference to remove it later
    storyElement = storynotification;

    // Move to the next part of the story
    index++;
    if (index >= story.length) {
        index = 0; // Restart the story
    }
}


