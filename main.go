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
	database.Connect()
	if err := database.DB.AutoMigrate(&models.User{}, &models.ReferenceRange{}, &models.Study{}); err != nil {
		log.Fatal("Migration failed:", err)
	}

	router := gin.Default()

	config := cors.DefaultConfig()
	config.AllowOrigins = []string{"http://localhost:3000"} // Allow requests from React app
	config.AllowMethods = []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"}
	config.AllowHeaders = []string{"Origin", "Content-Type", "Authorization"}
	router.Use(cors.New(config))

	routes.SetupRoutes(router)

	router.Run(":8080")
}
