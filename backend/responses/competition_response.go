package responses

import "backend/models"

type CompetitionResponse struct {
	ID       uint            `json:"id"`
	Name     string          `json:"competition_name"`
	Year     uint            `json:"year"`
	Sport    models.Sport    `json:"sport"`
	Category models.Category `json:"category"`
}
