package main

import (
	"encoding/json"
	"fmt"

	"github.com/Shopify/sarama"
	"github.com/gofiber/fiber/v2"
)

// Estructura de caso
type caso struct {
	Name        string `json:"name"`
	Location    string `json:"location"`
	Gender      string `json:"gender"`
	Age         int    `json:"age"`
	VaccineType string `json:"vaccine_type"`
}

func main() {
	fmt.Println("Starting kafka Producer")
	app := fiber.New()

	app.Post("/", createComment)

	app.Listen(":80")

}

func ConnectProducer(brokersUrl []string) (sarama.SyncProducer, error) {

	config := sarama.NewConfig()
	config.Producer.Return.Successes = true
	config.Producer.RequiredAcks = sarama.WaitForAll
	config.Producer.Retry.Max = 5

	conn, err := sarama.NewSyncProducer(brokersUrl, config)
	if err != nil {
		return nil, err
	}

	return conn, nil
}

func PushCommentToQueue(topic string, message []byte) error {

	brokersUrl := []string{"localhost:9092"}
	producer, err := ConnectProducer(brokersUrl)
	if err != nil {
		return err
	}

	defer producer.Close()

	msg := &sarama.ProducerMessage{
		Topic: topic,
		Value: sarama.StringEncoder(message),
	}

	partition, offset, err := producer.SendMessage(msg)
	if err != nil {
		return err
	}

	fmt.Printf("Message is stored in topic(%s)/partition(%d)/offset(%d)\n", topic, partition, offset)

	return nil
}

// Crear nuevo caso
func createComment(c *fiber.Ctx) error {
	// Instantiate new Message struct
	cmt := new(caso)
	if err := c.BodyParser(cmt); err != nil {
		c.Status(400).JSON(&fiber.Map{
			"success": false,
			"message": err,
		})
		return err
	}
	// convert body into bytes and send it to kafka
	cmtInBytes, err := json.Marshal(cmt)
	PushCommentToQueue("sopes1", cmtInBytes)
	// Return Comment in JSON format
	err = c.JSON(&fiber.Map{
		"Caso": cmt,
	})
	if err != nil {
		c.Status(500).JSON(&fiber.Map{
			"success": false,
			"message": "Error creating product",
		})
		return err
	}
	return err
}
