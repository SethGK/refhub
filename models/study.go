package models

type Study struct {
	ID              uint             `gorm:"primaryKey" json:"id"`
	Name            string           `gorm:"not null" json:"name"`
	Description     string           `json:"description"`
	PublicationDate string           `json:"publication_date"`
	UserID          uint             `gorm:"not null" json:"user_id"`
	Link            string           `json:"link"`
	ReferenceRanges []ReferenceRange `gorm:"many2many:study_reference_ranges;" json:"reference_ranges"`
}
