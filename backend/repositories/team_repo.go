package repositories

import (
	"backend/models"

	"gorm.io/gorm"
)

type TeamRepo interface {
	GetById(id uint) (*models.Team, error)
	GetAll() ([]*models.Team, error)
	Insert(team *models.Team) error
	Update(team *models.Team) (*models.Team, error)
	Delete(id uint) error
}

type TeamRepoImpl struct {
	db *gorm.DB
}

func NewTeamRepo(db *gorm.DB) *TeamRepoImpl {
	return &TeamRepoImpl{
		db: db,
	}
}

func (s *TeamRepoImpl) GetById(id uint) (*models.Team, error) {
	var team models.Team
	if err := s.db.First(&team, id).Error; err != nil {
		return nil, err
	}

	return &team, nil
}

func (s *TeamRepoImpl) GetAll() ([]*models.Team, error) {
	var teams []*models.Team
	if err := s.db.Find(&teams).Error; err != nil {
		return nil, err
	}

	return teams, nil
}

func (s *TeamRepoImpl) Insert(team *models.Team) error {
	result := s.db.Create(team)
	if result.Error != nil {
		return result.Error
	}

	return nil
}

func (s *TeamRepoImpl) Update(team *models.Team) (*models.Team, error) {
	result := s.db.Save(team)
	if result.Error != nil {
		return nil, result.Error
	}

	return team, nil
}

func (s *TeamRepoImpl) Delete(id uint) error {
	result := s.db.Delete(&models.Team{}, id)
	if result.Error != nil {
		return result.Error
	}

	if result.RowsAffected <= 0 {
		return gorm.ErrRecordNotFound
	}

	return nil
}
