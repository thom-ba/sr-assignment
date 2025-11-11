package repositories

import (
	"backend/models"

	"gorm.io/gorm"
)

type EventTypeRepo interface {
	GetById(id uint) (*models.EventType, error)
	GetAll() ([]*models.EventType, error)
	Insert(eventType *models.EventType) error
	Update(eventType *models.EventType) (*models.EventType, error)
	Delete(id uint) error
}

type EventTypeRepoImpl struct {
	db *gorm.DB
}

func NewEventTypeRepo(db *gorm.DB) *EventTypeRepoImpl {
	return &EventTypeRepoImpl{
		db: db,
	}
}

func (s *EventTypeRepoImpl) GetById(id uint) (*models.EventType, error) {
	var eventType models.EventType
	if err := s.db.First(&eventType, id).Error; err != nil {
		return nil, err
	}

	return &eventType, nil
}

func (s *EventTypeRepoImpl) GetAll() ([]*models.EventType, error) {
	var eventTypes []*models.EventType
	if err := s.db.Find(&eventTypes).Error; err != nil {
		return nil, err
	}

	return eventTypes, nil
}

func (s *EventTypeRepoImpl) Insert(eventType *models.EventType) error {
	result := s.db.Create(eventType)
	if result.Error != nil {
		return result.Error
	}

	return nil
}

func (s *EventTypeRepoImpl) Update(eventType *models.EventType) (*models.EventType, error) {
	result := s.db.Save(eventType)
	if result.Error != nil {
		return nil, result.Error
	}

	return eventType, nil
}

func (s *EventTypeRepoImpl) Delete(id uint) error {
	result := s.db.Delete(&models.EventType{}, id)
	if result.Error != nil {
		return result.Error
	}

	if result.RowsAffected <= 0 {
		return gorm.ErrRecordNotFound
	}

	return nil
}
