package handle

import (
	"auth-refresh-token/internal/model"
	"auth-refresh-token/internal/service"

	"github.com/gin-gonic/gin"
)

func Resgister(c *gin.Context) {
	var Request model.RegisterRequest
	if err := c.ShouldBindJSON(&Request); err != nil {
		c.JSON(400, gin.H{"error": err.Error()})
		return
	}
	err := service.CheckRegisterRequest(c.Request.Context(), Request)
	if err != nil {
		c.JSON(400, gin.H{"error": err.Error()})
		return
	}
	c.JSON(200, gin.H{"message": "success"})
}

func Login(c *gin.Context) {
	var req model.LoginRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(400, gin.H{"error": err.Error()})
		return
	}

	accessToken, refreshToken, err := service.CheckLoginRequest(c.Request.Context(), req)
	if err != nil {
		c.JSON(400, gin.H{"error": err.Error()})
		return
	}

	c.JSON(200, gin.H{
		"access_token":  accessToken,
		"refresh_token": refreshToken,
		"message":       "login success",
	})
}

func RefreshToken(c *gin.Context) {
	var req model.RefreshTokenRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(400, gin.H{"error": err.Error()})
		return
	}

	newAccess, newRefresh, err := service.RefreshAccessToken(c.Request.Context(), req.RefreshToken)
	if err != nil {
		c.JSON(401, gin.H{"error": err.Error()})
		return
	}

	c.JSON(200, gin.H{
		"access_token":  newAccess,
		"refresh_token": newRefresh,
		"message":       "refresh token success",
	})
}
