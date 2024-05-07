// Require modules
require("dotenv").config();
const express = require("express");
const mysql = require("mysql");
const path = require("path");

// Create Express app
const app = express();

// Database connection
const connection = mysql.createConnection({
    host: "dt5.ehb.be",
    user: "2324PROGPRGR10",
    password: "hVWX33SX",
    database: "2324PROGPRGR10"
});

connection.connect((err) => {
    if (err) {
        console.error("Error connecting to database: " + err.stack);
        return;
    }
    console.log("Connected to database");
});

// Set up view engine and static files
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));

// Routes
// Home route
app.get("/", (req, res) => {
    res.render("index");
});

// API routes
// Get all products
app.get("/api/products", (req, res) => {
    connection.query("SELECT * FROM Product", (err, result) => {
        if (err) {
            console.error('Error fetching products: ', err);
            res.status(500).json({ error: 'Failed to fetch products' });
        } else {
            res.json(result);
        }
    });
});

// Handle reservation
app.post("/api/reservations", (req, res) => {
    const { productId, userId } = req.body;
    connection.query("INSERT INTO Reservations (ProductID, UserID) VALUES (?, ?)", [productId, userId], (err, result) => {
        if (err) {
            console.error('Error adding reservation to database: ', err);
            res.status(500).json({ error: 'Failed to add reservation' });
        } else {
            console.log('Reservation added successfully');
            res.status(200).json({ message: 'Reservation added successfully' });
        }
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});