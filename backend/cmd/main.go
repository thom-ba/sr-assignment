package main

import (
	database "backend/database"
	"backend/models"
	"log"
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
}
