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

type EventController struct {
	eventService services.EventService
}

func NewEventController(service services.EventService) *EventController {
	return &EventController{
		eventService: service,
	}
}

func (controller *EventController) GetEventByID(ctx *gin.Context) {
	idParam := ctx.Param("eventID")
	id, err := strconv.ParseUint(idParam, 10, 64)

	if err != nil {
		fmt.Print("Error\n", err)
		return
	}
	uid := uint(id)

	event, err := controller.eventService.GetEventByID(uid)
	if err != nil {
		ctx.JSON(http.StatusNotFound, gin.H{"error": err.Error()})
		return
	}

	ctx.JSON(http.StatusOK, responses.EventResponse{
		ID:            event.ID,
		Name:          event.Name,
		Description:   event.Description,
		EventDateTime: event.EventDateTime,
		Competition:   event.Competition,
		EventType:     event.EventType,
		HomeTeam:      event.HomeTeam,
		AwayTeam:      event.AwayTeam,
		Venue:         event.Venue,
	})
}

func (controller *EventController) GetAllEvents(ctx *gin.Context) {
	events, err := controller.eventService.GetAllEvents()
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	var resp []responses.EventResponse
	for _, e := range events {
		resp = append(resp, responses.EventResponse{
			ID:            e.ID,
			Name:          e.Name,
			Description:   e.Description,
			EventDateTime: e.EventDateTime,
			Competition:   e.Competition,
			EventType:     e.EventType,
			HomeTeam:      e.HomeTeam,
			AwayTeam:      e.AwayTeam,
			Venue:         e.Venue,
		})
	}

	ctx.JSON(http.StatusOK, resp)
}

func (controller *EventController) CreateEvent(ctx *gin.Context) {
	req := requests.CreateEventRequest{}
	if err := ctx.ShouldBind(&req); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	event, err := controller.eventService.Insert(req)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// reload with nested objects
	event, err = controller.eventService.GetEventByID(event.ID)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	ctx.JSON(http.StatusOK, responses.EventResponse{
		ID:            event.ID,
		Name:          event.Name,
		Description:   event.Description,
		EventDateTime: event.EventDateTime,
		Competition:   event.Competition,
		EventType:     event.EventType,
		HomeTeam:      event.HomeTeam,
		AwayTeam:      event.AwayTeam,
		Venue:         event.Venue,
	})
}
