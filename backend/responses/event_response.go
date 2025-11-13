package responses

import (
	"backend/models"
	"time"
)

type EventResponse struct {
	ID            uint               `json:"id"`
	Name          *string            `json:"name"`
	Description   *string            `json:"description"`
	EventDateTime time.Time          `json:"eventDateTime"`
	Competition   models.Competition `json:"competition"`
	EventType     models.EventType   `json:"eventType"`
	HomeTeam      models.Team        `json:"homeTeam"`
	AwayTeam      models.Team        `json:"awayTeam"`
	Venue         models.Venue       `json:"venue"`
}
