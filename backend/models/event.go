package models

import "time"

type Event struct {
	ID             uint `gorm:"primaryKey; unique; autoIncrement"`
	competition_id uint
	event_type_id  uint
	home_team_id   uint
	away_team_id   uint
	venue_id       uint
	event_datetime time.Time
	name           string
	description    string
}
