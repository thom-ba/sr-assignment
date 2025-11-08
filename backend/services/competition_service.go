package services

import (
	"backend/models"
	"backend/repositories"
	"backend/requests"
	"strconv"
)

type CompetitionService interface {
	GetCompetitionById(id uint) (*models.Competition, error)
	GetAllCompetitions() ([]*models.Competition, error)
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

func (c *CompetitionServiceImpl) GetAllCompetitions() ([]*models.Competition, error) {
	competitions, err := c.competitionRepo.GetAllCompetitions()

	if err != nil {
		return nil, err
	}

	return competitions, nil
}

func (c *CompetitionServiceImpl) GetTeamsByCompetition(id uint) ([]*models.Team, error) {
	teams, err := c.competitionRepo.GetTeamsByCompetition(id)
	if err != nil {
		return nil, err
	}

	return teams, nil
}

func (c *CompetitionServiceImpl) Insert(createCompetitionRequest requests.CreateCompetitionRequest) (*models.Competition, error) {
	year, err := strconv.ParseUint(createCompetitionRequest.Year, 10, 64)
	if err != nil {
		return nil, err
	}
	yearuint := uint(year)

	competition := &models.Competition{
		SportID:    createCompetitionRequest.SportID,
		CategoryID: createCompetitionRequest.CategoryID,
		Name:       createCompetitionRequest.Name,
		Year:       yearuint,
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
