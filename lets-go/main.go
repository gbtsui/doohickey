package main

import (
    "net/http"
    "doohickey/lets-go"
)

func main() {
    http.HandleFunc("/lets-go/test", handler.TestHandler)


}