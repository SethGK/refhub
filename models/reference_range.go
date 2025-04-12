package models

type ReferenceRange struct {
	ID          uint   `gorm:"primaryKey" json:"id"`
	AnalyteName string `gorm:"not null" json:"analyte_name"`
	LowerBound  string `gorm:"default:null" json:"lower_bound"`
	UpperBound  string `gorm:"default:null" json:"upper_bound"`
	Unit        string `gorm:"not null" json:"unit"`
	Note        string `json:"note"`
	UserID      uint   `gorm:"not null" json:"user_id"`
	StudyID     *uint  `json:"study_id"` // Optional association with a study
	Department  string `gorm:"default:null" json:"department"`
	MinAge      string `json:"min_age"`
	MaxAge      string `json:"max_age"`
	Sex         string `gorm:"default:''" json:"sex"`
	Pregnancy   *bool  `json:"pregnancy"`
}
