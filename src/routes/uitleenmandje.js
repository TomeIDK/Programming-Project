const express = require("express");
const router = express.Router();
const path = require("path");
const mysql = require("mysql");
const dbService = require("../dbService");
const checkId = require("../middleware/id-auth");


// middleware specific to this router

// Database connection
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});

connection.connect((err) => {
  if (err) {
    console.error("fout bij verbinden met DB: ", err);
    return;
  }
  console.log("verbonden met DB: uitleenmandje.js ");
});

// Define route handler function and render response with necessary data   WHERE Uitleenmandje.UitleenmandjeID = ?, [UitleenmandjeID],
router.get("/:uitleenmandjeID", checkId(), (req, res) => {
  const UitleenmandjeID = req.params.uitleenmandjeID;

  connection.query(
    `SELECT Product.productID, Product.afbeelding, Product.naam, Uitleenmandje.aantal
    FROM Product 
    LEFT JOIN Uitleenmandje ON Product.productID = Uitleenmandje.productID 
    WHERE Uitleenmandje.UitleenmandjeID = '${UitleenmandjeID}'`,
    (err, result) => {
      if (err) {
        console.error("Fout bij uitvoeren query: " + err.stack);
      } else {
        const hasProducts = result.length > 0;
        const pageTitle = hasProducts
          ? "Uitleenmandje"
          : " geen producten in het uitleenmandje gevonden. ";
        res.render("uitleenmandje", { products: result, pageTitle: pageTitle });
      }
    }
  );
});

router.post("/delete", (req, res) => {
  let user = req.session.user;
  const productID = req.body.productID;

  dbServiceInstance = new dbService();
  dbServiceInstance.removeBasketItem(
    user.UitleenmandjeID,
    user.userID,
    productID,
    (err, result) => {
      if (err) {
        console.log("failed post");
        res.status(401).send("Kan product niet uit uitleenmandje verwijderen");
      } else {
        res.status(200).send("Product verwijdert uit uitleenmandje");
      }
    }
  );
});
module.exports = router;
