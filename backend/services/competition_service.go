package services

import (
	"backend/models"
	"backend/repositories"
	"backend/requests"
)

type CompetitionService interface {
	GetCompetitionById(id uint) (*models.Competition, error)
	Insert(createCompetitionRequest requests.CreateCompetitionRequest) (*models.Competition, error)
	Update(newCompetitionRequest requests.UpdateCompetitionRequest) (*models.Competition, error)
}

type CompetitionServiceImpl struct {
	competitionRepo repositories.CompetitionRepo
}

func NewCompetitionSerivce(repo repositories.CompetitionRepo) CompetitionService {
	return &CompetitionServiceImpl{
		competitionRepo: repo,
	}
}

func (c *CompetitionServiceImpl) GetCompetitionById(id uint) (*models.Competition, error) {
	competition, err := c.competitionRepo.GetById(id)
	if err != nil {
		return nil, err
	}

	return competition, nil
}

func (c *CompetitionServiceImpl) Insert(createCompetitionRequest requests.CreateCompetitionRequest) (*models.Competition, error) {
	competition := &models.Competition{
		SportID:    createCompetitionRequest.SportID,
		CategoryID: createCompetitionRequest.CategoryID,
		Name:       createCompetitionRequest.Name,
		Year:       createCompetitionRequest.Year,
	}

	comp, err := c.competitionRepo.Insert(competition)
	if err != nil {
		return nil, err
	}

	return comp, nil
}

func (c *CompetitionServiceImpl) Update(newCompetitionRequest requests.UpdateCompetitionRequest) (*models.Competition, error) {
	competition, err := c.competitionRepo.GetById(newCompetitionRequest.ID)
	if err != nil {
		return nil, err
	}

	newCompetition, err := c.competitionRepo.Update(competition)
	if err != nil {
		return nil, err
	}

	return newCompetition, nil
}
