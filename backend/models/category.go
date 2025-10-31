package models

type Category struct {
	Id   uint   `gorm:"primaryKey; autoIncrement"`
	Name string `gorm:"unique; not null"`
}
