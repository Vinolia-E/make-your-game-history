function gameOver() {
    isGameOver = true;
    isPaused = true;

    const elapsed = Math.floor((Date.now() - startTime - totalPausedTime) / 1000);
    const timeStr = `${Math.floor(elapsed / 60)}:${(elapsed % 60).toString().padStart(2, '0')}`;

    const gameEndTime = {
        elapsed: elapsed,
        timeStr: timeStr
    };

    // Create name input form
    const nameForm = document.createElement('form');
    nameForm.className = 'game-over-form';
    nameForm.innerHTML = `
        <h2>Game Over!</h2>
        <p>Final Score: ${score}</p>
        <label for="playerName">Enter your name:</label>
        <input type="text" 
               id="playerName" 
               required 
               maxlength="20" 
               placeholder="Your name"
               autocomplete="off"
               autofocus>
        <button type="submit">Submit Score</button>
    `;

    nameForm.onsubmit = async (e) => {
        e.preventDefault();
        const playerName = document.getElementById('playerName').value;

        // Use the pre-recorded time from when the game ended
        const response = await fetch('http://localhost:9111/api/scores/add', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: playerName,
                score: score,
                time: gameEndTime.timeStr
            })
        });

        // Get the response with percentile information
        const data = await response.json();

        // If percentile information is available, save it to display immediately
        if (data.percentile !== undefined && data.position !== undefined) {
            const percentileInfo = {
                playerName: playerName,
                percentile: Math.round(data.percentile),
                position: data.position,
                timestamp: Date.now()
            };

            // Store in sessionStorage
            sessionStorage.setItem('percentileInfo', JSON.stringify(percentileInfo));

            // Immediately display the percentile banner by updating the scoreboard
            const scoreboard = document.getElementById('live-scoreboard');
            if (scoreboard) {
                // Add the percentile banner to the top of the existing scoreboard
                const percentileBanner = document.createElement('div');
                percentileBanner.className = 'percentile-banner';
                percentileBanner.id = 'percentile-banner';
                percentileBanner.innerHTML = `
                    Congrats ${percentileInfo.playerName}, you are in the top ${percentileInfo.percentile}%, on the ${percentileInfo.position}${getRankSuffix(percentileInfo.position)} position.
                `;

                // If there's already a banner, replace it
                const existingBanner = document.getElementById('percentile-banner');
                if (existingBanner) {
                    existingBanner.remove();
                }

                // Insert at the beginning of the scoreboard
                scoreboard.insertBefore(percentileBanner, scoreboard.firstChild);
                // scoreboard.prepend(percentileBanner);
                // Set timeout to remove the banner after 30 seconds
                setTimeout(() => {
                    const banner = document.getElementById('percentile-banner');
                    if (banner) {
                        banner.remove();
                    }
                    sessionStorage.removeItem('percentileInfo');
                }, 30000);
            }
        }

        // Hide the form after submitting
        pauseMenu.style.display = 'none';
        restart();
    };

    pauseMenu.style.display = 'block';
    pauseMenu.innerHTML = '';
    pauseMenu.appendChild(nameForm);

    // Focus the input field
    setTimeout(() => {
        document.getElementById('playerName').focus();
    }, 0);
}

// WebSocket connection for live scoreboard
let ws;
let currentPage = 1;

function connectWebSocket() {
    ws = new WebSocket('ws://localhost:9111/ws');

    ws.onmessage = function (event) {
        const data = JSON.parse(event.data);
        updateScoreboard(data);
    };

    ws.onclose = function () {
        setTimeout(connectWebSocket, 1000);
    };
}

function updateScoreboard(data) {
    const scoreboard = document.getElementById('live-scoreboard');
    if (!scoreboard) return;

    let html = `
        <table>
            <tr>
                <th>Rank</th>
                <th>Name</th>
                <th>Score</th>
                <th>Time</th>
            </tr>
            ${data.scores.map(score => `
                <tr>
                    <td>${score.rank}${getRankSuffix(score.rank)}</td>
                    <td>${score.name}</td>
                    <td>${score.score}</td>
                    <td>${score.time}</td>
                </tr>
            `).join('')}
        </table>
        <div class="pagination">
            <button onclick="changePage(-1)" ${data.currentPage <= 1 ? 'disabled' : ''}>←</button>
            <span>Page ${data.currentPage}/${data.totalPages}</span>
            <button onclick="changePage(1)" ${data.currentPage >= data.totalPages ? 'disabled' : ''}>→</button>
        </div>
    `;

    scoreboard.innerHTML = html;

    // Check if we need to display a percentile banner (from sessionStorage)
    const storedPercentileInfo = sessionStorage.getItem('percentileInfo');
    if (storedPercentileInfo) {
        const percentileInfo = JSON.parse(storedPercentileInfo);
        const elapsedTime = Date.now() - percentileInfo.timestamp;

        // Only display if less than 30 seconds have passed
        if (elapsedTime < 30000) {
            const percentileBanner = document.createElement('div');
            percentileBanner.className = 'percentile-banner';
            percentileBanner.id = 'percentile-banner';
            percentileBanner.innerHTML = `
                Congrats ${percentileInfo.playerName}, you are in the top ${percentileInfo.percentile}%, on the ${percentileInfo.position}${getRankSuffix(percentileInfo.position)} position.
            `;

            // Insert at the beginning of the scoreboard
            scoreboard.insertBefore(percentileBanner, scoreboard.firstChild);
        }
    }
}

async function changePage(delta) {
    const newPage = currentPage + delta;
    const response = await fetch(`http://localhost:9111/api/scores?page=${newPage}`);
    const data = await response.json();

    if (data.scores.length > 0) {
        currentPage = newPage;
        updateScoreboard(data);
    }
}

function getRankSuffix(i) {
    const j = i % 10;
    const k = i % 100;
    if (j == 1 && k != 11) return "st";
    if (j == 2 && k != 12) return "nd";
    if (j == 3 && k != 13) return "rd";
    return "th";
}

// Connect when the game loads
connectWebSocket();