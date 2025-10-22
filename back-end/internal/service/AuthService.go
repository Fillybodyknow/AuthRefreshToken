package service

import (
	"auth-refresh-token/internal/model"
	"auth-refresh-token/internal/repository"
	"auth-refresh-token/utility"
	"context"
	"errors"
	"time"
)

func CheckRegisterRequest(c context.Context, Request model.RegisterRequest) error {
	if Request.Username == "" {
		return errors.New("กรุณากรอก username")
	} else if Request.Email == "" {
		return errors.New("กรุณากรอก email")
	} else if Request.Password == "" {
		return errors.New("กรุณากรอก password")
	} else if Request.Profile.FirstName == "" || Request.Profile.LastName == "" {
		return errors.New("กรุณากรอก ชื่อ-นามสกุล")
	} else if Request.Profile.Birthdate.IsZero() {
		return errors.New("กรุณากรอก วันเดือนปีเกิด")
	}

	IsExistEmail, err := repository.FindUserByEmail(c, Request.Email)
	if err != nil {
		return err
	}
	if IsExistEmail != nil {
		return errors.New("email นี้ถูกใช้งานแล้ว")
	}

	HashPass := utility.HashPassword(Request.Password)
	Request.Password = HashPass
	User := model.UserModel{
		Username:  Request.Username,
		Email:     Request.Email,
		Password:  Request.Password,
		FirstName: Request.Profile.FirstName,
		LastName:  Request.Profile.LastName,
		AboutMe:   Request.Profile.AboutMe,
		Birthdate: Request.Profile.Birthdate,
		CreatedAt: time.Now(),
	}
	return repository.InsertUser(c, &User)
}

func CheckLoginRequest(ctx context.Context, req model.LoginRequest) (accessToken string, refreshToken string, err error) {
	user, err := repository.FindUserByEmail(ctx, req.Email)
	if err != nil {
		return "", "", err
	}
	if user == nil {
		return "", "", errors.New("ไม่พบ email นี้ในระบบ")
	}
	if !utility.ComparePassword(user.Password, req.Password) {
		return "", "", errors.New("รหัสผ่านไม่ถูกต้อง")
	}

	// Generate Access + Refresh token
	accessToken = utility.GenerateAccessToken(user.ID.Hex())
	refreshToken = utility.GenerateRefreshToken(user.ID.Hex())

	// Save refresh token (upsert)
	err = repository.SaveRefreshToken(ctx, user.ID, refreshToken, time.Now().Add(7*24*time.Hour))
	if err != nil {
		return "", "", err
	}

	return accessToken, refreshToken, nil
}

func RefreshAccessToken(ctx context.Context, oldRefreshToken string) (newAccessToken string, newRefreshToken string, err error) {
	// หา refresh token เดิม
	rt, err := repository.FindRefreshToken(ctx, oldRefreshToken)
	if err != nil {
		return "", "", errors.New("refresh token ไม่ถูกต้อง")
	}
	if rt == nil || rt.ExpiresAt.Before(time.Now()) {
		return "", "", errors.New("refresh token หมดอายุ")
	}

	// Generate token ใหม่
	newAccessToken = utility.GenerateAccessToken(rt.UserID.Hex())
	newRefreshToken = utility.GenerateRefreshToken(rt.UserID.Hex())

	// อัปเดต refresh token ใน DB
	err = repository.SaveRefreshToken(ctx, rt.UserID, newRefreshToken, time.Now().Add(7*24*time.Hour))
	if err != nil {
		return "", "", err
	}

	return newAccessToken, newRefreshToken, nil
}
