
let index = 0;
const story = [
    "Title: ",
    "🐸 Freddy the Frog and the Jiggly Jelly Blocks", "",
    "Deep in the heart of the Wiggly Willow Forest, there lived a happy little frog named Freddy. Freddy had one big job: to build the tallest tower in the forest using magical Jiggly Jelly Blocks!", "",
    "These jelly blocks weren’t just ordinary blocks — they wobbled, bounced, and giggled every time Freddy stacked them just right. But if he stacked them wrong… SPLAT! They flopped over like pancakes!", "",
    "One morning, Freddy woke up to a big surprise: The Jelly Fairy had dropped jelly blocks everywhere! Trees were wearing jelly hats, squirrels were stuck inside jelly cubes, and even the sun looked a little wobbly","",
    "“Oh jellybeans!” said Freddy. “I need help stacking them back into a super silly tower!”",
    "Now it's your turn to help Freddy! Catch the jelly blocks, stack them in the right order, and watch the tower grow taller and funnier! Maybe it’ll reach the moon — or even tickle a passing cloud!", "",
    "Can you help Freddy bring bounce and giggles back to Wiggly Willow Forest? 🍓💫🎉", ""
];

// shows the pop-up for increased tetro speed
function showStoryNotification(a) {
    const storynotification = document.createElement('div');
    storynotification.textContent = story[index];
    storynotification.className = story.title;
    storynotification.className = 'story-notification';
    document.body.appendChild(storynotification);
    
    setTimeout(() => {
        document.body.removeChild(storynotification);
    }, 5000);
    index++;
    if (index >= story.length) {
        index = 0; // Reset index to loop through the story
    }
}