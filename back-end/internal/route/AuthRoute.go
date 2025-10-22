package route

import (
	"auth-refresh-token/internal/handle"

	"github.com/gin-gonic/gin"
)

func AuthRoute(r *gin.RouterGroup) {
	r.POST("/register", handle.Resgister)
	r.POST("/login", handle.Login)
	r.POST("/refresh-token", handle.RefreshToken)
}
