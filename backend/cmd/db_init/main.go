package main

import (
	"backend/database"
	"backend/models"
	"backend/seed"
	"fmt"
	"log"
)

func main() {
	db := database.GetDB()

	db.Migrator().DropTable(&models.Event{}, &models.Competition{}, &models.Category{}, &models.Sport{}, &models.EventType{}, &models.Team{}, &models.Venue{})
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
	fmt.Print("Database migrated successfully")

	if err := seed.Run(database.GetDB()); err != nil {
		log.Fatalf("Seeding failed: %v", err)
	}
}
