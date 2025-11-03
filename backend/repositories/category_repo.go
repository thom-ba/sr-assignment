package repositories

import (
	"backend/models"

	"gorm.io/gorm"
)

type CategoryRepo interface {
	GetById(id uint) (*models.Category, error)
	Insert(category *models.Category) error
	Update(category *models.Category) error
}

type CategoryRepoImpl struct {
	db *gorm.DB
}

func NewCategoryRepo(db *gorm.DB) *CategoryRepoImpl {
	return &CategoryRepoImpl{
		db: db,
	}
}

func (r *CategoryRepoImpl) GetById(id uint) (*models.Category, error) {
	var c models.Category
	if err := r.db.First(&c, id).Error; err != nil {
		return nil, err
	}

	return &c, nil
}

func (r *CategoryRepoImpl) Insert(category *models.Category) error {
	result := r.db.Create(category)
	if result.Error != nil {
		return result.Error
	}

	return nil
}

func (r *CategoryRepoImpl) Update(category *models.Category) error {
	result := r.db.Save(category)
	if result.Error != nil {
		return result.Error
	}

	return nil
}
