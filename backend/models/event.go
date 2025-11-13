package models

import "time"

type Event struct {
	ID            uint        `gorm:"primaryKey;autoIncrement"`
	CompetitionID uint        `gorm:"not null;column:competition_id_foreignkey"`
	Competition   Competition `gorm:"foreignKey:CompetitionID"`
	EventTypeID   uint        `gorm:"not null;column:eventtype_id_foreignkey"`
	EventType     EventType
	HomeTeamID    uint `gorm:"not null;column:hometeam_id_foreignkey"`
	HomeTeam      Team `gorm:"not null;foreignKey:HomeTeamID"`
	AwayTeamID    uint `gorm:"not null;column:awayteam_id_foreignkey"`
	AwayTeam      Team `gorm:"not null;foreignKey:AwayTeamID"`
	VenueID       uint `gorm:"not null;column:venue_id_foreignkey"`
	Venue         Venue
	EventDateTime time.Time `gorm:"not null"`
	Name          *string
	Description   *string
}
