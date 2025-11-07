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

type CompetitionController struct {
	competitionService services.CompetitionService
}

func NewCompetitionController(service services.CompetitionService) *CompetitionController {
	return &CompetitionController{
		competitionService: service,
	}
}

func (controller *CompetitionController) GetCompetitionById(ctx *gin.Context) {
	idParam := ctx.Param("competitionID")
	id, err := strconv.ParseUint(idParam, 10, 64)

	if err != nil {
		fmt.Print("Error\n", err)
		return
	}

	uid := uint(id)

	competition, err := controller.competitionService.GetCompetitionById(uid)
	if err != nil {
		ctx.JSON(http.StatusNotFound, gin.H{"error": err.Error()})
		return
	}

	ctx.JSON(http.StatusOK, competition)
}

func (controller *CompetitionController) GetTeamsByCompetition(ctx *gin.Context) {
	idParam := ctx.Param("comeptitionID")
	id, err := strconv.ParseUint(idParam, 10, 64)

	if err != nil {
		fmt.Print("Error\n", err)
		return
	}

	uid := uint(id)
	teams, err := controller.competitionService.GetCompetitionById(uid)
	if err != nil {
		ctx.JSON(http.StatusNotFound, gin.H{"error": err.Error()})
		return
	}

	ctx.JSON(http.StatusOK, teams)
}

func (controller *CompetitionController) CreateCompetition(ctx *gin.Context) {
	req := requests.CreateCompetitionRequest{}
	ctx.ShouldBind(&req)

	competition, err := controller.competitionService.Insert(req)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	resp := responses.CompetitionResponse{
		ID:         competition.ID,
		SportID:    competition.SportID,
		CategoryID: competition.CategoryID,
		Name:       competition.Name,
		Year:       competition.Year,
	}

	ctx.JSON(http.StatusOK, resp)
}
