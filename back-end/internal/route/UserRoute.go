package route

import (
	"auth-refresh-token/internal/handle"

	"github.com/gin-gonic/gin"
)

func UserRoute(r *gin.RouterGroup) {
	r.GET("/profile", handle.GetProfile)
}
