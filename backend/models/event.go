package models

import "time"

type Event struct {
	ID            uint `gorm:"primaryKey; autoIncrement"`
	CompetitionId uint
	EventTypeId   uint
	HomeTeamId    uint
	AwayTeamId    uint
	VenueId       uint
	EventDateTime time.Time
	Name          string
	Description   string
}
