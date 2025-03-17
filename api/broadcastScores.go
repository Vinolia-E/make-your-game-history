package api

import (
	"log"
	"sort"
)

func BroadcastScores() {
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

	for client := range clients {
		if err := client.WriteJSON(response); err != nil {
			log.Printf("WebSocket write error: %v", err)
			client.Close()
			delete(clients, client)
		}
	}
}
