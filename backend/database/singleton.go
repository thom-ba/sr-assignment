package database

import "gorm.io/gorm"

type single struct {
	DB *gorm.DB
}

func New(db *gorm.DB) *single {
	return &single{DB: db}
}
