package utility

import (
	"log"
	"os"
	"time"

	"github.com/golang-jwt/jwt/v5"
)

type Claims struct {
	ID string `json:"id"`
	jwt.RegisteredClaims
}

func GenerateAccessToken(UserID string) string {
	accessTokenExp := time.Now().Add(15 * time.Minute)
	accessClaims := &Claims{
		ID: UserID,
		RegisteredClaims: jwt.RegisteredClaims{
			ExpiresAt: jwt.NewNumericDate(accessTokenExp),
		},
	}

	SecretKey := os.Getenv("JWT_SECRET_KEY")
	if SecretKey == "" {
		log.Fatal("JWT_SECRET_KEY environment variable is not set")
	}
	jwtKey := []byte(SecretKey)
	accessToken := jwt.NewWithClaims(jwt.SigningMethodHS256, accessClaims)
	accessString, _ := accessToken.SignedString(jwtKey)

	return accessString
}

func GenerateRefreshToken(UserID string) string {
	refreshTokenExp := time.Now().Add(7 * 24 * time.Hour)
	refreshClaims := &Claims{
		ID: UserID,
		RegisteredClaims: jwt.RegisteredClaims{
			ExpiresAt: jwt.NewNumericDate(refreshTokenExp),
		},
	}

	SecretKey := os.Getenv("JWT_SECRET_KEY")
	if SecretKey == "" {
		log.Fatal("JWT_SECRET_KEY environment variable is not set")
	}
	jwtKey := []byte(SecretKey)
	refreshToken := jwt.NewWithClaims(jwt.SigningMethodHS256, refreshClaims)
	refreshString, _ := refreshToken.SignedString(jwtKey)

	return refreshString
}
