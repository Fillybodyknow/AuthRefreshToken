package service

import (
	"auth-refresh-token/internal/model"
	"auth-refresh-token/internal/repository"
	"context"
)

func GetUserProfile(ctx context.Context, userID string) (user *model.UserModel, err error) {
	user, err = repository.FindUserByID(ctx, userID)
	if err != nil {
		return &model.UserModel{}, err
	}
	return user, nil
}
