package repositories

import (
	"backend/models"

	"gorm.io/gorm"
)

type SportRepo interface {
	GetById(id uint) (*models.Sport, error)
	GetAll() ([]*models.Sport, error)
	Insert(sport *models.Sport) error
	Update(sport *models.Sport) (*models.Sport, error)
	Delete(id uint) error
}

type SportRepoImpl struct {
	db *gorm.DB
}

func NewSportRepo(db *gorm.DB) *SportRepoImpl {
	return &SportRepoImpl{
		db: db,
	}
}

func (s *SportRepoImpl) GetById(id uint) (*models.Sport, error) {
	var sport models.Sport
	if err := s.db.First(&sport, id).Error; err != nil {
		return nil, err
	}

	return &sport, nil
}

func (s *SportRepoImpl) GetAll() ([]*models.Sport, error) {
	var sports []*models.Sport
	if err := s.db.Find(&sports).Error; err != nil {
		return nil, err
	}

	return sports, nil
}

func (s *SportRepoImpl) Insert(sport *models.Sport) error {
	result := s.db.Create(sport)
	if result.Error != nil {
		return result.Error
	}

	return nil
}

func (s *SportRepoImpl) Update(sport *models.Sport) (*models.Sport, error) {
	result := s.db.Save(sport)
	if result.Error != nil {
		return nil, result.Error
	}

	return sport, nil
}

func (s *SportRepoImpl) Delete(id uint) error {
	result := s.db.Delete(&models.Sport{}, id)
	if result.Error != nil {
		return result.Error
	}

	if result.RowsAffected <= 0 {
		return gorm.ErrRecordNotFound
	}

	return nil
}
