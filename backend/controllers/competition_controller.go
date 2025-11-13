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

func (controller *CompetitionController) GetAllCompetitions(ctx *gin.Context) {
	competitions, err := controller.competitionService.GetAllCompetitions()

	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	var resp []responses.CompetitionResponse
	for _, c := range competitions {
		resp = append(resp, responses.CompetitionResponse{
			ID:       c.ID,
			Name:     c.Name,
			Year:     c.Year,
			Sport:    c.Sport,
			Category: c.Category,
		})
	}

	ctx.JSON(http.StatusOK, resp)
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

	fmt.Println("Year: ", req.Year)

	competition, err := controller.competitionService.Insert(req)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	competition, err = controller.competitionService.GetCompetitionById(competition.ID)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	resp := responses.CompetitionResponse{
		ID:       competition.ID,
		Sport:    competition.Sport,
		Category: competition.Category,
		Name:     competition.Name,
		Year:     competition.Year,
	}

	ctx.JSON(http.StatusOK, resp)
}
