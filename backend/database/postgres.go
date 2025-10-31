package databse

import (
	"fmt"
	"log"
	"os"
	"sync"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
	"gorm.io/gorm/logger"
)

var (
	instance *gorm.DB
	once     sync.Once
)

// Once do is the perfect match for singleton pattern. Also causes lazy init and when called again is a no-op
func GetDB() *gorm.DB {
	once.Do(func() {
		connectionString := fmt.Sprintf(
			"host=%s port=%s user=%s password=%s dbname=%s",
			"127.0.0.1",
			"3295",
			os.Getenv("DB_USER"),
			os.Getenv("DB_PASSWORD"),
			os.Getenv("DB_NAME"),
		)

		db, err := gorm.Open(postgres.Open(connectionString), &gorm.Config{
			Logger: logger.Default.LogMode(logger.Info),
		})

		if err != nil {
			log.Fatal("Failed to connect to database: \n", err)
		}
		log.Println("Connected to database.")
		instance = db
	})

	return instance
}
