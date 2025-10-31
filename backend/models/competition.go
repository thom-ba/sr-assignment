package models

type Competition struct {
	ID         uint `gorm:"primaryKey; autoIncrement"`
	SportID    uint `gorm:"index:idx_sport_name_year,unique"`
	CategoryId uint
	Name       string `gorm:"index:idx_sport_name_year,unique"`
	Year       int    `gorm:"index:idx_sport_name_year,unique"`
}
