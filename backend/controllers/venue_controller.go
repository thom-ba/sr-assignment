package controllers

import (
	"backend/services"
	"fmt"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
)

type VenueController struct {
	venueService services.VenueService
}

func NewVenueController(service services.VenueService) *VenueController {
	return &VenueController{
		venueService: service,
	}
}

func (controller *VenueController) GetVenueById(ctx *gin.Context) {
	idParam := ctx.Param("venueID")
	id, err := strconv.ParseInt(idParam, 10, 64)

	if err != nil {
		fmt.Print("Error\n", err)
		return
	}

	uid := uint(id)

	venue, err := controller.venueService.GetVenueById(uid)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	ctx.JSON(http.StatusOK, venue)
}
