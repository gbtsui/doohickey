package handler

import (
    "encoding/json"
    "log"
    "net/http"
    "doohickey/lets-go"
)

var test string = "hi"

//decapitalized: private
func add(arg1 int, arg2 int) int { return arg1+arg2 } //i might understand it now


type PingRequest struct {
    Body string `json:"body"`
    SillyPayload int `json:"silly_payload"`
}

type PingResponse struct {
    Body string `json:"body"`
    SillyPayload int `json:"silly_payload"`
}

//capitalized: public
func TestHandler(w http.ResponseWriter, r *http.Request) {
    //sillymaxxing to learn a new framework

    if r.Method != http.MethodGet {
        http.Error(w, "method not allowed", http.StatusMethodNotAllowed)
        return

    }

    var req PingRequest
    if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
        http.Error(w, "invalid JSON", http.StatusBadRequest)
        return
    }

    response := PingResponse {
        Body: "successful!",
        SillyPayload: req.SillyPayload + 67
    }

    w.Header().Set("Content-Type", "application/json")
    w.WriteHeader(http.StatusOK)
    json.NewEncoder(w).Encode()
}

/*
data, err := fetch("...")
if err != nil {
    // handle error
}
*/