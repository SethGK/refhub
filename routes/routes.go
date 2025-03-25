package routes

import (
	"github.com/SethGK/refhub/controllers"
	"github.com/gin-gonic/gin"
)

func SetupRoutes(r *gin.Engine) {
	auth := r.Group("/auth")
	{
		auth.POST("/register", controllers.Register)
	}

	study := r.Group("/study")
	{
		study.POST("/add", controllers.AddStudy)
		study.GET("/all", controllers.GetAllStudies)
		study.GET("/user/:user_id", controllers.GetUserStudies)
	}
}
