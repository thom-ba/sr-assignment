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

type TeamController struct {
	teamService services.TeamService
}

func NewTeamController(service services.TeamService) *TeamController {
	return &TeamController{
		teamService: service,
	}
}

func (controller *TeamController) GetTeamById(ctx *gin.Context) {
	idParam := ctx.Param("teamID")
	id, err := strconv.ParseUint(idParam, 10, 64)

	if err != nil {
		fmt.Print("Error\n", err)
		return
	}
	uid := uint(id)

	team, err := controller.teamService.GetTeamById(uid)
	if err != nil {
		ctx.JSON(http.StatusNotFound, gin.H{"error": err.Error()})
		return
	}

	ctx.JSON(http.StatusOK, team)
}

func (controller *TeamController) GetAllTeams(ctx *gin.Context) {
	teams, err := controller.teamService.GetAllTeams()

	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	ctx.JSON(http.StatusOK, teams)
}

func (controller *TeamController) CreateTeam(ctx *gin.Context) {
	req := requests.CreateTeamRequest{}
	ctx.ShouldBind(&req)

	team, err := controller.teamService.Insert(req)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	resp := responses.TeamResponse{
		ID:          team.ID,
		Name:        team.Name,
		CountryCode: team.CountryCode,
	}

	ctx.JSON(http.StatusOK, resp)
}

func (controller *TeamController) UpdateTeam(ctx *gin.Context) {
	req := requests.UpdateTeamRequest{}
	ctx.ShouldBindJSON(&req)

	team, err := controller.teamService.Update(req)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	resp := responses.TeamResponse{
		ID:          team.ID,
		Name:        team.Name,
		CountryCode: team.CountryCode,
	}

	ctx.JSON(http.StatusOK, resp)
}

func (controller *TeamController) DeleteTeam(ctx *gin.Context) {
	idParam := ctx.Param("teamID")
	id, err := strconv.ParseUint(idParam, 10, 64)
	if err != nil {
		fmt.Print("Error\n", err)
		return
	}
	uid := uint(id)

	err = controller.teamService.Delete(uid)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	ctx.JSON(http.StatusOK, gin.H{"message": "Team deleted"})
}
