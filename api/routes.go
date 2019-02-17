package main

import (
	"encoding/json"
	"fmt"
	"net/http"
)

func index(w http.ResponseWriter, req *http.Request) {
	fmt.Fprintf(w, "Hello from the api")
}

func colors(w http.ResponseWriter, req *http.Request) {
	if req.Method == http.MethodGet {
		c := req.FormValue("color")
		if c == "" {
			getColors(w)
			return
		}
		getColor(w, c)
		return
	}
	if req.Method == http.MethodPost {
		addColor(w, req)
	}
}

func getColors(w http.ResponseWriter) {
	var colors []color

	// runs a query to pull data from the database
	rows, err := db.Query(`SELECT color, r, g, b, a, hex FROM colors;`)
	check(err)

	var name, r, g, b, a, hex string

	for rows.Next() {
		err = rows.Scan(&name, &r, &g, &b, &a, &hex)
		c := color{
			name,
			r, g, b, a, hex,
		}
		check(err)
		colors = append(colors, c)

	}
	err = json.NewEncoder(w).Encode(colors)
	check(err)
}

func getColor(w http.ResponseWriter, c string) {
	q := fmt.Sprint(`SELECT color, r, g, b, a, hex FROM colors WHERE color ="`, c, `";`)
	rows, err := db.Query(q)
	check(err)

	var name, r, g, b, a, hex string
	var co color

	for rows.Next() {
		err = rows.Scan(&name, &r, &g, &b, &a, &hex)
		co = color{
			name,
			r, g, b, a, hex,
		}
	}
	if co.Color == "" {
		fmt.Fprintf(w, "Color has to be created")
		return
	}

	err = json.NewEncoder(w).Encode(co)
	check(err)
}

func addColor(w http.ResponseWriter, req *http.Request) {
	cName := req.FormValue("color")
	r := req.FormValue("r")
	g := req.FormValue("g")
	b := req.FormValue("b")
	a := req.FormValue("a")
	hex := req.FormValue("hex")

	fmt.Printf("hex %v", hex)
	c := color{
		cName,
		r,
		g,
		b,
		a,
		hex,
	}
	fmt.Fprintln(w, addColorToDB(w, c))

}

func addColorToDB(w http.ResponseWriter, c color) string {
	q := fmt.Sprint("INSERT INTO colors(color, r, g, b, a, hex) VALUES(\"", c.Color, "\",", c.R, ",", c.G, ",", c.B, ",", c.A, ",\"", c.Hex, "\");")
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
	return (fmt.Sprint("Colors created ", n))
}
