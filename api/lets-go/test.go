package main

import (
    "encoding/json"
    "net/http"
    //"log"
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

    if r.Method != http.MethodPost {
        w.Header().Set("Content-Type", "application/json")
        w.WriteHeader(http.StatusMethodNotAllowed)
        json.NewEncoder(w).Encode(map[string]string{
            "error": "method not allowed",
        })
        return
    }

    var req PingRequest
    if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
        w.Header().Set("Content-Type", "application/json")
        w.WriteHeader(http.StatusBadRequest)
        json.NewEncoder(w).Encode(map[string]string{
            "error": "invalid JSON",
        })

        //http.Error(w, "invalid JSON", http.StatusBadRequest)
        return
    }

    response := PingResponse {
        Body: test,
        SillyPayload: req.SillyPayload + 67,
    }

    w.Header().Set("Content-Type", "application/json")
    w.WriteHeader(http.StatusOK)
    json.NewEncoder(w).Encode(response)
}

/*
data, err := fetch("...")
if err != nil {
    // handle error
}
*/
