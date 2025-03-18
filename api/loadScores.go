package api

import (
	"encoding/json"
	"os"
)

func LoadScores() error {
	data, err := os.ReadFile(scoresFile)
	if err != nil {
		if os.IsNotExist(err) {
			return nil
		}
		return err
	}
	return json.Unmarshal(data, &scores)
}
