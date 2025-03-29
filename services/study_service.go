package services

import (
	"errors"

	"github.com/SethGK/refhub/database"
	"github.com/SethGK/refhub/models"
)

// CreateStudy creates a new study record.
func CreateStudy(study *models.Study) error {
	if study.Name == "" {
		return errors.New("study name required")
	}
	result := database.DB.Create(study)
	return result.Error
}

// GetStudiesByUser retrieves all studies for a given user.
func GetStudiesByUser(userID uint) ([]models.Study, error) {
	var studies []models.Study
	result := database.DB.Where("user_id = ?", userID).Find(&studies)
	return studies, result.Error
}

// UpdateStudy updates an existing study record.
func UpdateStudy(study *models.Study) error {
	result := database.DB.Save(study)
	return result.Error
}

// DeleteStudy deletes a study record if it belongs to the given user.
func DeleteStudy(id uint, userID uint) error {
	result := database.DB.Where("id = ? AND user_id = ?", id, userID).Delete(&models.Study{})
	if result.RowsAffected == 0 {
		return errors.New("study not found or unauthorized")
	}
	return result.Error
}
