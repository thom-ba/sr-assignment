package controllers

import (
	"backend/requests"
	"backend/services"
	"fmt"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
)

type CategoryController struct {
	categoryService services.CategoryService
}

func NewCategoryController(service services.CategoryService) *CategoryController {
	return &CategoryController{
		categoryService: service,
	}
}

func (controller *CategoryController) GetCategoryById(ctx *gin.Context) {
	idParam := ctx.Param("categoryID")
	id, err := strconv.ParseUint(idParam, 10, 64)

	if err != nil {
		fmt.Print("Error\n", err)
		return
	}
	uid := uint(id)

	category, err := controller.categoryService.GetCategoryById(uid)
	if err != nil {
		ctx.JSON(http.StatusNotFound, gin.H{"error": err.Error()})
		return
	}

	ctx.JSON(http.StatusOK, category)
}

func (controller *CategoryController) CreateCategory(ctx *gin.Context) {
	req := requests.CreateCategoryRequest{}
	ctx.ShouldBindJSON(&req)

	err := controller.categoryService.Insert(req)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	ctx.JSON(http.StatusOK, nil)
}
