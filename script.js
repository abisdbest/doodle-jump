const API_BASE_URL = 'https://quizizzdoodlescores.arielblau2.workers.dev'; // Replace with your Worker URL

// Helper function to update results
function updateResults(output) {
    document.getElementById('resultOutput').textContent = JSON.stringify(output, null, 2);
}

// Submit a new score
document.getElementById('submitScoreForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const score = parseInt(document.getElementById('score').value, 10);
    alert(JSON.stringify({ username, score }))

    try {
        const response = await fetch(`${API_BASE_URL}/score`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, score })
        });

        const result = await response.text();
        updateResults(result);
    } catch (error) {
        updateResults({ error: error.message });
    }
});

// Get user high score
document.getElementById('getUserScoreForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const username = document.getElementById('getUsername').value;

    try {
        const response = await fetch(`${API_BASE_URL}/user/${username}`);
        const result = await response.json();
        updateResults(result);
    } catch (error) {
        updateResults({ error: error.message });
    }
});

// Get leaderboard
document.getElementById('getLeaderboard').addEventListener('click', async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/leaderboard`);
        const result = await response.json();
        updateResults(result);
    } catch (error) {
        updateResults({ error: error.message });
    }
});