package routes

import (
	"net/http"
	"strings"

	"github.com/SethGK/refhub/controllers"
	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt"
)

func AuthMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		authHeader := c.GetHeader("Authorization")
		if authHeader == "" {
			c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"error": "Authorization header required"})
			return
		}
		tokenString := strings.TrimPrefix(authHeader, "Bearer ")
		token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
			return controllers.JwtSecret, nil
		})
		if err != nil || !token.Valid {
			c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"error": "Invalid token"})
			return
		}
		claims, ok := token.Claims.(jwt.MapClaims)
		if !ok {
			c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"error": "Invalid token claims"})
			return
		}

		userIDFloat, ok := claims["user_id"].(float64)
		if !ok {
			c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"error": "Invalid token user_id"})
			return
		}
		c.Set("userID", uint(userIDFloat))
		c.Next()
	}
}

func SetupRoutes(router *gin.Engine) {
	// Public endpoints
	router.POST("/register", controllers.Register)
	router.POST("/login", controllers.Login)

	// Protected endpoints
	authorized := router.Group("/")
	authorized.Use(AuthMiddleware())
	{
		// Reference Range endpoints
		authorized.POST("/reference_ranges", controllers.CreateReferenceRange)
		authorized.GET("/reference_ranges", controllers.GetReferenceRanges)
		authorized.PUT("/reference_ranges/:id", controllers.UpdateReferenceRange)
		authorized.DELETE("/reference_ranges/:id", controllers.DeleteReferenceRange)

		// Study endpoints
		authorized.POST("/studies", controllers.CreateStudy)
		authorized.GET("/studies", controllers.GetStudies)
		authorized.PUT("/studies/:id", controllers.UpdateStudy)
		authorized.DELETE("/studies/:id", controllers.DeleteStudy)
	}
}
