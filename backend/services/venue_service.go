package services

import (
	"backend/models"
	"backend/repositories"
	"backend/requests"
)

type VenueService interface {
	GetVenueById(id uint) (*models.Venue, error)
	GetAllVenues() ([]*models.Venue, error)
	Insert(createVenueRequest requests.CreateVenueRequest) (*models.Venue, error)
}

type VenueServiceImpl struct {
	venueRepo repositories.VenueRepo
}

func NewVenueService(repo repositories.VenueRepo) VenueService {
	return &VenueServiceImpl{
		venueRepo: repo,
	}
}

func (v *VenueServiceImpl) GetVenueById(id uint) (*models.Venue, error) {
	venue, err := v.venueRepo.GetById(id)

	if err != nil {
		return nil, err
	}

	return venue, nil
}

func (v *VenueServiceImpl) GetAllVenues() ([]*models.Venue, error) {
	venues, err := v.venueRepo.GetAll()
	if err != nil {
		return nil, err
	}

	return venues, nil
}

func (v *VenueServiceImpl) Insert(createVenueRequest requests.CreateVenueRequest) (*models.Venue, error) {
	venue := &models.Venue{
		Name:     createVenueRequest.Name,
		City:     createVenueRequest.City,
		Capacity: &createVenueRequest.Capacity,
	}

	err := v.venueRepo.Insert(venue)
	if err != nil {
		return nil, err
	}

	return venue, nil
}
