package main

import (
	"log"

	"github.com/SethGK/refhub/database"
	"github.com/SethGK/refhub/models"
	"github.com/SethGK/refhub/routes"
	"github.com/gin-gonic/gin"
)

func main() {

	database.Connect()

	if err := database.DB.AutoMigrate(&models.User{}, &models.ReferenceRange{}, &models.Study{}); err != nil {
		log.Fatal("Migration failed:", err)
	}

	router := gin.Default()
	routes.SetupRoutes(router)

	router.Run(":8080")
}
