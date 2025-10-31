package models

type Sport struct {
	ID   uint   `gorm:"primaryKey; autoIncrement"`
	Name string `gorm:"not null, unique"`
}
