package services

import (
	"errors"

	"github.com/SethGK/refhub/database"
	"github.com/SethGK/refhub/models"
	"gorm.io/gorm"
)

// CreateStudy creates a new study record along with its reference range associations.
func CreateStudy(study *models.Study) error {
	if study.Name == "" {
		return errors.New("study name required")
	}

	// Begin a transaction.
	tx := database.DB.Begin()

	// Extract the reference ranges from the payload.
	var refRanges []models.ReferenceRange
	if len(study.ReferenceRanges) > 0 {
		refRanges = study.ReferenceRanges
		// Clear the field so that the study record itself is created without associations.
		study.ReferenceRanges = nil
	}

	// Create the study record.
	if err := tx.Create(study).Error; err != nil {
		tx.Rollback()
		return err
	}

	// If reference ranges were sent, associate them with the study.
	if len(refRanges) > 0 {
		if err := tx.Model(study).Association("ReferenceRanges").Append(refRanges); err != nil {
			tx.Rollback()
			return err
		}
	}

	return tx.Commit().Error
}

// GetStudiesByUser retrieves all studies for a given user with their reference ranges preloaded.
func GetStudiesByUser(userID uint) ([]models.Study, error) {
	var studies []models.Study
	result := database.DB.Where("user_id = ?", userID).Preload("ReferenceRanges").Find(&studies)
	return studies, result.Error
}

// UpdateStudy updates an existing study record and its reference range associations.
func UpdateStudy(study *models.Study) error {
	// Ensure the study exists and belongs to the user.
	var existingStudy models.Study
	if err := database.DB.Where("id = ? AND user_id = ?", study.ID, study.UserID).First(&existingStudy).Error; err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return errors.New("study not found or not owned by user")
		}
		return err
	}

	// Begin a transaction.
	tx := database.DB.Begin()

	// Extract and remove reference range associations from the incoming study payload.
	var refRanges []models.ReferenceRange
	if len(study.ReferenceRanges) > 0 {
		refRanges = study.ReferenceRanges
		study.ReferenceRanges = nil
	}

	// Update the study fields.
	if err := tx.Model(&existingStudy).Updates(map[string]interface{}{
		"name":             study.Name,
		"description":      study.Description,
		"publication_date": study.PublicationDate,
	}).Error; err != nil {
		tx.Rollback()
		return err
	}

	// Clear existing reference range associations.
	if err := tx.Model(&existingStudy).Association("ReferenceRanges").Clear(); err != nil {
		tx.Rollback()
		return err
	}

	// Append new reference range associations if provided.
	if len(refRanges) > 0 {
		if err := tx.Model(&existingStudy).Association("ReferenceRanges").Append(refRanges); err != nil {
			tx.Rollback()
			return err
		}
	}

	return tx.Commit().Error
}

// DeleteStudy deletes a study record if it belongs to the given user.
func DeleteStudy(id uint, userID uint) error {
	result := database.DB.Where("id = ? AND user_id = ?", id, userID).Delete(&models.Study{})
	if result.RowsAffected == 0 {
		return errors.New("study not found or unauthorized")
	}
	return result.Error
}
