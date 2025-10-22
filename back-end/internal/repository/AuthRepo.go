package repository

import (
	"auth-refresh-token/config"
	"auth-refresh-token/internal/model"
	"context"
	"errors"
	"time"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

func UserCollection() *mongo.Collection {
	return config.DB.Collection("users")
}

func RefreshTokenCollection() *mongo.Collection {
	return config.DB.Collection("refresh_tokens")
}

func InsertUser(ctx context.Context, user *model.UserModel) error {
	_, err := UserCollection().InsertOne(ctx, user)
	return err
}

func FindUserByEmail(ctx context.Context, email string) (*model.UserModel, error) {
	var user model.UserModel
	err := UserCollection().FindOne(ctx, bson.M{"email": email}).Decode(&user)
	if errors.Is(err, mongo.ErrNoDocuments) {
		return nil, nil
	}
	return &user, err
}

func FindUserByID(ctx context.Context, id string) (*model.UserModel, error) {
	var user model.UserModel
	objID, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		return nil, err
	}
	err = UserCollection().FindOne(ctx, bson.M{"_id": objID}).Decode(&user)
	if errors.Is(err, mongo.ErrNoDocuments) {
		return nil, nil
	}
	return &user, err
}

func UpdateUser(ctx context.Context, user *model.UserModel) error {
	objID := user.ID
	_, err := UserCollection().UpdateOne(ctx, bson.M{"_id": objID}, bson.M{"$set": user})
	return err
}

func DeleteUser(ctx context.Context, id string) error {
	objID, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		return err
	}
	_, err = UserCollection().DeleteOne(ctx, bson.M{"_id": objID})
	return err
}

// Upsert token → ถ้า user มีแล้ว update token, ถ้ายังไม่มี insert
func SaveRefreshToken(ctx context.Context, userID primitive.ObjectID, token string, expiresAt time.Time) error {
	filter := bson.M{"user_id": userID}
	update := bson.M{
		"$set": bson.M{
			"token":      token,
			"expires_at": expiresAt,
		},
	}
	opts := options.Update().SetUpsert(true)
	_, err := RefreshTokenCollection().UpdateOne(ctx, filter, update, opts)
	return err
}

// ตรวจสอบ token
func FindRefreshToken(ctx context.Context, token string) (*model.RefreshToken, error) {
	var rt model.RefreshToken
	err := RefreshTokenCollection().FindOne(ctx, bson.M{"token": token}).Decode(&rt)
	if err != nil {
		return nil, err
	}
	return &rt, nil
}

func DeleteRefreshToken(ctx context.Context, token string) error {
	_, err := RefreshTokenCollection().DeleteOne(ctx, bson.M{"token": token})
	return err
}
