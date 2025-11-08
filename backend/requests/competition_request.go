package requests

import "time"

type CreateCompetitionRequest struct {
	SportID    uint   `validate:"required" json:"sport_id"`
	CategoryID uint   `validate:"required" json:"category_id"`
	Name       string `validate:"required" json:"name"`
	Year       uint   `json:"year"`
}

type UpdateCompetitionRequest struct {
	ID         uint       `json:"id"`
	SportID    *uint      `json:"sport_id"`
	CategoryID *uint      `json:"category_id"`
	Name       *string    `json:"name"`
	Year       *time.Time `json:"year" time_format:"2025-01-01"`
}
