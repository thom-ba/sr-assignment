package services

import (
	"backend/models"
	"backend/repositories"
	"backend/requests"
)

type SportService interface {
	GetSportById(id uint) (*models.Sport, error)
	Insert(createSportRequest requests.CreateSportRequest) (*models.Sport, error)
	Update(newSportRequest requests.UpdateSportRequest) (*models.Sport, error)
	Delete(id uint) error
}

type SportServiceImpl struct {
	sportRepo repositories.SportRepo
}

func NewSportService(repo repositories.SportRepo) SportService {
	return &SportServiceImpl{
		sportRepo: repo,
	}
}

func (s *SportServiceImpl) GetSportById(id uint) (*models.Sport, error) {
	sport, err := s.sportRepo.GetById(id)
	if err != nil {
		return nil, err
	}

	return sport, nil
}

func (s *SportServiceImpl) Insert(createSportRequest requests.CreateSportRequest) (*models.Sport, error) {
	sport := &models.Sport{
		Name: createSportRequest.Name,
	}

	err := s.sportRepo.Insert(sport)
	if err != nil {
		return nil, err
	}

	return sport, nil
}

func (s *SportServiceImpl) Update(newSportRequest requests.UpdateSportRequest) (*models.Sport, error) {
	sport, err := s.sportRepo.GetById(newSportRequest.ID)
	if err != nil {
		return nil, err
	}
	sport.Name = newSportRequest.Name

	newSport, err := s.sportRepo.Update(sport)
	if err != nil {
		return nil, err
	}

	return newSport, nil
}

func (s *SportServiceImpl) Delete(id uint) error {
	if err := s.sportRepo.Delete(id); err != nil {
		return err
	}

	return nil
}
