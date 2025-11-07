package models

import "time"

type Event struct {
	ID            uint `gorm:"primaryKey;autoIncrement"`
	CompetitionID uint `gorm:"not null"`
	Competition   Competition
	EventTypeID   uint `gorm:"not null"`
	EventType     EventType
	HomeTeamID    uint `gorm:"not null"`
	HomeTeam      Team `gorm:"not null;foreignKey:HomeTeamID"`
	AwayTeamID    uint `gorm:"not null"`
	AwayTeam      Team `gorm:"not null;foreignKey:AwayTeamID"`
	VenueId       uint `gorm:"not null"`
	Venue         Venue
	EventDateTime time.Time `gorm:"not null"`
	Name          *string
	Description   *string
}
