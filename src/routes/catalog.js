// Require modules
require("dotenv").config();
const express = require("express");
const path = require("path");
const router = express.Router();
const mysql = require("mysql");
const dbService = require("../dbService");
const dbServiceInstance = new dbService();

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
  console.log("catalog:", req.session.user);
  res.render("cataloog", { tags: tags, products: products });
});

router.post("/", async (req, res) => {
  const { productID, amount } = req.body;
  const { userID, type, email, UitleenmandjeID } = req.session.user;
  dbServiceInstance.createBasketItem(
    UitleenmandjeID,
    userID,
    productID,
    amount,
    (err, result) => {
      if (err) {
        return res
          .status(500)
          .send("Kan product niet toevoegen aan uitleenmandje");
      } else if (result === true) {
        // If user had no basket yet change user's uitleenmandjeID in session
        dbServiceInstance.getUserUitleenmandjeID(userID, (err, result) => {
          if (err) {
            console.error("Error fetching uitleenmandje: ", err);
            return res.status(500).send("Kan uitleenmandje niet ophalen");
          } else {
            if (result && result.length > 0) {
              req.session.user.UitleenmandjeID = result[0].UitleenmandjeID;
              console.log(req.session.user.UitleenmandjeID);
              res.status(200).send("Product toegevoegd aan uitleenmandje");
            } else {
              return res
                .status(404)
                .send("Uitleenmandje niet gevonden voor deze gebruiker");
            }
          }
        });
      } else {
        res.status(200).send("Product toegevoegd aan uitleenmandje");
      }
    }
  );
});

module.exports = router;
