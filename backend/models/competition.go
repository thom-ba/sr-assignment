package models

import "time"

type Competition struct {
	ID         uint `gorm:"primaryKey;autoIncrement"`
	SportID    uint `gorm:"not null;index:idx_sport_name_year;unique"`
	Sport      Sport
	CategoryID uint `gorm:"not null"`
	Category   Category
	Name       string    `gorm:"not null;index:idx_sport_name_year;unique"`
	Year       time.Time `gorm:"not null;index:idx_sport_name_year;unique"`

	Events []Event
}
