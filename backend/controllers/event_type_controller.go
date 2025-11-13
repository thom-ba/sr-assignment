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

type EventTypeController struct {
	eventTypeService services.EventTypeService
}

func NewEventTypeController(service services.EventTypeService) *EventTypeController {
	return &EventTypeController{
		eventTypeService: service,
	}
}

func (controller *EventTypeController) GetEventTypeById(ctx *gin.Context) {
	idParam := ctx.Param("eventTypeId")
	id, err := strconv.ParseUint(idParam, 10, 64)

	if err != nil {
		fmt.Print("Error\n", err)
		return
	}
	uid := uint(id)

	eventType, err := controller.eventTypeService.GetEventTypeById(uid)
	if err != nil {
		ctx.JSON(http.StatusNotFound, gin.H{"error": err.Error()})
		return
	}

	ctx.JSON(http.StatusOK, eventType)
}

func (controller *EventTypeController) GetAllEventTypes(ctx *gin.Context) {
	eventTypes, err := controller.eventTypeService.GetAllEventTypes()

	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	ctx.JSON(http.StatusOK, eventTypes)
}

func (controller *EventTypeController) CreateEventType(ctx *gin.Context) {
	req := requests.CreateEventTypeRequest{}
	ctx.ShouldBind(&req)

	eventType, err := controller.eventTypeService.Insert(req)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	resp := responses.EventTypeResponse{
		ID:   eventType.ID,
		Name: eventType.Name,
	}

	ctx.JSON(http.StatusOK, resp)
}

func (controller *EventTypeController) UpdateEventType(ctx *gin.Context) {
	req := requests.UpdateEventTypeRequest{}
	ctx.ShouldBindJSON(&req)

	eventType, err := controller.eventTypeService.Update(req)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	resp := responses.EventTypeResponse{
		ID:   eventType.ID,
		Name: eventType.Name,
	}

	ctx.JSON(http.StatusOK, resp)
}

func (controller *EventTypeController) DeleteEventType(ctx *gin.Context) {
	idParam := ctx.Param("eventTypeId")
	id, err := strconv.ParseUint(idParam, 10, 64)
	if err != nil {
		fmt.Print("Error\n", err)
		return
	}
	uid := uint(id)

	err = controller.eventTypeService.Delete(uid)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	ctx.JSON(http.StatusOK, gin.H{"message": "Event Type deleted"})
}
