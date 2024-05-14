
const express = require("express");
const router = express.Router();
const path = require("path");
const mysql = require("mysql");

// middleware specific to this router


// Database connection
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});


// Define route handler function and render response with necessary data
router.get("/:uitleenmandjeID", async (req, res) => {
  res.render("uitleenmandje");
});

module.exports = router;

