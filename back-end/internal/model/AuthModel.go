package model

import (
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

type LoginRequest struct {
	Email    string `json:"email"`
	Password string `json:"password"`
}

type RegisterRequest struct {
	Username string         `json:"username"`
	Email    string         `json:"email"`
	Password string         `json:"password"`
	Verify   string         `json:"verify"`
	Profile  ProfileRequest `json:"profile"`
}

type ProfileRequest struct {
	Birthdate time.Time `json:"birthdate"`
	FirstName string    `json:"first_name"`
	LastName  string    `json:"last_name"`
	AboutMe   string    `json:"about_me"`
}

type UserModel struct {
	ID        primitive.ObjectID `bson:"_id,omitempty" json:"id"`
	Username  string             `bson:"username" json:"username"`
	Email     string             `bson:"email" json:"email"`
	Password  string             `bson:"password,omitempty" json:"-"` // ปิดไม่ให้ส่งกลับใน response
	FirstName string             `bson:"first_name" json:"first_name"`
	LastName  string             `bson:"last_name" json:"last_name"`
	AboutMe   string             `bson:"about_me" json:"about_me"`
	Birthdate time.Time          `bson:"birthdate" json:"birthdate"`
	CreatedAt time.Time          `bson:"created_at" json:"created_at"`
}

type RefreshToken struct {
	ID        primitive.ObjectID `bson:"_id,omitempty"`
	UserID    primitive.ObjectID `bson:"user_id"`
	Token     string             `bson:"token"`
	ExpiresAt time.Time          `bson:"expires_at"`
}

type RefreshTokenRequest struct {
	RefreshToken string `json:"refresh_token"`
}
