package api

import (
	"encoding/json"
	"net/http"
	"sort"
	"strconv"
)

func HandleScores(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodGet {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}

	pageNum := 1
	if page := r.URL.Query().Get("page"); page != "" {
		if num, err := strconv.Atoi(page); err == nil && num > 0 {
			pageNum = num
		}
	}

	mutex.RLock()
	defer mutex.RUnlock()

	sort.Slice(scores, func(i, j int) bool {
		return scores[i].Score > scores[j].Score
	})

	for i := range scores {
		scores[i].Rank = i + 1
	}

	// Pagination setup
	itemsPerPage := 5
	totalPages := (len(scores) + itemsPerPage - 1) / itemsPerPage
	start := (pageNum - 1) * itemsPerPage
	if start >= len(scores) {
		start = len(scores)
	}
	end := start + itemsPerPage
	if end > len(scores) {
		end = len(scores)
	}

	response := ScoreResponse{
		Scores:      scores[start:end],
		TotalPages:  totalPages,
		CurrentPage: pageNum,
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)

	if err := json.NewEncoder(w).Encode(response); err != nil {
		http.Error(w, "Error encoding response", http.StatusInternalServerError)
	}
}
