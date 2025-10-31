package models

type Venue struct {
	ID       uint   `gorm:"primaryKey;autoIncrement"`
	Name     string `gorm:"not null"`
	City     string `gorm:"not null"`
	Capacity *uint  // Optional
}
