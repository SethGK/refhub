// services/reference_range_service.go

package services

import (
	"errors"

	"github.com/SethGK/refhub/database"
	"github.com/SethGK/refhub/models"
	"gorm.io/gorm"
)

// CreateReferenceRange creates a new reference range record.
func CreateReferenceRange(refRange *models.ReferenceRange) error {
	if refRange.AnalyteName == "" {
		return errors.New("analyte name required")
	}
	if refRange.Unit == "" {
		return errors.New("unit required")
	}

	return database.DB.Create(refRange).Error
}

// GetReferenceRangesByUser retrieves all reference ranges for a given user.
func GetReferenceRangesByUser(userID uint) ([]models.ReferenceRange, error) {
	var refRanges []models.ReferenceRange
	result := database.DB.Where("user_id = ?", userID).Find(&refRanges)
	return refRanges, result.Error
}

// UpdateReferenceRange updates an existing reference range record.
func UpdateReferenceRange(refRange *models.ReferenceRange) error {
	// Ensure the reference range exists and belongs to the user
	var existingRange models.ReferenceRange
	if err := database.DB.Where("id = ? AND user_id = ?", refRange.ID, refRange.UserID).First(&existingRange).Error; err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return errors.New("reference range not found or not owned by user")
		}
		return err
	}

	// Update the fields
	return database.DB.Model(&existingRange).Updates(map[string]interface{}{
		"analyte_name": refRange.AnalyteName,
		"lower_bound":  refRange.LowerBound,
		"upper_bound":  refRange.UpperBound,
		"unit":         refRange.Unit,
		"note":         refRange.Note,
		"department":   refRange.Department,
		"min_age":      refRange.MinAge,
		"max_age":      refRange.MaxAge,
		"sex":          refRange.Sex,
		"pregnancy":    refRange.Pregnancy,
	}).Error
}

// DeleteReferenceRange deletes a reference range record if it belongs to the given user.
// Modified to handle the many-to-many relationship with studies.
func DeleteReferenceRange(id uint, userID uint) error {
	// First confirm the reference range exists and belongs to the user
	var refRange models.ReferenceRange
	if err := database.DB.Where("id = ? AND user_id = ?", id, userID).First(&refRange).Error; err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return errors.New("reference range not found or unauthorized")
		}
		return err
	}

	// Begin a transaction
	tx := database.DB.Begin()

	// Find all studies associated with this reference range
	var studies []models.Study
	if err := tx.Model(&refRange).Association("Studies").Find(&studies); err != nil {
		tx.Rollback()
		return err
	}

	// For each study, remove the association with this reference range
	for _, study := range studies {
		if err := tx.Model(&study).Association("ReferenceRanges").Delete(&refRange); err != nil {
			tx.Rollback()
			return err
		}
	}

	// Delete the reference range
	if err := tx.Delete(&refRange).Error; err != nil {
		tx.Rollback()
		return err
	}

	return tx.Commit().Error
}
