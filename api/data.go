package api

import (
	"log"
	"net/http"
	"sync"

	"github.com/gorilla/websocket"
)

type Score struct {
	Name  string `json:"name"`
	Rank  int    `json:"rank"`
	Score int    `json:"score"`
	Time  string `json:"time"`
}

type ScoreResponse struct {
	Scores      []Score `json:"scores"`
	TotalPages  int     `json:"totalPages"`
	CurrentPage int     `json:"currentPage"`
	Percentile  float64 `json:"percentile,omitempty"`
	Position    int     `json:"position,omitempty"`
}

var (
	scores     []Score
	mutex      sync.RWMutex
	scoresFile = "scores.json"
	// WebSocket upgrader and clients
	upgrader = websocket.Upgrader{
		CheckOrigin: func(r *http.Request) bool {
			allowedOrigins := map[string]bool{
				"http://localhost:9111": true,
			}
			origin := r.Header.Get("Origin")
			log.Println("Incoming WebSocket request from Origin:", origin)
			if !allowedOrigins[origin] {
				log.Println("Blocked WebSocket connection from:", origin)
				return false
			}
			return true
		},
	}
	clients = make(map[*websocket.Conn]bool)
)
