package services

import (
	"github.com/SethGK/refhub/database"
	"github.com/SethGK/refhub/models"
)

func AddStudy(title, author string, year int, referenceRange, category, doi string) error {
	study := models.Study{
		Title:          title,
		Author:         author,
		Year:           year,
		ReferenceRange: referenceRange,
		Category:       category,
		DOI:            doi,
	}

	result := database.DB.Create(&study)
	return result.Error
}

func GetAllStudies() ([]models.Study, error) {
	var studies []models.Study
	result := database.DB.Find(&studies)
	return studies, result.Error
}

func GetStudiesByUser(userID uint) ([]models.Study, error) {
	var studies []models.Study
	result := database.DB.Where("user_id = ?", userID).Find(&studies)
	return studies, result.Error
}
