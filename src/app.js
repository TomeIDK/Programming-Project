const express = require("express");
const app = express();
const port = 3000;
const path = require("path");
const mysql = require("mysql");
const dotenv = require("dotenv");

dotenv.config();

// Routers
const info = require("./routes/info");
const catalog = require("./routes/catalog");
const product = require("./routes/product");

// Load router modules
app.use(express.static(path.join(__dirname, "public")));
app.use("/info", info);
app.use("/cataloog", catalog);
app.use("/product/:id", product);

// MySQL connection
const connection = mysql.createConnection({
  host: process.env.DB_HOST, // Change this to your MySQL host
  user: process.env.DB_USERNAME, // Your MySQL username
  password: process.env.DB_PASSWORD, // Your MySQL password
  database: process.env.DB_DATABASE, // Your database name
});

connection.connect((err) => {
  if (err) {
    console.error("Error connecting to database: " + err.stack);
    return;
  }
  console.log("Connected to database");
});

// Route to get all products
app.get("/api/products", (req, res) => {
  const query = "SELECT * FROM products";
  connection.query(query, (error, results) => {
    if (error) {
      console.error("Error getting products: " + error);
      res.status(500).json({ error: "Error getting products" });
    } else {
      res.json(results);
    }
  });
});

// Listen for connections
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

