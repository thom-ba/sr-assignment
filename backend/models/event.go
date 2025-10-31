package models

import "time"

type Event struct {
	ID            uint      `gorm:"primaryKey; autoIncrement"`
	CompetitionId uint      `gorm:"not null"`
	EventTypeId   uint      `gorm:"not null"`
	HomeTeamId    uint      `gorm:"not null"`
	AwayTeamId    uint      `gorm:"not null"`
	VenueId       uint      `gorm:"not null"`
	EventDateTime time.Time `gorm:"not null"`
	Name          *string
	Description   *string
}
