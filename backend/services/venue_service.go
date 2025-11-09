package services

import (
	"backend/models"
	"backend/repositories"
)

type VenueService interface {
	GetVenueById(id uint) (*models.Venue, error)
	GetAllVenues() ([]*models.Venue, error)
	Insert(createVenueRequest requests.CreateVenueRequest) (*models.Competition, error)
}

type VenueService struct {
	venueRepo repositories.VenueRepo
}
