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
