package models

type Department struct {
	ID     uint   `gorm:"primaryKey" json:"id"`
	Name   string `gorm:"not null;uniqueIndex:idx_userid_name" json:"name"`
	UserID uint   `gorm:"not null;uniqueIndex:idx_userid_name" json:"user_id"`
}
