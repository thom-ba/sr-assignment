package services

import (
	"backend/models"
	"backend/repositories"
	"backend/requests"
	"fmt"
)

type CategoryService interface {
	GetCategoryById(categoryId uint) (*models.Category, error)
	Insert(category requests.CreateCategoryRequest) error
}

type CategoryServiceImpl struct {
	categoryRepo repositories.CategoryRepo
}

func NewCategoryService(repo repositories.CategoryRepo) CategoryService {
	return &CategoryServiceImpl{
		categoryRepo: repo,
	}
}

func (c *CategoryServiceImpl) GetCategoryById(categoryId uint) (*models.Category, error) {
	category, err := c.categoryRepo.GetById(categoryId)
	if err != nil {
		return nil, err
	}

	return category, nil
}

func (c *CategoryServiceImpl) Insert(category requests.CreateCategoryRequest) error {
	m := models.Category{
		Name: category.Name,
	}

	err := c.categoryRepo.Insert(m)
	if err != nil {
		fmt.Print("Error inserting category\n", err)
		return err
	}

	return nil
}
