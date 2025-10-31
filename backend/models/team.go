package models

type Team struct {
	ID          uint   `gorm:"primaryKey;autoIncrement"`
	Name        string `gorm:"not null;unique;"`
	CountryCode string `gorm:"not null;type:char(3)"`
}
