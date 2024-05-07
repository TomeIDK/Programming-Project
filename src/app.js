const mysql = require("mysql");
const express = require("express");
const app = express();
const port = 3000;
const path = require("path");

// Maak een databaseverbinding
const connection = mysql.createConnection({
    host: "dt5.ehb.be",
    user: "2324PROGPRGR10",
    password: "hVWX33SX",
    database: "2324PROGPRGR10"
});

// Verbind met de database
connection.connect((err) => {
    if (err) {
        console.error("Error connecting to database: " + err.stack);
        return;
    }
    console.log("Connected to database");
});

// Maak een array om de resultaten op te slaan
const resultArray = [];

// Voer de query uit om de resultaten op te halen
const cursor = connection.query("SELECT * FROM Product");

cursor.on("result", (row) => {
    const existingRow = resultArray.find(existingRow => existingRow.ProductID === row.ProductID);
    resultArray.push(row);
});

cursor.on("error", (err) => {
    console.error('error executing query: ', err);
});

cursor.on("end", () => {
    console.log("Query execution complete");
    console.log("result array: ", resultArray);
});

// Stel de view engine in op EJS
app.set("view engine", "ejs");

// Stel de map voor statische bestanden in
app.use(express.static(path.join(__dirname, "public")));

// Route om alle producten op te halen
app.get("/api/products", (req, res) => {
    res.json(resultArray);
});

// Start de server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});