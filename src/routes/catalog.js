// Require modules
require("dotenv").config();
const express = require("express");
const router = express.Router();
const path = require("path");
const mysql = require("mysql");
const Tag = require("../models/tag");

// middleware specific to this router

// DB variables
let namen = [];

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
  console.log("Connected to database");
});

// Retrieve "naam" from User table
connection.query("SELECT naam from User", (error, results, fields) => {
  if (error) {
    console.error("Error executing query:", error);
    return;
  }

  // Log query results
  console.log("Retrieved users:", results);

  // Map attributes to new array
  namen = results.map((user) => user.naam);
  console.log("Namen:", namen);

  // Close DB connection
  connection.end();
});

// Define route handler function
router.get("/", async (req, res) => {
  // Call function to query data from DB
  const tags = await getTagNames();

  // Render response with retrieved data
  res.render("cataloog", { tags: tags });
});

// Query all tags
async function getTagNames() {
  try {
    // const data = await connection.query('SELECT * FROM Tag');
    // const example = [{ name: "beeld" }, { name: "video" }, { name: "camera" }];

    // Test data while no data in DB
    let tag1 = new Tag("beeld");
    let tag3 = new Tag("video");
    let tag2 = new Tag("camera");
    const data = [tag1, tag2, tag3];

    const tags = data.map((tag) => tag.name); // Change tag.name to recordname
    return tags;
  } catch (error) {
    console.error("Error executing query:", error);
    throw error;
  }
}

module.exports = router;
