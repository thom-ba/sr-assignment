package models

type EventTable struct {
	ID   uint   `gorm:"primaryKey;autoIncrement"`
	Name string `gorm:"not null;unique"`
}
