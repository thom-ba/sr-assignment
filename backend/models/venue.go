package models

type Venue struct {
	ID       uint `gorm:"primaryKey; autoIncrement"`
	Name     string
	City     string
	Capacity *uint // Optional
}
