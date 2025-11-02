package main

import (
	"backend/controllers"
	database "backend/database"
	"backend/models"
	"backend/repositories"
	"backend/services"
	"log"

	"github.com/gin-gonic/gin"
)

func main() {
	// r := gin.Default()

	// r.GET("/ping", func(ctx *gin.Context) {
	// 	ctx.JSON(http.StatusOK, gin.H{
	// 		"message": "pong",
	// 	})
	// })

	// r.Run()

	db := database.GetDB()
	err := db.AutoMigrate(
		&models.Category{},
		&models.Sport{},
		&models.EventType{},
		&models.Team{},
		&models.Venue{},
		&models.Competition{},
		&models.Event{},
	)
	if err != nil {
		log.Fatal("Migration failed:", err)
	}
	log.Println("Database migrated successfully!")

	eventRepo := repositories.NewEventRepo(database.GetDB())
	eventService := services.NewEventService(eventRepo)

	categoryRepo := repositories.NewCategoryRepo(database.GetDB())
	categoryService := services.NewCategoryService(categoryRepo)
	categoryController := controllers.NewCategoryController(categoryService)

	r := gin.Default()
	r.GET("/events/:eventID", controllers.GetEventController(eventService))

	categoryRoutes := r.Group("/categories")
	{
		categoryRoutes.GET("/categories/:categoryID", categoryController.GetCategoryById)
		categoryRoutes.POST("/", categoryController.CreateCategory)
	}
	r.Run()
}
