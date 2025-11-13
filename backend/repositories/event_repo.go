package repositories

import (
	"backend/models"

	"gorm.io/gorm"
)

type EventRepo interface {
	GetByID(id uint) (*models.Event, error)
	GetAll() ([]*models.Event, error)
	Insert(event *models.Event) (*models.Event, error)
}

type EventRepoImpl struct {
	db *gorm.DB
}

func NewEventRepo(db *gorm.DB) *EventRepoImpl {
	return &EventRepoImpl{db: db}
}

func (r *EventRepoImpl) GetByID(id uint) (*models.Event, error) {
	var event models.Event
	if err := r.db.Preload("Competition").
		Preload("EventType").
		Preload("HomeTeam").
		Preload("AwayTeam").
		Preload("Venue").
		First(&event, id).Error; err != nil {
		return nil, err
	}
	return &event, nil
}

func (r *EventRepoImpl) GetAll() ([]*models.Event, error) {
	var events []*models.Event
	if err := r.db.Preload("Competition.Sport").
		Preload("Competition.Category").
		Preload("EventType").
		Preload("HomeTeam").
		Preload("AwayTeam").
		Preload("Venue").
		Find(&events).Error; err != nil {
		return nil, err
	}
	return events, nil
}

func (r *EventRepoImpl) Insert(event *models.Event) (*models.Event, error) {
	if err := r.db.Create(event).Error; err != nil {
		return nil, err
	}
	return event, nil
}
