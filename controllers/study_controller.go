package controllers

import (
	"net/http"
	"strconv"

	"github.com/SethGK/refhub/services"

	"github.com/gin-gonic/gin"
)

type StudyInput struct {
	Title          string `json:"title" binding:"required"`
	Author         string `json:"author" binding:"required"`
	Year           int    `json:"year" binding:"required"`
	ReferenceRange string `json:"reference_range" binding:"required"`
	Category       string `json:"category" binding:"required"`
	DOI            string `json:"doi" binding:"required"`
}

func AddStudy(c *gin.Context) {
	var input StudyInput
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	err := services.AddStudy(input.Title, input.Author, input.Year, input.ReferenceRange, input.Category, input.DOI)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to add study"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Study added successfully"})
}

func GetAllStudies(c *gin.Context) {
	studies, err := services.GetAllStudies()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch studies"})
		return
	}
	c.JSON(http.StatusOK, studies)
}

func GetUserStudies(c *gin.Context) {
	userID, err := strconv.Atoi(c.Param("user_id"))
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid user ID"})
		return
	}

	studies, err := services.GetStudiesByUser(uint(userID))
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch user's studies"})
		return
	}

	c.JSON(http.StatusOK, studies)
}
