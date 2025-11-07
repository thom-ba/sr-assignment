package controllers

import (
	"backend/services"
	"fmt"
	"strconv"

	"github.com/gin-gonic/gin"
)

//TOD: Change to the same as in the other ones, as this looks horrible, even tho it works perfectly fine

func GetEventController(service services.EventService) gin.HandlerFunc {
	return func(ctx *gin.Context) {
		idParam := ctx.Param("eventID")
		id, err := strconv.ParseUint(idParam, 10, 64)

		if err != nil {
			fmt.Print("Error\n", err)
			return
		}
		uid := uint(id)
		event, err := service.GetEventById(uid)
		if err != nil {
			fmt.Print("Error\n", err)
			return
		}

		ctx.JSON(200, event) // should parse to a DTO in the future
	}
}
