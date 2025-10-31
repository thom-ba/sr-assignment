package models

type venue struct {
	ID       uint `gorm:"primaryKey; unique; autoIncrement"`
	name     string
	city     string
	capacity *uint // Optional
}
