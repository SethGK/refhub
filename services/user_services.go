package services

import (
	"errors"
	"time"

	"github.com/SethGK/refhub/database"
	"github.com/SethGK/refhub/models"
	"golang.org/x/crypto/bcrypt"
)

// RegisterUser creates a new user after hashing the provided password
func RegisterUser(username, password string) (*models.User, error) {
	if username == "" || password == "" {
		return nil, errors.New("username and password required")
	}

	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
	if err != nil {
		return nil, err
	}

	user := &models.User{
		Username:  username,
		Password:  string(hashedPassword),
		CreatedAt: time.Now(),
	}

	result := database.DB.Create(user)
	if result.Error != nil {
		return nil, result.Error
	}

	return user, nil
}

// LoginUser authenticates the user using the provided credentials
func LoginUser(username, password string) (*models.User, error) {
	var user models.User
	result := database.DB.Where("username = ?", username).First(&user)
	if result.Error != nil {
		return nil, errors.New("user not found")
	}

	if err := bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(password)); err != nil {
		return nil, errors.New("invalid password")
	}

	return &user, nil
}
