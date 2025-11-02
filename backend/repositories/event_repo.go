package repositories

import (
	"backend/models"

	"gorm.io/gorm"
)

type EventRepo interface {
	GetById(id uint) (*models.Event, error)
}

type EventRepoImpl struct {
	db *gorm.DB
}

func NewEventRepo(db *gorm.DB) *EventRepoImpl {
	return &EventRepoImpl{
		db: db,
	}
}

func (r *EventRepoImpl) GetById(id uint) (*models.Event, error) {
	var e models.Event
	if err := r.db.Preload("Competition").
		Preload("HomeTeam").
		Preload("AwayTeam").
		Preload("Venue").
		First(&e, id).Error; err != nil {
		return nil, err
	}

	return &e, nil
}
