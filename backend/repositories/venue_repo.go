package repositories

import (
	"backend/models"

	"gorm.io/gorm"
)

type VenueRepo interface {
	GetById(id uint) (*models.Venue, error)
	GetAll() ([]*models.Venue, error)
	Insert(venue *models.Venue) error
	Update(venue *models.Venue) (*models.Venue, error)
	Delete(id uint) error
}

type VenueRepoImpl struct {
	db *gorm.DB
}

func NewVenueRepo(db *gorm.DB) *VenueRepoImpl {
	return &VenueRepoImpl{
		db: db,
	}
}

func (v *VenueRepoImpl) GetById(id uint) (*models.Venue, error) {
	var venue models.Venue

	if err := v.db.First(&venue, id).Error; err != nil {
		return nil, err
	}

	return &venue, nil
}

func (v *VenueRepoImpl) GetAll() ([]*models.Venue, error) {
	var venues []*models.Venue
	if err := v.db.Find(&venues).Error; err != nil {
		return nil, err
	}

	return venues, nil
}

func (v *VenueRepoImpl) Insert(venue *models.Venue) error {
	result := v.db.Create(venue)
	if result.Error != nil {
		return result.Error
	}

	return nil
}

func (v *VenueRepoImpl) Update(venue *models.Venue) (*models.Venue, error) {
	result := v.db.Save(venue)
	if result.Error != nil {
		return nil, result.Error
	}

	return venue, nil
}

func (v *VenueRepoImpl) Delete(id uint) error {
	result := v.db.Delete(&models.Venue{}, id)
	if result.Error != nil {
		return result.Error
	}

	if result.RowsAffected <= 0 {
		return gorm.ErrRecordNotFound
	}

	return nil
}
