package services

import (
	"errors"

	"github.com/SethGK/refhub/database"
	"github.com/SethGK/refhub/models"
)

// CreateReferenceRange creates a new reference range entry
func CreateReferenceRange(rangeEntry *models.ReferenceRange) error {
	if rangeEntry.AnalyteName == "" || rangeEntry.Unit == "" {
		return errors.New("analyte name and unit required")
	}
	// Additional validations can be added here.
	result := database.DB.Create(rangeEntry)
	return result.Error
}

// GetReferenceRangesByUser retrieves all reference range entries for a given user
func GetReferenceRangesByUser(userID uint) ([]models.ReferenceRange, error) {
	var ranges []models.ReferenceRange
	result := database.DB.Where("user_id = ?", userID).Find(&ranges)
	return ranges, result.Error
}

// UpdateReferenceRange updates an existing reference range entry
func UpdateReferenceRange(rangeEntry *models.ReferenceRange) error {
	result := database.DB.Save(rangeEntry)
	return result.Error
}

// DeleteReferenceRange deletes a reference range entry if it belongs to the given user
func DeleteReferenceRange(id uint, userID uint) error {
	result := database.DB.Where("id = ? AND user_id = ?", id, userID).Delete(&models.ReferenceRange{})
	if result.RowsAffected == 0 {
		return errors.New("reference range not found or unauthorized")
	}
	return result.Error
}
