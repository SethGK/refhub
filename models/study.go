package models

import "gorm.io/gorm"

type Study struct {
	gorm.Model
	ID             uint   `json:"id" gorm:"primaryKey"`
	Title          string `json:"title"`
	Author         string `json:"author"`
	Year           int    `json:"year"`
	ReferenceRange string `json:"reference_range"`
	Category       string `json:"category"`
	DOI            string `json:"doi" gorm:"unique"`
}
