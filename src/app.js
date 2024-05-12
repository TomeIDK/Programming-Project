// Require modules
require("dotenv").config();
const express = require("express");
const mysql = require("mysql");
const path = require("path");
const cors = require('cors');
const port = process.env.PORT || 3000;
const DBService = require("./dbService");

// Create Express app
const app = express();
app.use(express.json());
app.use(cors());
const dbService = new DBService();

// Routes
const info = require('./routes/info');
const catalog = require('./routes/catalog');
const api = require('./routes/api');
const product = require("./routes/product");
app.use('/info', info);
app.use('/cataloog', catalog);
app.use("/api", api);
app.use("/product", product);

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
        console.error("\nBen je geconnecteerd met het schoolnetwerk? (VPN)");
        return;
    }
    console.log("Connected to database: ", path.basename(__filename));
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
    const { productId, userId, reservationDate } = req.body;
    dbService.addReservation(productId, userId, reservationDate, (err, result) => {
        if (err) {
            res.status(500).json({ error: 'Failed to add reservation' });
        } else {
            res.status(200).json({ message: 'Reservation added successfully' });
        }
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});