package services

import (
	"backend/models"
	"backend/repositories"
	"backend/requests"
)

type EventService interface {
	GetEventByID(id uint) (*models.Event, error)
	GetAllEvents() ([]*models.Event, error)
	Insert(req requests.CreateEventRequest) (*models.Event, error)
}

type EventServiceImpl struct {
	repo repositories.EventRepo
}

func NewEventService(repo repositories.EventRepo) EventService {
	return &EventServiceImpl{repo: repo}
}

func (s *EventServiceImpl) GetEventByID(id uint) (*models.Event, error) {
	return s.repo.GetByID(id)
}

func (s *EventServiceImpl) GetAllEvents() ([]*models.Event, error) {
	return s.repo.GetAll()
}

func (s *EventServiceImpl) Insert(req requests.CreateEventRequest) (*models.Event, error) {
	event := &models.Event{
		CompetitionID: req.CompetitionID,
		EventTypeID:   req.EventTypeID,
		HomeTeamID:    req.HomeTeamID,
		AwayTeamID:    req.AwayTeamID,
		VenueId:       req.VenueID,
		EventDateTime: req.EventDateTime,
		Name:          req.Name,
		Description:   req.Description,
	}
	return s.repo.Insert(event)
}
