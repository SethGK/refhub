package services

import (
	"github.com/SethGK/refhub/database"
	"github.com/SethGK/refhub/models"
)

// CreateDepartment saves a new department to the database.
func CreateDepartment(dept *models.Department) error {
	return database.DB.Create(dept).Error
}

// GetDepartmentsByUser retrieves all departments for a given user.
func GetDepartmentsByUser(userID uint) ([]models.Department, error) {
	var departments []models.Department
	err := database.DB.Where("user_id = ?", userID).Find(&departments).Error
	return departments, err
}

// DeleteDepartment deletes a department if it belongs to the given user.
func DeleteDepartment(deptID uint, userID uint) error {
	return database.DB.Where("id = ? AND user_id = ?", deptID, userID).Delete(&models.Department{}).Error
}
