package models

type Competition struct {
	ID         uint   `gorm:"primaryKey; autoIncrement"`
	SportID    uint   `gorm:"not null; index:idx_sport_name_year,unique"`
	CategoryId uint   `gorm:"not null"`
	Name       string `gorm:"not null; index:idx_sport_name_year,unique"`
	Year       int    `gorm:"not null; index:idx_sport_name_year,unique"`
}
