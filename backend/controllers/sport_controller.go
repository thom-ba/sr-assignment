package controllers

import (
	"backend/requests"
	"backend/responses"
	"backend/services"
	"fmt"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
)

type SportController struct {
	sportService services.SportService
}

func NewSportController(service services.SportService) *SportController {
	return &SportController{
		sportService: service,
	}
}

func (controller *SportController) GetSportById(ctx *gin.Context) {
	idParam := ctx.Param("sportID")
	id, err := strconv.ParseUint(idParam, 10, 64)

	if err != nil {
		fmt.Print("Error\n", err)
		return
	}
	uid := uint(id)

	sport, err := controller.sportService.GetSportById(uid)
	if err != nil {
		ctx.JSON(http.StatusNotFound, gin.H{"error": err.Error()})
		return
	}

	ctx.JSON(http.StatusOK, sport)
}

func (controller *SportController) CreateSport(ctx *gin.Context) {
	req := requests.CreateSportRequest{}
	ctx.ShouldBind(&req)

	sport, err := controller.sportService.Insert(req)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	resp := responses.SportResponse{
		ID:   sport.ID,
		Name: sport.Name,
	}

	ctx.JSON(http.StatusOK, resp)
}

func (controller *SportController) UpdateSport(ctx *gin.Context) {
	req := requests.UpdateSportRequest{}
	ctx.ShouldBindJSON(&req)

	sport, err := controller.sportService.Update(req)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	resp := responses.SportResponse{
		ID:   sport.ID,
		Name: sport.Name,
	}

	ctx.JSON(http.StatusOK, resp)
}

func (controller *SportController) DeleteSport(ctx *gin.Context) {
	idParam := ctx.Param("sportID")
	id, err := strconv.ParseUint(idParam, 10, 64)
	if err != nil {
		fmt.Print("Error\n", err)
		return
	}
	uid := uint(id)

	err = controller.sportService.Delete(uid)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	ctx.JSON(http.StatusOK, gin.H{"message": "Sport deleted"})
}
