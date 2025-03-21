package api

import (
	"bytes"
	"encoding/json"
	"net/http"
	"net/http/httptest"
	"sync"
	"testing"
)

// Create mockable versions of your functions
var (
	saveScoresFunc      = SaveScores
	broadcastScoresFunc = BroadcastScores
)

// TestHandleAddScore tests the HandleAddScore function
func TestHandleAddScore(t *testing.T) {
	// Setup
	originalScores := scores
	originalSaveFunc := saveScoresFunc
	originalBroadcastFunc := broadcastScoresFunc

	defer func() {
		mutex = sync.RWMutex{}  // Reset mutex
		scores = originalScores // Restore original scores
		saveScoresFunc = originalSaveFunc
		broadcastScoresFunc = originalBroadcastFunc
	}()

	// Mock functions
	saveScoresFunc = func() error { return nil }
	broadcastScoresFunc = func() {}

	// Reset scores for testing
	mutex = sync.RWMutex{}
	scores = []Score{}

	// Test case 1: Method not allowed
	t.Run("Method not allowed", func(t *testing.T) {
		req := httptest.NewRequest(http.MethodGet, "/scores", nil)
		rec := httptest.NewRecorder()

		HandleAddScore(rec, req)

		if rec.Code != http.StatusMethodNotAllowed {
			t.Errorf("Expected status %d, got %d", http.StatusMethodNotAllowed, rec.Code)
		}
		if rec.Body.String() != "Method not allowed\n" {
			t.Errorf("Expected body %q, got %q", "Method not allowed\n", rec.Body.String())
		}
	})

	// Test case 2: Empty name
	t.Run("Empty name", func(t *testing.T) {
		score := Score{Name: "", Score: 100}
		body, _ := json.Marshal(score)
		req := httptest.NewRequest(http.MethodPost, "/scores", bytes.NewBuffer(body))
		rec := httptest.NewRecorder()

		HandleAddScore(rec, req)

		if rec.Code != http.StatusBadRequest {
			t.Errorf("Expected status %d, got %d", http.StatusBadRequest, rec.Code)
		}
		if rec.Body.String() != "Name cannot be empty\n" {
			t.Errorf("Expected body %q, got %q", "Name cannot be empty\n", rec.Body.String())
		}
	})

	// Test case 3: Valid score addition
	t.Run("Valid score addition", func(t *testing.T) {
		scores = []Score{} // Reset scores

		score := Score{Name: "Player1", Score: 100}
		body, _ := json.Marshal(score)
		req := httptest.NewRequest(http.MethodPost, "/scores", bytes.NewBuffer(body))
		rec := httptest.NewRecorder()

		HandleAddScore(rec, req)

		if rec.Code != http.StatusOK {
			t.Errorf("Expected status %d, got %d", http.StatusOK, rec.Code)
		}

		var response ScoreResponse
		if err := json.NewDecoder(rec.Body).Decode(&response); err != nil {
			t.Fatalf("Error decoding response: %v", err)
		}

		if response.Position != 1 {
			t.Errorf("Expected position 1, got %d", response.Position)
		}
		if response.Percentile != 100.0 {
			t.Errorf("Expected percentile 100.0, got %f", response.Percentile)
		}
		if len(response.Scores) != 1 {
			t.Errorf("Expected 1 score, got %d", len(response.Scores))
		}
		if response.Scores[0].Name != "Player1" || response.Scores[0].Score != 100 || response.Scores[0].Rank != 1 {
			t.Errorf("Unexpected score data: %+v", response.Scores[0])
		}
	})

	// Test case 4: Multiple scores sorting and ranking
	t.Run("Multiple scores sorting", func(t *testing.T) {
		// Setup initial scores
		scores = []Score{
			{Name: "Player1", Score: 100, Rank: 1},
			{Name: "Player2", Score: 85, Rank: 2},
		}

		// Add new score
		score := Score{Name: "Player3", Score: 75}
		body, _ := json.Marshal(score)
		req := httptest.NewRequest(http.MethodPost, "/scores", bytes.NewBuffer(body))
		rec := httptest.NewRecorder()

		HandleAddScore(rec, req)

		// Check response
		if rec.Code != http.StatusOK {
			t.Errorf("Expected status %d, got %d", http.StatusOK, rec.Code)
		}

		var response ScoreResponse
		if err := json.NewDecoder(rec.Body).Decode(&response); err != nil {
			t.Fatalf("Error decoding response: %v", err)
		}

		// Verify ranks and positions
		expectedRanks := map[string]int{
			"Player1": 1,
			"Player2": 2,
			"Player3": 3,
		}

		for _, s := range response.Scores {
			expected, exists := expectedRanks[s.Name]
			if !exists {
				t.Errorf("Unexpected player: %s", s.Name)
				continue
			}
			if s.Rank != expected {
				t.Errorf("Player %s expected rank %d, got %d", s.Name, expected, s.Rank)
			}
		}

		if response.Position != 3 {
			t.Errorf("Expected position 3, got %d", response.Position)
		}
	})
}
