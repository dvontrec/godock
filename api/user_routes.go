package main

import (
	"fmt"
	"net/http"
	"hash/fnv"
)

// Function used to hash string to int
func hash(s string) uint32 {
	h := fnv.New32a()
	h.Write([]byte(s))
	return h.Sum32()
}

func users(w http.ResponseWriter, req *http.Request) {
	if req.Method == http.MethodGet {
		id, err := handleLogIn(req)
		if err != nil || id == 0 {
			w.WriteHeader(http.StatusBadRequest)
			fmt.Fprintln(w, "Invalid Credentials")
			return
		}
		fmt.Fprintln(w, id)
		return
	}
	if req.Method == http.MethodPost {
		fmt.Fprintln(w, registerUser(w, req))
		return
	}
}

func registerUser(w http.ResponseWriter, req *http.Request) string {
	username := req.FormValue("username")
	password := req.FormValue("password")
	q := fmt.Sprint("INSERT INTO users(username, password) VALUES('", username, "', '", password, "');")
	stmt, err := db.Prepare(q)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		return (fmt.Sprint("There was an error ", err))
	}

	r, err := stmt.Exec()
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		return (fmt.Sprint("There was an error ", err))
	}

	n, err := r.RowsAffected()
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		return (fmt.Sprint("There was an error ", err))
	}
	w.WriteHeader(http.StatusCreated)
	return (fmt.Sprint("User created ", n))

}

func handleLogIn(req *http.Request) (uint32, error) {
	username := req.FormValue("username")
	password := req.FormValue("password")
	q := fmt.Sprint("SELECT id FROM users WHERE username='", username, "' AND password='", password, "';")
	rows, err := db.Query(q)
	if err != nil {

		return 0, err
	}
	var id int
	for rows.Next() {
		err = rows.Scan(&id)
		if err != nil {

			return 0, err
		}
	}
	// Sets the hashed id that is username hashed 
	h := hash(username)
	return h, nil
}