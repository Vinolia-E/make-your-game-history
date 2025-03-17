package api

import (
	"log"
	"net/http"
	"sort"
)

func HandleWebSocket(w http.ResponseWriter, r *http.Request) {
	conn, err := upgrader.Upgrade(w, r, nil)
	if err != nil {
		log.Printf("WebSocket upgrade error: %v", err)
		return
	}
	defer conn.Close()

	clients[conn] = true
	defer delete(clients, conn)

	// Send initial scores
	mutex.RLock()
	sortedScores := make([]Score, len(scores))
	copy(sortedScores, scores)
	sort.Slice(sortedScores, func(i, j int) bool {
		return sortedScores[i].Score > sortedScores[j].Score
	})

	// Update ranks
	for i := range sortedScores {
		sortedScores[i].Rank = i + 1
	}

	topScores := sortedScores
	if len(sortedScores) > 5 {
		topScores = sortedScores[:5]
	}
	mutex.RUnlock()

	response := ScoreResponse{
		Scores:      topScores,
		TotalPages:  (len(sortedScores) + 4) / 5,
		CurrentPage: 1,
	}

	if err := conn.WriteJSON(response); err != nil {
		log.Printf("Error sending initial scores: %v", err)
		return
	}

	// Keep connection alive
	for {
		_, _, err := conn.ReadMessage()
		if err != nil {
			break
		}
	}
}
