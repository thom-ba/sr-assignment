package repositories

import (
	"backend/models"

	"gorm.io/gorm"
)

type CompetitionRepo interface {
	GetById(id uint) (*models.Competition, error)
	GetTeamsByCompetition(id uint) ([]*models.Team, error)
	Insert(competition *models.Competition) (*models.Competition, error)
	Update(competition *models.Competition) (*models.Competition, error)
	Delete(id uint) error
}

type CompetitionRepoImpl struct {
	db *gorm.DB
}

func NewCompetitionRepo(db *gorm.DB) *CompetitionRepoImpl {
	return &CompetitionRepoImpl{
		db: db,
	}
}

func (c *CompetitionRepoImpl) GetById(id uint) (*models.Competition, error) {
	var competition models.Competition
	if err := c.db.First(&competition, id).Error; err != nil {
		return nil, err
	}

	return &competition, nil
}

func (c *CompetitionRepoImpl) GetTeamsByCompetition(id uint) ([]*models.Team, error) {
	var teams []*models.Team

	if err := c.db.
		Table("team").
		Joins("JOIN team_competition_membership m ON m.team_id = team.id").
		Where("m.competition_id = ?", id).
		Find(&teams).Error; err != nil {
		return nil, err
	}

	return teams, nil
}

func (c *CompetitionRepoImpl) Insert(competition *models.Competition) (*models.Competition, error) {
	result := c.db.Create(competition)
	if result.Error != nil {
		return nil, result.Error
	}

	return competition, nil
}

func (c *CompetitionRepoImpl) Update(competition *models.Competition) (*models.Competition, error) {
	result := c.db.Save(competition)
	if result.Error != nil {
		return nil, result.Error
	}

	return competition, nil
}

func (c *CompetitionRepoImpl) Delete(id uint) error {
	result := c.db.Delete(&models.Competition{}, id)

	if result.Error != nil {
		return result.Error
	}

	return result.Error
}
