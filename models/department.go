package models

type Department struct {
	ID     uint   `gorm:"primaryKey" json:"id"`
	Name   string `gorm:"unique;not null" json:"name"`
	UserID uint   `gorm:"not null" json:"user_id"`
}
