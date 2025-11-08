package repositories

import (
	"backend/models"

	"gorm.io/gorm"
)

type CategoryRepo interface {
	GetById(id uint) (*models.Category, error)
	GetAllCategories() ([]*models.Category, error)
	Insert(category *models.Category) error
	Update(category *models.Category) error
	Delete(id uint) error
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

func (r *CategoryRepoImpl) GetAllCategories() ([]*models.Category, error) {
	var categories []*models.Category

	if err := r.db.Find(&categories).Error; err != nil {
		return nil, err
	}

	return categories, nil

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

func (r *CategoryRepoImpl) Delete(id uint) error {
	result := r.db.Delete(&models.Category{}, id)
	if result.Error != nil {
		return result.Error
	}

	return nil
}
