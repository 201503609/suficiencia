package main

import (
	"context"
	"encoding/json"
	"fmt"
	"os"
	"os/signal"
	"syscall"

	"github.com/Shopify/sarama"
)

// Estructura de caso
type caso struct {
	Name        string `json:"name"`
	Location    string `json:"location"`
	Gender      string `json:"gender"`
	Age         int    `json:"age"`
	VaccineType string `json:"vaccine_type"`
}

var ctx = context.Background()

func main() {

	fmt.Println("Consumer started....")

	topic := "sopes1"
	worker, err := connectConsumer([]string{"localhost:9092"})
	if err != nil {
		panic(err)
	}

	// Calling ConsumePartition. It will open one connection per broker
	// and share it for all partitions that live on it.
	consumer, err := worker.ConsumePartition(topic, 0, sarama.OffsetOldest)
	if err != nil {
		panic(err)
	}
	fmt.Println("Consumer started ")
	sigchan := make(chan os.Signal, 1)
	signal.Notify(sigchan, syscall.SIGINT, syscall.SIGTERM)
	// Count how many message processed
	msgCount := 0

	// Get signal for finish
	doneCh := make(chan struct{})
	go func() {
		for {
			select {
			case err := <-consumer.Errors():
				fmt.Println(err)

			case msg := <-consumer.Messages():
				msgCount++
				data := msg.Value
				info := caso{}

				err := json.Unmarshal(data, &info)
				if err != nil {
					fmt.Println("Error...")
					fmt.Println(err)
				}
				
				postBody := []byte(string(info))
				req, err := http.Post("http://34.67.40.100:3000/vaccinated/newVaccinated", "application/json", bytes.NewBuffer(postBody))
				req.Header.Set("Content-Type", "application/json")
				failOnError(err, "POST new document")
				defer req.Body.Close()

				//Read the response body
				newBody, err := ioutil.ReadAll(req.Body)
				failOnError(err, "Reading response from HTTP POST")
				sb := string(newBody)
				log.Printf(sb)

				fmt.Println("Info")
				fmt.Println(info)

			case <-sigchan:
				fmt.Println("Interrupt is detected")
				doneCh <- struct{}{}
			}
		}
	}()

	<-doneCh
	fmt.Println("Processed", msgCount, "messages")

	if err := worker.Close(); err != nil {
		panic(err)
	}

}

func connectConsumer(brokersUrl []string) (sarama.Consumer, error) {
	config := sarama.NewConfig()
	config.Consumer.Return.Errors = true

	// Create new consumer
	conn, err := sarama.NewConsumer(brokersUrl, config)
	if err != nil {
		return nil, err
	}

	return conn, nil
}
