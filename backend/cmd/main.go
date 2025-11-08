package main

import (
	"backend/controllers"
	database "backend/database"
	"backend/models"
	"backend/repositories"
	"backend/services"
	"log"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func main() {
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

	sportRepo := repositories.NewSportRepo(database.GetDB())
	sportService := services.NewSportService(sportRepo)
	sportController := controllers.NewSportController(sportService)

	competitionRepo := repositories.NewCompetitionRepo(database.GetDB())
	competitionService := services.NewCompetitionSerivce(competitionRepo)
	competitionController := controllers.NewCompetitionController(competitionService)

	r := gin.Default()
	r.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"http://localhost:3000"},
		AllowMethods:     []string{"GET", "POST", "PATCH", "DELETE"},
		AllowHeaders:     []string{"Origin", "Content-Type", "Authorization"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
	}))

	r.GET("/events/:eventID", controllers.GetEventController(eventService))

	api := r.Group("/api/v1")

	categoryRoutes := api.Group("/categories")
	{
		categoryRoutes.GET("/:categoryID", categoryController.GetCategoryById)
		categoryRoutes.GET("/", categoryController.GetAllCategories)
		categoryRoutes.POST("/create", categoryController.CreateCategory)
		categoryRoutes.PATCH("/update", categoryController.UpdateCategory) // We use PATCH as we dont update the WHOLE resource
		categoryRoutes.DELETE("/delete/:categoryID", categoryController.DeleteCategory)
	}

	sportRoutes := api.Group("/sport")
	{
		sportRoutes.GET("/:sportID", sportController.GetSportById)
		sportRoutes.GET("/", sportController.GetAllSport)
		sportRoutes.POST("/create", sportController.CreateSport)
		sportRoutes.PATCH("/update", sportController.UpdateSport)
		sportRoutes.DELETE("/delete/:sportID", sportController.DeleteSport)
	}

	competitionRoutes := api.Group("/competition")
	{
		competitionRoutes.GET("/:id", competitionController.GetCompetitionById)
		competitionRoutes.GET("/", competitionController.GetAllCompetitions)
		competitionRoutes.GET("/:id/teams", competitionController.GetTeamsByCompetition)
		competitionRoutes.POST("/create", competitionController.CreateCompetition)
	}

	r.Run()
}
