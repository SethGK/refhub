package services

import (
	"github.com/SethGK/refhub/database"
	"github.com/SethGK/refhub/models"
	"golang.org/x/crypto/bcrypt"
)

func RegisterUser(name, email, password string) error {
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
	if err != nil {
		return err
	}

	user := models.User{
		Name:     name,
		Email:    email,
		Password: string(hashedPassword),
	}

	result := database.DB.Create(&user)
	return result.Error
}
