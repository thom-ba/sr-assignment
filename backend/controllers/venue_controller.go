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

func (controller *VenueController) GetAllVenues(ctx *gin.Context) {
	venues, err := controller.venueService.GetAllVenues()
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	ctx.JSON(http.StatusOK, venues)
}

func (controller *VenueController) CreateVenue(ctx *gin.Context) {
	req := requests.CreateVenueRequest{}
	ctx.ShouldBind(&req)

	venue, err := controller.venueService.Insert(req)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	resp := responses.VenueResponse{
		ID:       venue.ID,
		Name:     venue.Name,
		City:     venue.City,
		Capacity: *venue.Capacity,
	}

	ctx.JSON(http.StatusOK, resp)
}
