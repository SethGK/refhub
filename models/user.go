package models

import (
	"time"
)

// User represents a registered user.
type User struct {
	ID              uint             `gorm:"primaryKey" json:"id"`
	Username        string           `gorm:"unique;not null" json:"username"`
	Password        string           `gorm:"not null" json:"-"`
	CreatedAt       time.Time        `json:"created_at"`
	ReferenceRanges []ReferenceRange `json:"reference_ranges"`
	Studies         []Study          `json:"studies"`
}
