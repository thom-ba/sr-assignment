package services

import (
	"backend/models"
	"backend/repositories"
	"backend/requests"
)

type EventTypeService interface {
	GetEventTypeById(id uint) (*models.EventType, error)
	GetAllEventTypes() ([]*models.EventType, error)
	Insert(createEventTypeRequest requests.CreateEventTypeRequest) (*models.EventType, error)
	Update(newEventTypeRequest requests.UpdateEventTypeRequest) (*models.EventType, error)
	Delete(id uint) error
}

type EventTypeServiceImpl struct {
	eventTypeRepo repositories.EventTypeRepo
}

func NewEventTypeService(repo repositories.EventTypeRepo) EventTypeService {
	return &EventTypeServiceImpl{
		eventTypeRepo: repo,
	}
}

func (e *EventTypeServiceImpl) GetEventTypeById(id uint) (*models.EventType, error) {
	eventType, err := e.eventTypeRepo.GetById(id)
	if err != nil {
		return nil, err
	}

	return eventType, nil
}

func (e *EventTypeServiceImpl) GetAllEventTypes() ([]*models.EventType, error) {
	eventTypes, err := e.eventTypeRepo.GetAll()
	if err != nil {
		return nil, err
	}

	return eventTypes, nil
}

func (e *EventTypeServiceImpl) Insert(createEventTypeRequest requests.CreateEventTypeRequest) (*models.EventType, error) {
	eventType := &models.EventType{
		Name: createEventTypeRequest.Name,
	}

	err := e.eventTypeRepo.Insert(eventType)
	if err != nil {
		return nil, err
	}

	return eventType, nil
}

func (e *EventTypeServiceImpl) Update(newEventTypeRequest requests.UpdateEventTypeRequest) (*models.EventType, error) {
	eventType, err := e.eventTypeRepo.GetById(newEventTypeRequest.ID)
	if err != nil {
		return nil, err
	}
	eventType.Name = newEventTypeRequest.Name

	newEventType, err := e.eventTypeRepo.Update(eventType)
	if err != nil {
		return nil, err
	}

	return newEventType, nil
}

func (e *EventTypeServiceImpl) Delete(id uint) error {
	if err := e.eventTypeRepo.Delete(id); err != nil {
		return err
	}

	return nil
}
