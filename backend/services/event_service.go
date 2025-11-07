package services

import (
	"backend/models"
	"backend/repositories"
)

type EventService interface {
	GetEventById(eventID uint) (*models.Event, error)
}

type EventServiceImpl struct {
	eventRepository repositories.EventRepo
}

func NewEventService(repo repositories.EventRepo) EventService {
	return &EventServiceImpl{
		eventRepository: repo,
	}
}

func (e *EventServiceImpl) GetEventById(eventID uint) (*models.Event, error) {
	event, err := e.eventRepository.GetById(eventID)
	if err != nil {
		return nil, err
	}

	return event, nil
}
