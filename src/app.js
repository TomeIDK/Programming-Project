// Require modules
require("dotenv").config();
const express = require("express");
const mysql = require("mysql");
const path = require("path");
const port = process.env.PORT || 3000;

// Create Express app
const app = express();

// Routes
const info = require('./routes/info');
const catalog = require('./routes/catalog');
const api = require('./routes/api');
app.use('/info', info);
app.use('/cataloog', catalog);
app.use("/api", api);

// Set up view engine and static files
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));

// Database connection
const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
});

connection.connect((err) => {
    if (err) {
        console.error("Error connecting to database: " + err.stack);
        return;
    }
    console.log("Connected to database");
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