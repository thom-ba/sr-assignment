package services

import (
	"backend/models"
	"backend/repositories"
	"backend/requests"
)

type TeamService interface {
	GetTeamById(id uint) (*models.Team, error)
	GetAllTeams() ([]*models.Team, error)
	Insert(createTeamRequest requests.CreateTeamRequest) (*models.Team, error)
	Update(newTeamRequest requests.UpdateTeamRequest) (*models.Team, error)
	Delete(id uint) error
}

type TeamServiceImpl struct {
	teamRepo repositories.TeamRepo
}

func NewTeamService(repo repositories.TeamRepo) TeamService {
	return &TeamServiceImpl{
		teamRepo: repo,
	}
}

func (s *TeamServiceImpl) GetTeamById(id uint) (*models.Team, error) {
	team, err := s.teamRepo.GetById(id)
	if err != nil {
		return nil, err
	}

	return team, nil
}

func (s *TeamServiceImpl) GetAllTeams() ([]*models.Team, error) {
	teams, err := s.teamRepo.GetAll()
	if err != nil {
		return nil, err
	}

	return teams, nil
}

func (s *TeamServiceImpl) Insert(createTeamRequest requests.CreateTeamRequest) (*models.Team, error) {
	team := &models.Team{
		Name:        createTeamRequest.Name,
		CountryCode: createTeamRequest.CountryCode,
	}

	err := s.teamRepo.Insert(team)
	if err != nil {
		return nil, err
	}

	return team, nil
}

func (s *TeamServiceImpl) Update(newTeamRequest requests.UpdateTeamRequest) (*models.Team, error) {
	team, err := s.teamRepo.GetById(newTeamRequest.ID)
	if err != nil {
		return nil, err
	}
	team.Name = newTeamRequest.Name

	newTeam, err := s.teamRepo.Update(team)
	if err != nil {
		return nil, err
	}

	return newTeam, nil
}

func (s *TeamServiceImpl) Delete(id uint) error {
	if err := s.teamRepo.Delete(id); err != nil {
		return err
	}

	return nil
}
