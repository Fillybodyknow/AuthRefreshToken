package handle

import (
	"auth-refresh-token/internal/service"

	"github.com/gin-gonic/gin"
)

func GetProfile(c *gin.Context) {
	UserID := c.GetString("id")

	User, err := service.GetUserProfile(c.Request.Context(), UserID)
	if err != nil {
		c.JSON(400, gin.H{"error": err.Error()})
		return
	}
	c.JSON(200, User)
}
