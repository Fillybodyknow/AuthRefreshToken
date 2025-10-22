package config

import (
	"context"
	"errors"
	"fmt"
	"os"
	"time"

	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

var DB *mongo.Database

func ConnectDB() error {
	uri := os.Getenv("MONGO_URI")
	if uri == "" {
		return errors.New("MONGO_URI environment variable is not set")
	}

	dbName := os.Getenv("MONGO_DB")
	if dbName == "" {
		return errors.New("MONGO_DB environment variable is not set")
	}

	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	client, err := mongo.Connect(ctx, options.Client().ApplyURI(uri))
	if err != nil {
		return errors.New("❌ เชื่อมต่อ MongoDB ไม่ได้:" + err.Error())
	}

	if err := client.Ping(ctx, nil); err != nil {
		return errors.New("❌ Ping MongoDB ไม่ได้:" + err.Error())
	}

	DB = client.Database(dbName)
	fmt.Printf("✅ เชื่อมต่อ MongoDB สำเร็จ (ใช้ Database: %s)\n", dbName)

	return nil
}
