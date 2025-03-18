package api

import (
	"encoding/json"
	"os"
	"sort"
)

func SaveScores() error {
	sort.Slice(scores, func(i, j int) bool {
		return scores[i].Score > scores[j].Score
	})
	for i := range scores {
		scores[i].Rank = i + 1
	}
	data, err := json.MarshalIndent(scores, "", "    ")
	if err != nil {
		return err
	}
	return os.WriteFile(scoresFile, data, 0o644)
}
