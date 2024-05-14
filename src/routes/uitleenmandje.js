// Require modules
require("dotenv").config();
const express = require("express");
const path = require("path");
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
connection.query("SELECT tagNaam from Tag", (error, results, fields) => {
  if (error) {
    console.error("Error executing query:", error);
    return;
  }

  // Format results
  tags = results.map((tag) => tag.tagNaam);
});

// Retrieve Products
connection.query(
  `SELECT Product.productID, Product.naam, Product.aantalBeschikbaar, Product.afbeelding, COALESCE(GROUP_CONCAT(Tag.tagNaam SEPARATOR ', '), 'Verbenaceae, Test') AS product_tags
FROM Product
LEFT JOIN ProductTag ON Product.productID = ProductTag.productID
LEFT JOIN Tag ON ProductTag.tagID = Tag.tagID
GROUP BY Product.productID, Product.naam`,
  (error, results, fields) => {
    if (error) {
      console.error("Error executing query:", error);
      return;
    }

    // Format results
    products = results;
    products.forEach((product) => {
      product.product_tags = product.product_tags.split(", ");
    });
    console.log("products:", products);
  }
);

// Close DB connection
connection.end();

// Define route handler function and render response with necessary data
router.get("/", async (req, res) => {
  res.render("cataloog", { tags: tags, products: products });
});

module.exports = router;