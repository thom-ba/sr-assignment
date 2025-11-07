package services

import (
	"backend/models"
	"backend/repositories"
	"backend/requests"
	"fmt"
)

type CategoryService interface {
	GetCategoryById(id uint) (*models.Category, error)
	Insert(categoryRequest requests.CreateCategoryRequest) (*models.Category, error)
	Update(newCategory requests.UpdateCategoryRequest) (*models.Category, error)
	Delete(id uint) error
}

type CategoryServiceImpl struct {
	categoryRepo repositories.CategoryRepo
}

func NewCategoryService(repo repositories.CategoryRepo) CategoryService {
	return &CategoryServiceImpl{
		categoryRepo: repo,
	}
}

func (c *CategoryServiceImpl) GetCategoryById(id uint) (*models.Category, error) {
	category, err := c.categoryRepo.GetById(id)
	if err != nil {
		return nil, err
	}

	return category, nil
}

func (c *CategoryServiceImpl) Insert(createCategoryRequest requests.CreateCategoryRequest) (*models.Category, error) {
	category := &models.Category{
		Name: createCategoryRequest.Name,
	}

	err := c.categoryRepo.Insert(category)
	if err != nil {
		fmt.Print("Error inserting category\n", err)
		return nil, err
	}

	return category, nil
}

func (c *CategoryServiceImpl) Update(newCategoryRequest requests.UpdateCategoryRequest) (*models.Category, error) {
	category, err := c.categoryRepo.GetById(newCategoryRequest.ID)
	if err != nil {
		return nil, err
	}
	category.Name = newCategoryRequest.Name

	if err := c.categoryRepo.Update(category); err != nil {
		return nil, err
	}

	return category, nil
}

func (c *CategoryServiceImpl) Delete(id uint) error {
	if err := c.categoryRepo.Delete(id); err != nil {
		return err
	}

	return nil
}
