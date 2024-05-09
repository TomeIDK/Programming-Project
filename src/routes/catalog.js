// Require modules
require("dotenv").config();
const express = require("express");
const path = require('path');
const router = express.Router();
const mysql = require("mysql");

// middleware specific to this router

// DB variables
let tags = [];
let products = [];

// Database connection
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});

// Open connection to DB
connection.connect((err) => {
  if (err) {
    console.error("Error connecting to database:", err);
    return;
  }
    console.log("Connected to database: ", path.basename(__filename));


});

// Retrieve tagID from Tag table
connection.query("SELECT tagID from Tag", (error, results, fields) => {
  if (error) {
    console.error("Error executing query:", error);
    return;
  }

  tags = results.map((tag) => tag.tagID);

});

// Retrieve products
connection.query("SELECT productID, naam, aantalBeschikbaar, afbeelding from Product", (error, results, fields) => {
  if (error) {
    console.error("Error executing query:", error);
    return;
  }
  products = results;

  // Remove last item in array because it returns an unusable object
  products.pop();
  
  console.log("products:", products);
});


  // Close DB connection
  connection.end();

// Define route handler function and render response with necessary data
router.get("/", async (req, res) => {
  res.render("cataloog", { tags: tags, products: products });
});

module.exports = router;
