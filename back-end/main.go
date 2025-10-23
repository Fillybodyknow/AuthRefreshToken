package main

import (
	"auth-refresh-token/config"
	"auth-refresh-token/internal/middleware"
	"auth-refresh-token/internal/route"
	"log"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
)

func main() {
	err := godotenv.Load("../.env")
	if err != nil {
		log.Fatal("❌ ไม่พบไฟล์ .env หรือโหลดไม่สำเร็จ:", err)
	}
	err = config.ConnectDB()
	if err != nil {
		log.Fatal(err)
	}

	r := gin.Default()
	r.Use(cors.Default())

	API := r.Group("/api")

	Auth := API.Group("/auth")
	route.AuthRoute(Auth)

	User := API.Group("/user")
	User.Use(middleware.AuthMiddleware())
	route.UserRoute(User)

	r.Run(":8080")
}
