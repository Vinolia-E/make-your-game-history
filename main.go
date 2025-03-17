package main

import (
	"log"
	"net/http"

	"tetris/api"
)

func serveTemplate(w http.ResponseWriter, r *http.Request, filename string) {
	http.ServeFile(w, r, filename)
}

func main() {
	if err := api.LoadScores(); err != nil {
		log.Printf("Error loading scores: %v", err)
	}

	mux := http.NewServeMux()

	mux.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		if r.URL.Path == "/" {
			serveTemplate(w, r, "tetris.html")
			return
		}
		http.StripPrefix("/", http.FileServer(http.Dir("."))).ServeHTTP(w, r)
	})

	// REST API endpoints
	mux.HandleFunc("/api/scores", api.HandleScores)
	mux.HandleFunc("/api/scores/add", api.HandleAddScore)

	// WebSocket endpoint
	mux.HandleFunc("/ws", api.HandleWebSocket)

	log.Println("Starting server on http://localhost:9111")
	log.Fatal(http.ListenAndServe(":9111", mux))
}
