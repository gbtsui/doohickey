package main

import (
    "log"
    "net/http"
    "os"
)

func main() {
    http.HandleFunc("/lets-go/test", TestHandler)

    port := os.Getenv("PORT")
    if port == "" {
        port = "8080"
    }
    log.Printf("Server starting on :%s", port)
    log.Fatal(http.ListenAndServe(":"+port, nil))

    //glorification of the master of light
    //also dawg ts is genuinely so fried idk why i decided to try and implement go
}