package requests

import "time"

// {"competition_id":2,"event_type_id":1,"home_team_id":1,"away_team_id":2,"venue_id":4,"eventDateTime":"2025-04-12T17:00","name":"Player A vs Player B","description":"Test"}

type CreateEventRequest struct {
	CompetitionID uint      `json:"competition_id" binding:"required"`
	EventTypeID   uint      `json:"event_type_id" binding:"required"`
	HomeTeamID    uint      `json:"home_team_id" binding:"required"`
	AwayTeamID    uint      `json:"away_team_id" binding:"required"`
	VenueID       uint      `json:"venue_id" binding:"required"`
	EventDateTime time.Time `json:"event_date_time" binding:"required"`
	Name          *string   `json:"name"`
	Description   *string   `json:"description"`
}

type UpdateEventRequest struct {
	ID            uint      `json:"id" binding:"required"`
	CompetitionID uint      `json:"competition_id"`
	EventTypeID   uint      `json:"event_type_id"`
	HomeTeamID    uint      `json:"home_team_id"`
	AwayTeamID    uint      `json:"away_team_id"`
	VenueID       uint      `json:"venue_id"`
	EventDateTime time.Time `json:"event_date_time"`
	Name          *string   `json:"name"`
	Description   *string   `json:"description"`
}
