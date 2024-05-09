// Require modules
require("dotenv").config();
const express = require("express");
const path = require("path");
const router = express.Router();
const mysql = require("mysql");

// middleware specific to this router

// DB variables

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

// Close DB connection
connection.end();

// define the home page route (/product/id =  altijd met id om te weten welk product moet getoond worden)
router.get("/:productID", (req, res) => {
  const productID = req.params.productID;
  res.render("product", { productID });
});

module.exports = router;
