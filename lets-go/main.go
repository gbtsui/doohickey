package main

import (
    "log"
    "net/http"
)

func main() {
    http.HandleFunc("/lets-go/test", TestHandler)

    log.Println("Server starting on :8080")
    log.Fatal(http.ListenAndServe(":8080", nil))
    //glorification of the master of light
    //also dawg ts is genuinely so fried idk why i decided to try and implement go
}