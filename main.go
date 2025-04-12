package main

import (
	"log"

	"github.com/SethGK/refhub/database"
	"github.com/SethGK/refhub/models"
	"github.com/SethGK/refhub/routes"
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func main() {
	// Connect to the PostgreSQL database using GORM
	database.Connect()

	// Auto-migrate models to keep schema up to date
	err := database.DB.AutoMigrate(
		&models.User{},
		&models.ReferenceRange{},
		&models.Study{},
		&models.Department{},
	)
	if err != nil {
		log.Fatal("Database migration failed:", err)
	}

	// Initialize Gin router
	router := gin.Default()

	// CORS configuration to allow frontend access (e.g. React app on localhost:3000)
	corsConfig := cors.DefaultConfig()
	corsConfig.AllowOrigins = []string{"http://localhost:3000"}
	corsConfig.AllowMethods = []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"}
	corsConfig.AllowHeaders = []string{"Origin", "Content-Type", "Authorization"}

	// Apply CORS middleware
	router.Use(cors.New(corsConfig))

	// Set up routes from the routes package
	routes.SetupRoutes(router)

	// Run the server on port 8080
	if err := router.Run(":8080"); err != nil {
		log.Fatal("Failed to run server:", err)
	}
}
