package api

import (
	"encoding/json"
	"log"
	"net/http"
	"sort"
)

func HandleAddScore(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}

	var newScore Score
	if err := json.NewDecoder(r.Body).Decode(&newScore); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	// Basic validation inline
	if newScore.Name == "" {
		http.Error(w, "Name cannot be empty", http.StatusBadRequest)
		return
	}

	// Lock for modifying
	mutex.Lock()
	scores = append(scores, newScore)
	localScores := make([]Score, len(scores))
	copy(localScores, scores)
	mutex.Unlock()

	// Sort outside critical section
	sort.Slice(localScores, func(i, j int) bool {
		return localScores[i].Score > localScores[j].Score
	})

	// Update ranks and find new score position
	var position int
	for i := range localScores {
		localScores[i].Rank = i + 1
		if localScores[i].Name == newScore.Name && localScores[i].Score == newScore.Score {
			position = i + 1
		}
	}

	// Update the original scores with new ranks
	mutex.Lock()
	copy(scores, localScores)
	mutex.Unlock()

	percentile := float64(position) / float64(len(localScores)) * 100

	// Save scores asynchronously
	go func() {
		mutex.RLock()
		defer mutex.RUnlock()
		if err := SaveScores(); err != nil {
			log.Printf("Error saving scores: %v", err)
		}
	}()

	// Broadcast updated scores asynchronously
	go func() {
		mutex.RLock()
		defer mutex.RUnlock()
		BroadcastScores()
	}()

	// Return top 5 scores
	topScores := localScores
	if len(localScores) > 5 {
		topScores = localScores[:5]
	}

	response := ScoreResponse{
		Scores:      topScores,
		TotalPages:  (len(localScores) + 4) / 5,
		CurrentPage: 1,
		Percentile:  percentile,
		Position:    position,
	}

	w.WriteHeader(http.StatusOK)
	w.Header().Set("Content-Type", "application/json")

	if err := json.NewEncoder(w).Encode(response); err != nil {
		log.Printf("Error encoding response: %v", err)
		http.Error(w, "Error encoding response", http.StatusInternalServerError)
		return
	}
}
