package models

type EventType struct {
	ID   uint   `gorm:"primaryKey;autoIncrement"`
	Name string `gorm:"not null;unique"`
}
