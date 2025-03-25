package main

import (
	"fmt"
	"log"

	"github.com/SethGK/refhub/database"
	"github.com/SethGK/refhub/models"
	"github.com/SethGK/refhub/routes"
	"github.com/gin-gonic/gin"
)

func main() {
	// Connect to the database and run migrations
	database.ConnectDB()
	database.DB.AutoMigrate(&models.User{}, &models.Study{})

	// Initialize the Gin router
	r := gin.Default()

	// Setup the application routes
	r.GET("/", func(c *gin.Context) {
		c.String(200, "RefHub API is running!")
	})
	routes.SetupRoutes(r)

	// Start the server on port 8080
	port := 8080
	fmt.Printf("Server is running on http://localhost:%d\n", port)
	if err := r.Run(fmt.Sprintf(":%d", port)); err != nil {
		log.Fatal("Failed to run server: ", err)
	}
}
