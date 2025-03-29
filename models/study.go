package models

// Study represents a medical study that users can track
type Study struct {
	ID              uint             `gorm:"primaryKey" json:"id"`
	Name            string           `gorm:"not null" json:"name"`
	Description     string           `json:"description"`
	UserID          uint             `gorm:"not null" json:"user_id"`
	ReferenceRanges []ReferenceRange `json:"reference_ranges"`
}
